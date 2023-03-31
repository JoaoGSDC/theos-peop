import React from 'react';
import SkillRating from '../../../components/SkillRating';
import { TabContainer } from '../../../components/Tabs/styles';
import { ViewContainer, FieldItemsContainer, ViewField, SkillRatingContainer, FooterButtonsContainer } from './styles';
import InputCPF from '../../../components/InputCPF';
import { TextField } from '@mui/material';
import { PrimaryButton, SecondaryButton } from '../../../styles/globals';
import Select from '../../../components/Select';
import InputAge from '../../../components/InputAge';
import useForm from '../../../components/UseForm';
import api from '../../../services/api';
import Dialog from '../../../components/Dialog';
import { SkillsTypeEnum } from '../../../enums/SkillsTypeEnum';
import { formatDate } from '../../../utils/formatDate';
import { FormContext } from '../../../context/FormContext';
import InputFile from '../../../components/InputFile';

interface ProfessionalsRegistrationProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  professionalId?: number;
}

function ProfessionalsRegistration(props: ProfessionalsRegistrationProps) {
  const { children, value, index, professionalId, ...other } = props;

  const [open, setOpen] = React.useState<boolean>(false);

  const fields = {
    cpf: '',
    name: '',
    email: '',
    birthdate: '',
    city: '',
    uf: '',
    salaryExpectation: 0,
    expTime: '',
    observation: '',
    curriculum: '',
    vacancyId: 0,
    technicalSkills: [
      {
        id: 0,
        weight: { name: 'weight-0', value: '' },
        note: { name: 'note-0', value: '' },
        ability: { name: 'ability-0', value: '' },
      },
    ],
    behavioralSkills: [
      {
        id: 0,
        weight: { name: 'weight-0', value: '' },
        note: { name: 'note-0', value: '' },
        ability: { name: 'ability-0', value: '' },
      },
    ],
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

  const [vacancies, setVacancies] = React.useState<any[]>([]);
  const [ufs, setUfs] = React.useState<any[]>([]);

  const handleSetDefaultValue = React.useCallback(async () => {
    await api.get('/api/vacancy/findMany').then((resp) => setVacancies(resp.data));
    await api.get('/api/states/findAll').then((resp) => setUfs(resp.data));

    if (professionalId !== 0) {
      await api.get(`/api/professional/findOne?id=${professionalId}`).then(async (resp) => {
        const { cpf, name, email, birthdate, city, uf, observation, curriculum, salaryExpectation, vacancyId, skills } =
          resp.data;

        const technicalSkills = skills.technical.items.map((item: any, index: number) => ({
          id: item.id,
          weight: { name: `weight-${index}`, value: item.weight },
          note: { name: `note-${index}`, value: item.note },
          ability: { name: `ability-${index}`, value: item.name },
        }));

        const behavioralSkills = skills.behavior.items.map((item: any, index: number) => ({
          id: item.id,
          weight: { name: `weight-${index}`, value: item.weight },
          note: { name: `note-${index}`, value: item.note },
          ability: { name: `ability-${index}`, value: item.name },
        }));

        const formValue = {
          cpf,
          name,
          email,
          birthdate: formatDate(birthdate),
          city,
          uf,
          observation,
          curriculum,
          salaryExpectation,
          vacancyId,
          technicalSkills,
          behavioralSkills,
        };

        handleSetFormValueToEdit(formValue);
      });
    }
  }, [professionalId]);

  React.useEffect(() => {
    handleSetDefaultValue();
  }, [professionalId]);

  const resetFormToNewForm = () => {
    if (isDefault()) {
      return;
    }

    reset();
  };

  const handleSaveProfessional = async () => {
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
              note: parseInt(skill.note.value),
            })),
          },
          behavior: {
            type: SkillsTypeEnum.BEHAVIORAL,
            items: form.behavioralSkills.map((skill: any) => ({
              name: skill.ability.value,
              weight: parseInt(skill.weight.value),
              note: parseInt(skill.note.value),
            })),
          },
        },
      },
    };

    await api.post('/api/professional/insert', data).then((resp) => {
      resetFormToNewForm();
    });
  };

  return (
    <TabContainer
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
              <h3>Dados do profissional</h3>

              <ViewField>
                <TextField label="Nome" name="name" value={form.name} onChange={handleInputChange} fullWidth />

                <InputCPF name="cpf" value={form.cpf} onChange={handleInputChange} />

                <Select
                  label="Vaga"
                  values={vacancies}
                  name="vacancyId"
                  value={form.vacancyId}
                  onChange={handleInputChange}
                  keyValue="id"
                  keyDisplay="name"
                />
              </ViewField>

              <ViewField>
                <TextField
                  type="email"
                  label="E-mail"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  fullWidth
                />

                <InputAge
                  label="Data de Nasc."
                  name="birthdate"
                  value={form.birthdate}
                  onChange={handleInputChange}
                  fullWidth
                />

                <TextField label="Cidade" name="city" value={form.city} onChange={handleInputChange} fullWidth />

                <Select
                  label="UF"
                  values={ufs}
                  name="uf"
                  value={form.uf}
                  onChange={handleInputChange}
                  keyValue="_id"
                  keyDisplay="acronym"
                />

                <TextField
                  type="number"
                  label="Expectativa salarial"
                  name="salaryExpectation"
                  value={form.salaryExpectation}
                  onChange={handleInputChange}
                  fullWidth
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

                <InputFile name="curriculum" onChange={handleInputChange} />
              </ViewField>
            </FieldItemsContainer>

            <ViewField>
              <SkillRatingContainer>
                <h3>Habilidades técnicas</h3>
                <FormContext.Provider value={{ form, handleSkillChange, handleRemoveSkill }}>
                  <SkillRating handleAddSkill={handleAddSkill} type="technical" values={form.technicalSkills} />
                </FormContext.Provider>
              </SkillRatingContainer>

              <SkillRatingContainer>
                <h3>Habilidades comportamentais</h3>
                <FormContext.Provider value={{ form, handleSkillChange, handleRemoveSkill }}>
                  <SkillRating handleAddSkill={handleAddSkill} type="behavioral" values={form.behavioralSkills} />
                </FormContext.Provider>
              </SkillRatingContainer>
            </ViewField>

            <FooterButtonsContainer>
              <SecondaryButton onClick={() => setOpen(true)}>Novo</SecondaryButton>
              <PrimaryButton onClick={handleSaveProfessional}>Salvar</PrimaryButton>
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
    </TabContainer>
  );
}

export default ProfessionalsRegistration;
