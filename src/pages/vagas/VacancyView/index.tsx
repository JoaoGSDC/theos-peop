import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  ButtonsContainer,
  FieldItemsContainer,
  FieldItemsContainerButtons,
  Fields,
  FieldSkillsContainer,
  GraphicsContainer,
  HeaderProfessionalContainer,
  ViewContainer,
  ViewField,
  ViewFieldObservation,
  ViewFieldsContainer,
} from '../../../styles/vacancy-view.styles';
import SkillRating from '../../../components/SkillRating';
import { PrimaryButton } from '../../../styles/globals';
import { formatNumberToBRL } from '../../../utils/formatNumberToBRL';
import api from '../../../services/api';
import { clipBoardText } from '../../../utils/clipBoardText';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IProps {
  vacancy?: any;
}

function VacancyView() {
  const router = useRouter();

  const [vacancy, setVacancy] = React.useState<any>({});
  const [maximumBudget, setMaximumBudget] = React.useState<string>('0');
  const [minimumBudget, setMinimumBudget] = React.useState<string>('0');

  const handleLoadVacancy = React.useCallback(async () => {
    const id = router.pathname.split('/')[router.pathname.split('/').length - 1];
    await api.get(`/api/vacancy/findOne?id=${id}`).then((resp) => {
      setVacancy(resp.data);
      setMaximumBudget(formatNumberToBRL(resp.data.maximumBudget));
      setMinimumBudget(formatNumberToBRL(resp.data.minimumBudget));
    });
  }, []);

  React.useEffect(() => {
    handleLoadVacancy();
  }, []);

  const handleClipBoard = () => {
    const text = clipBoardText(
      vacancy.name,
      vacancy.observation,
      vacancy.skills.technical.items,
      `${minimumBudget} a ${maximumBudget}`,
      vacancy.timeExperienceName
    );

    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ViewContainer>
        {vacancy ? (
          <>
            <HeaderProfessionalContainer>
              <Link href={`/vagas`}>
                <Button>
                  <ArrowBackIcon />
                </Button>
              </Link>

              <h1>{vacancy?.name}</h1>
              <h1>| {vacancy?.sectorName}</h1>
            </HeaderProfessionalContainer>
            <ViewFieldsContainer>
              <Fields>
                <FieldItemsContainer>
                  <ViewField>
                    <h3>Senioridade: </h3>
                    <h3>{vacancy?.seniorityName}</h3>
                  </ViewField>

                  <ViewField>
                    <h3>Gestor: </h3>
                    <h3>{vacancy?.manager}</h3>
                  </ViewField>

                  <ViewField>
                    <h3>Orçamento: </h3>
                    <h3>
                      {minimumBudget} a {maximumBudget}
                    </h3>
                  </ViewField>

                  <ViewField>
                    <h3>Tempo de exp: </h3>
                    <h3>{vacancy?.timeExperienceName}</h3>
                  </ViewField>

                  <FieldItemsContainerButtons>
                    <ButtonsContainer>
                      <PrimaryButton onClick={handleClipBoard}>Copiar descrição da vaga</PrimaryButton>
                    </ButtonsContainer>
                  </FieldItemsContainerButtons>
                </FieldItemsContainer>

                <ViewFieldObservation>
                  <h3>Observação: </h3>
                  <h3>{vacancy?.observation === '' ? 'Nenhuma' : vacancy?.observation}</h3>
                </ViewFieldObservation>
              </Fields>

              <FieldSkillsContainer>
                <SkillRating isView={true} isProfessionals={false} values={vacancy?.skills?.technical?.items} />
                <SkillRating isView={true} isProfessionals={false} values={vacancy?.skills?.behavior?.items} />
              </FieldSkillsContainer>
            </ViewFieldsContainer>
          </>
        ) : null}
      </ViewContainer>
    </>
  );
}

export default VacancyView;
