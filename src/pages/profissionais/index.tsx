import { useRouter } from 'next/router';
import React from 'react';
import HeaderPage from '../../components/HeaderPage';
import Tabs from '../../components/Tabs';
import { Card, PagesContainer } from '../../styles/pages.styles';
import ProfessionalsRegistration from './ProfessionalsRegistration';
import ProfessionalsView from './ProfessionalsView';
import ProfessionalView from './ProfessionalView';

function Professionals() {
  const router = useRouter();

  const [professionalEdit, setProfessionalEdit] = React.useState<any>({});
  const [value, setValue] = React.useState<number>(0);
  const [codProfessional, setCodProfessional] = React.useState<string>();

  React.useEffect(() => {
    const id = router.pathname.split('/')[2];
    setCodProfessional(id);
  }, [router.pathname]);

  return (
    <>
      <PagesContainer>
        <HeaderPage
          main="Gerenciamento de Profissionais"
          subtext="Confira e adicione candidatos para possíveis novas oportunidades!"
        />

        <Card>
          {codProfessional == undefined ? (
            <>
              <Tabs tabs={['VISUALIZAR', 'CADASTRAR']} value={value} setValue={setValue} />
              <ProfessionalsView
                value={value}
                index={0}
                onSetTab={(tab: number, professional: any) => {
                  setValue(tab);
                  setProfessionalEdit(professional);
                }}
              />
              <ProfessionalsRegistration value={value} index={1} professionalId={professionalEdit} />{' '}
            </>
          ) : (
            <>
              <ProfessionalView />
            </>
          )}
        </Card>
      </PagesContainer>
    </>
  );
}

export default Professionals;
