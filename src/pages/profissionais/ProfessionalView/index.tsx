import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  ButtonsContainer,
  FieldItemsContainer,
  FieldItemsContainerButtons,
  GraphicsContainer,
  HeaderProfessionalContainer,
  ViewContainer,
  ViewField,
  ViewFieldObservation,
  ViewFieldsContainer,
} from './styles';
import { dateToAge } from '../../../utils/dateToAge';
import GraphicDonut from '../../../components/Graphics/GraphicDonut';
import SkillRating from '../../../components/SkillRating';
import { PrimaryButton } from '../../../styles/globals';
import { formatNumberToBRL } from '../../../utils/formatNumberToBRL';
import api from '../../../services/api';
import Link from 'next/link';

function ProfessionalView() {
  const router = useRouter();

  const [professional, setProfessional] = React.useState<any>({});
  const [vacancyName, setVacancyName] = React.useState<string>('');

  const [uf, setUf] = React.useState<string>('');
  const [birthdate, setBirthdate] = React.useState<any>('');
  const [salaryExpectation, setSalaryExpectation] = React.useState<any>(0);

  const [averageVacancy, setAverageVacancy] = React.useState<number>(0);
  const [averageBehavioral, setAverageBehavioral] = React.useState<number>(0);
  const [averageOthersCandidates, setAverageOthersCandidates] = React.useState<number>(0);

  const handleLoadProfessional = React.useCallback(async () => {
    const id = router.pathname?.split('/')[router.pathname?.split('/').length - 1];
    await api.get(`/api/professional/findOne?id=${id}`).then(async (resp: any) => {
      setProfessional(resp.data);

      await api.get(`/api/vacancy/findOne?id=${resp.data.vacancyId}`).then((res: any) => {
        setVacancyName(res.data.name);
      });

      await api.get(`/api/states/findOne?id=${resp.data.uf}`).then((res: any) => {
        setUf(res.data.acronym);
      });

      const _birthdate = dateToAge(resp.data.birthdate);
      const _salaryExpectation = formatNumberToBRL(resp.data.salaryExpectation);

      setBirthdate(_birthdate);
      setSalaryExpectation(_salaryExpectation);
    });
  }, []);

  const handleCalculations = React.useCallback(async () => {
    await calculations();
  }, [calculations]);

  React.useEffect(() => {
    handleLoadProfessional();
    handleCalculations();
  }, [handleLoadProfessional, handleCalculations]);

  async function calculations() {
    calculateAverageVacancy();
    calculateAverageBehavioral();
    await calculateAverageCadidates();
  }

  function calculateAverageVacancy() {
    let weightedSum = 0;
    let weightSum = 0;

    professional?.skills?.technical?.items.map((skillItem: any) => {
      weightedSum += skillItem.note * skillItem.weight;
      weightSum += skillItem.weight;
    });

    const weightedMean = weightedSum / weightSum;
    setAverageVacancy(weightedMean);
  }

  function calculateAverageBehavioral() {
    let weightedSum = 0;
    let weightSum = 0;

    professional.skills?.behavior?.items.map((skillItem: any) => {
      weightedSum += skillItem.note * skillItem.weight;
      weightSum += skillItem.weight;
    });

    const weightedMean = weightedSum / weightSum;
    setAverageBehavioral(weightedMean);
  }

  async function calculateAverageCadidates() {
    await api
      .get(`/api/professional/findManyByVacancyId?id=${professional.id}&vacancyId=${professional.vacancyId}`)
      .then((res: any) => {
        let weightedMean = 0;
        let weightedBehaviorMean = 0;
        let count = 0;

        res.data.map((othersCandidates: any) => {
          let weightedSum = 0;
          let weightedBehaviorSum = 0;
          let weightSum = 0;
          let weightBehaviorSum = 0;

          othersCandidates?.skills?.technical?.items?.map((skillItem: any) => {
            weightedSum += skillItem.note * skillItem.weight;
            weightSum += skillItem.weight;
          });

          othersCandidates?.skills?.behavior?.items?.map((skillItem: any) => {
            weightedBehaviorSum += skillItem.note * skillItem.weight;
            weightBehaviorSum += skillItem.weight;
          });

          weightedMean += weightedSum / weightSum;
          weightedBehaviorMean += weightedBehaviorSum / weightBehaviorSum;
          count++;
        });

        let totalTech = weightedMean / count;
        let totalBehavior = weightedBehaviorMean / count;
        let total = (totalTech + totalBehavior) / 2;

        setAverageOthersCandidates(total);
      });
  }

  return (
    <>
      <ViewContainer>
        <HeaderProfessionalContainer>
          <Link href={`/profissionais`}>
            <Button>
              <ArrowBackIcon />
            </Button>
          </Link>

          <h1>{professional.name}</h1>
          <h1>| {professional.cpf}</h1>
        </HeaderProfessionalContainer>

        <div>
          <ViewFieldsContainer>
            <FieldItemsContainerButtons>
              <FieldItemsContainer>
                <ViewField>
                  <h3>Vaga: </h3>
                  <h3>{vacancyName}</h3>
                </ViewField>

                <ViewField>
                  <h3>Email: </h3>
                  <h3>{professional.email}</h3>
                </ViewField>

                <ViewField>
                  <h3>Idade: </h3>
                  <h3>{birthdate} anos</h3>
                </ViewField>

                <ViewField>
                  <h3>Localidade: </h3>
                  <h3>
                    {professional.city}-{uf}
                  </h3>
                </ViewField>

                <ViewField>
                  <h3>Expectativa Salarial: </h3>
                  <h3>{salaryExpectation}</h3>
                </ViewField>

                <ViewFieldObservation>
                  <h3>Observação: </h3>
                  <h3>{professional.observation === '' ? 'Nenhuma' : professional.observation}</h3>
                </ViewFieldObservation>
              </FieldItemsContainer>

              <FieldItemsContainer>
                <ButtonsContainer>
                  <PrimaryButton>Visualizar Currículo</PrimaryButton>
                </ButtonsContainer>
              </FieldItemsContainer>
            </FieldItemsContainerButtons>

            <FieldItemsContainer>
              <SkillRating isView={true} values={professional?.skills?.technical?.items} />
            </FieldItemsContainer>

            <FieldItemsContainer>
              <SkillRating isView={true} values={professional?.skills?.behavior?.items} />
            </FieldItemsContainer>
          </ViewFieldsContainer>

          <GraphicsContainer>
            <GraphicDonut
              title="Comparativo Técnico"
              values={[averageVacancy, 10]}
              labels={['Positivo', 'Negativo']}
              height="112px"
            />

            <GraphicDonut
              title="Comp. Comportamental"
              values={[averageBehavioral, 10]}
              labels={['Positivo', 'Negativo']}
              height="112px"
            />

            <GraphicDonut
              title="Comp. com a oportunidade"
              values={[(averageVacancy + averageBehavioral) / 2, 10]}
              labels={['Positivo', 'Negativo']}
              height="112px"
            />

            <GraphicDonut
              title="Comp. com candidatos"
              values={[(averageVacancy + averageBehavioral) / 2, averageOthersCandidates]}
              labels={[
                `${professional?.name?.split(' ')[0]} ${
                  professional?.name?.split(' ')[professional?.name?.split(' ').length - 1]
                }`,
                'Outros',
              ]}
              height="112px"
              isPercentage={false}
            />
          </GraphicsContainer>
        </div>
      </ViewContainer>
    </>
  );
}

export default ProfessionalView;
