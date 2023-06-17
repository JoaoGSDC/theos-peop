import React from 'react';
import SkillRating from '../../../components/SkillRating';
import {
  ViewContainer,
  FieldItemsContainer,
  ViewField,
  SkillRatingContainer,
  FooterButtonsContainer,
} from '../../../styles/vacancy-registration.styles';
import { TextField } from '@mui/material';
import { PrimaryButton, SecondaryButton } from '../../../styles/globals';
import Select from '../../../components/Select';
import api from '../../../services/api';
import { ISeniority } from '../../../interfaces/ISeniority';
import { IExperience } from '../../../interfaces/IExperience';
import { ISector } from '../../../interfaces/ISector';
import useForm from '../../../components/UseForm';
import Dialog from '../../../components/Dialog';
import { SkillsTypeEnum } from '../../../enums/SkillsTypeEnum';
import { FormContext } from '../../../context/FormContext';
import { formatNumberToBRL } from '../../../utils/formatNumberToBRL';

interface VacanciesRegistrationProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  vacancyId?: number;
}

function VacanciesRegistration(props: VacanciesRegistrationProps) {
  const { children, value, index, vacancyId, ...other } = props;

  const fields = {
    name: '',
    sector: '',
    seniority: '',
    manager: '',
    minBudget: '',
    maxBudget: '',
    expTime: '',
    observation: '',
    technicalSkills: [{ weight: { name: 'weight-0', value: '' }, ability: { name: 'ability-0', value: '' } }],
    behavioralSkills: [{ weight: { name: 'weight-0', value: '' }, ability: { name: 'ability-0', value: '' } }],
  };

  const {
    form,
    handleInputChange,
    handleAddSkill,
    handleRemoveSkill,
    handleSkillChange,
    reset,
    isDefault,
    handleSetFormValueToEdit,
  } = useForm({ fields });

  const [open, setOpen] = React.useState<boolean>(false);

  const [seniorities, setSeniorities] = React.useState<ISeniority[]>([]);
  const [experiences, setExperiences] = React.useState<IExperience[]>([]);
  const [sectors, setSectors] = React.useState<ISector[]>([]);

  const handleSetDefaultValue = React.useCallback(async () => {
    await api.get('/api/seniority/findAll').then((resp) => setSeniorities(resp.data));
    await api.get('/api/experience/findAll').then((resp) => setExperiences(resp.data));
    await api.get('/api/sector/findMany').then((resp) => setSectors(resp.data));

    if (vacancyId !== 0) {
      await api.get(`/api/vacancy/findOne?id=${vacancyId}`).then(async (resp) => {
        const {
          name,
          sectorId,
          seniority,
          manager,
          minimumBudget,
          maximumBudget,
          timeExperience,
          observation,
          skills,
        } = resp.data;

        const technicalSkills = skills.technical.items.map((item: any, index: number) => ({
          id: item.id,
          weight: { name: `weight-${index}`, value: item.weight },
          ability: { name: `ability-${index}`, value: item.name },
        }));

        const behavioralSkills = skills.behavior.items.map((item: any, index: number) => ({
          id: item.id,
          weight: { name: `weight-${index}`, value: item.weight },
          ability: { name: `ability-${index}`, value: item.name },
        }));

        const formValue = {
          name,
          sector: sectorId,
          seniority,
          manager,
          minBudget: minimumBudget,
          maxBudget: maximumBudget,
          expTime: timeExperience,
          observation,
          technicalSkills,
          behavioralSkills,
        };

        handleSetFormValueToEdit(formValue);
      });
    }
  }, [vacancyId]);

  React.useEffect(() => {
    handleSetDefaultValue();
  }, [vacancyId]);

  const resetFormToNewForm = () => {
    if (isDefault()) {
      return;
    }

    reset();
  };

  const handleSaveVacancy = async () => {
    const data = {
      vacancy: {
        manager: form.manager,
        maximumBudget: form.maxBudget,
        minimumBudget: form.minBudget,
        name: form.name,
        observation: form.observation,
        seniority: form.seniority,
        timeExperience: form.expTime,
        sectorId: form.sector,
        skills: {
          technical: {
            type: SkillsTypeEnum.TECHNICAL,
            items: form.technicalSkills.map((skill: any) => ({
              name: skill.ability.value,
              weight: parseInt(skill.weight.value),
            })),
          },
          behavior: {
            type: SkillsTypeEnum.BEHAVIORAL,
            items: form.behavioralSkills.map((skill: any) => ({
              name: skill.ability.value,
              weight: parseInt(skill.weight.value),
            })),
          },
        },
      },
    };

    const portalBody = {
      name: data.vacancy.name,
      description: data.vacancy.observation,
      skills: data.vacancy.skills,
      budget: `${formatNumberToBRL(data.vacancy.maximumBudget)} a ${formatNumberToBRL(data.vacancy.maximumBudget)}`,
      exp: data.vacancy.timeExperience,
    };

    await api.post('/api/opportunity/insert', portalBody);

    await api.post('/api/vacancy/insert', data).then((resp) => {
      resetFormToNewForm();
    });
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          <ViewContainer>
            <FieldItemsContainer>
              <h3>Dados da vaga</h3>

              <ViewField>
                <TextField label="Nome" name="name" value={form.name} onChange={handleInputChange} fullWidth />

                <Select
                  value={form.sector}
                  name="sector"
                  label="Setor"
                  values={sectors}
                  keyValue="id"
                  keyDisplay="name"
                  onChange={handleInputChange}
                />

                <Select
                  value={form.seniority}
                  name="seniority"
                  label="Senioridade"
                  values={seniorities}
                  keyValue="_id"
                  keyDisplay="name"
                  onChange={handleInputChange}
                />
              </ViewField>

              <ViewField>
                <TextField label="Gestor" name="manager" value={form.manager} onChange={handleInputChange} fullWidth />

                <TextField
                  type="number"
                  label="Orçamento mínimo"
                  name="minBudget"
                  value={form.minBudget}
                  onChange={handleInputChange}
                  fullWidth
                />

                <TextField
                  type="number"
                  label="Orçamento máximo"
                  name="maxBudget"
                  value={form.maxBudget}
                  onChange={handleInputChange}
                  fullWidth
                />

                <Select
                  label="Tempo de exp"
                  values={experiences}
                  value={form.expTime}
                  name="expTime"
                  keyDisplay="name"
                  keyValue="_id"
                  onChange={handleInputChange}
                />
              </ViewField>

              <ViewField>
                <TextField
                  label="Observação"
                  name="observation"
                  value={form.observation}
                  onChange={handleInputChange}
                  fullWidth
                />
              </ViewField>
            </FieldItemsContainer>

            <ViewField>
              <SkillRatingContainer>
                <h3>Habilidades técnicas</h3>
                <FormContext.Provider value={{ form, handleSkillChange, handleRemoveSkill }}>
                  <SkillRating
                    isProfessionals={false}
                    handleAddSkill={handleAddSkill}
                    type="technical"
                    values={form.technicalSkills}
                  />
                </FormContext.Provider>
              </SkillRatingContainer>

              <SkillRatingContainer>
                <h3>Habilidades comportamentais</h3>
                <FormContext.Provider value={{ form, handleSkillChange, handleRemoveSkill }}>
                  <SkillRating
                    isProfessionals={false}
                    handleAddSkill={handleAddSkill}
                    type="behavioral"
                    values={form.behavioralSkills}
                  />
                </FormContext.Provider>
              </SkillRatingContainer>
            </ViewField>

            <FooterButtonsContainer>
              <SecondaryButton onClick={() => setOpen(true)}>Novo</SecondaryButton>
              <PrimaryButton onClick={handleSaveVacancy}>Salvar</PrimaryButton>
            </FooterButtonsContainer>
          </ViewContainer>

          <Dialog
            open={open}
            setOpen={setOpen}
            onConfirm={resetFormToNewForm}
            title="Deseja limpar o formulário?"
            positiveButtonText="Sim"
            negativeButtonText="Cancelar"
          />
        </>
      )}
    </div>
  );
}

export default VacanciesRegistration;
