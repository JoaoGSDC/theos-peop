import React from 'react';
import Avatar from '../Avatar';
import LightDarkButton from '../LightDarkButton';
import {
  ButtonAll,
  Container,
  Figure,
  HeaderSidebarContainer,
  LastProfessionalsContainer,
  LastProfessionalsHeader,
} from './styles';

import TopicsList from '../TopicsList';
import api from '../../services/api';
import { ITopicListItem } from '../../interfaces/ITopicListItem';
import { formatDateWriteBR } from '../../utils/formatDateToWriteBR';
import Link from 'next/link';

function Sidebar() {
  const [professionals, setProfessionals] = React.useState<ITopicListItem[]>([]);

  const handleLoadLimitedProfessionals = React.useCallback(async () => {
    await api.get(`/api/professional/findMany?limit=4`).then((res: any) => {
      let data: ITopicListItem[] = [];

      res.data.map((value: any) => {
        data.push({
          title: value.name,
          subtitle: formatDateWriteBR(value.createdAt),
          route: `/profissionais/${value.id}`,
        });
      });

      setProfessionals(data);
    });
  }, []);

  React.useEffect(() => {
    handleLoadLimitedProfessionals();
  }, []);

  return (
    <>
      <Container>
        <HeaderSidebarContainer>
          <LightDarkButton />
          <Avatar />
        </HeaderSidebarContainer>

        <Figure>
          <img src="/assets/undraw_interview_re_e5jn.svg" alt="interview" />
        </Figure>

        <LastProfessionalsContainer>
          <LastProfessionalsHeader>
            <h3>Últimos profissionais</h3>

            <Link href={`/profissionais`}>
              <ButtonAll>
                <h5>Ver todos</h5>
              </ButtonAll>
            </Link>
          </LastProfessionalsHeader>

          <TopicsList data={professionals} />
        </LastProfessionalsContainer>
      </Container>
    </>
  );
}

export default Sidebar;
