import Cookies from 'js-cookie';
import React from 'react';
import GraphicLine from '../../components/Graphics/GraphicLine';
import GraphicPolarArea from '../../components/Graphics/GraphicPolarArea';
import HeaderPage from '../../components/HeaderPage';
import Select from '../../components/Select';
import useForm from '../../components/UseForm';
import api from '../../services/api';
import { PrimaryButton } from '../../styles/globals';
import { PagesContainer } from '../../styles/pages.styles';
import { AnalyticsCard, ViewField, FieldItemsContainer, GroupGraphics } from '../../styles/analytics.styles';

function Analytics() {
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const [vacancies, setVacancies] = React.useState<any[]>([]);
  const [applicationsPerMonth, setApplicationsPerMonth] = React.useState<any[]>([]);
  const [applicationsByState, setApplicationsByState] = React.useState<any[]>([]);

  const modules = [
    { id: 1, name: 'Hunting' },
    { id: 2, name: 'Gestão de colaboradores' },
  ];

  const fields = {
    module: 1,
    year: 2023,
    vacancy: 0,
  };

  const { form, handleInputChange } = useForm({ fields });

  const handleLoadVacancies = React.useCallback(async () => {
    await api.get('/api/vacancy/findMany').then((resp) => {
      const _vacancies = [{ id: 0, name: 'Todas' }, ...resp.data];
      setVacancies(_vacancies);
    });

    await handleFilterDataAnalytics();
  }, []);

  React.useEffect(() => {
    handleLoadVacancies();
  }, []);

  const handleFilterDataAnalytics = async () => {
    const company = Cookies.get('company') as string;

    await api
      .get(`/analytics/applicationsPerMonth?year=${form.year}&vacancyId=${form.vacancy}&company=${company}`)
      .then((resp) => {
        setApplicationsPerMonth(resp.data);
      });

    await api
      .get(`/analytics/applicationsByState?year=${form.year}&vacancyId=${form.vacancy}&company=${company}`)
      .then((resp) => {
        setApplicationsByState(resp.data);
        setLoaded(true);
      });
  };

  return (
    <>
      <PagesContainer>
        <HeaderPage main="Analytics" subtext="Analise os profissionais em seu sistema" />

        <AnalyticsCard isFilters={true}>
          <FieldItemsContainer>
            <ViewField>
              <Select
                label="Módulo"
                values={modules}
                name="module"
                value={form.module}
                onChange={handleInputChange}
                keyValue="id"
                keyDisplay="name"
                disabled={true}
              />

              <Select
                label="Ano"
                values={[{ id: 2023, name: 2023 }]}
                name="year"
                value={form.year}
                onChange={handleInputChange}
                keyValue="id"
                keyDisplay="name"
                disabled={true}
              />

              <Select
                label="Vaga"
                values={vacancies}
                name="vacancy"
                value={form.vacancy}
                onChange={handleInputChange}
                keyValue="id"
                keyDisplay="name"
              />

              <PrimaryButton onClick={handleFilterDataAnalytics}>Filtrar</PrimaryButton>
            </ViewField>
          </FieldItemsContainer>
        </AnalyticsCard>

        {loaded ? (
          <>
            <GroupGraphics>
              <AnalyticsCard>
                <GraphicLine
                  title="Candidaturas por mês"
                  values={[
                    {
                      name: 'Candidatos',
                      data: applicationsPerMonth.map((application) => application.count),
                    },
                  ]}
                  categories={applicationsPerMonth.map((application) => application.name.substring(0, 3))}
                />
              </AnalyticsCard>

              <AnalyticsCard>
                <GraphicPolarArea
                  title="Candidatos por estado"
                  values={applicationsByState.map((application) => application.count)}
                  labels={applicationsByState.map((application) => application.uf)}
                />
              </AnalyticsCard>
            </GroupGraphics>

            <GroupGraphics>
              <AnalyticsCard>
                <GraphicLine
                  title="Candidaturas por mês"
                  values={[
                    {
                      name: 'Candidatos',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                    },
                  ]}
                  categories={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']}
                />
              </AnalyticsCard>
            </GroupGraphics>
          </>
        ) : null}
      </PagesContainer>
    </>
  );
}

export default Analytics;
