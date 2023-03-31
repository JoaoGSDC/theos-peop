import { useRouter } from 'next/router';
import React from 'react';
import HeaderPage from '../../components/HeaderPage';
import Tabs from '../../components/Tabs';
import { Card, PagesContainer } from '../../styles/pages.styles';
import VacanciesRegistration from './VacanciesRegistration';
import VacanciesView from './VacanciesView';
import VacancyView from './VacancyView';

function Vacancies() {
  const router = useRouter();

  const [vacancyEdit, setVacancyEdit] = React.useState<any>(0);
  const [value, setValue] = React.useState<number>(0);
  const [codVacancy, setCodVacancy] = React.useState<string>();

  React.useEffect(() => {
    const id = router.pathname.split('/')[2];
    setCodVacancy(id);
  }, [router.pathname]);

  return (
    <>
      <PagesContainer>
        <HeaderPage
          main="Gerenciamento de Vagas"
          subtext="Confira e adicione novas oportunidades para futuros colaboradores!"
        />

        <Card>
          {codVacancy == undefined ? (
            <>
              <Tabs tabs={['VISUALIZAR', 'CADASTRAR']} value={value} setValue={setValue} />

              <VacanciesView
                value={value}
                index={0}
                onSetTab={(tab: number, vacancyId: number) => {
                  setValue(tab);
                  setVacancyEdit(vacancyId);
                }}
              />

              <VacanciesRegistration value={value} index={1} vacancyId={vacancyEdit} />
            </>
          ) : (
            <>
              <VacancyView />
            </>
          )}
        </Card>
      </PagesContainer>
    </>
  );
}

export default Vacancies;
