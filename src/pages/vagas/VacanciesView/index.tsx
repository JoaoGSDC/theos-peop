import React from 'react';
import { TabContainer } from '../../../components/Tabs/styles';
import Table from '../../../components/Table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PageviewIcon from '@mui/icons-material/Pageview';
import { Button } from '@mui/material';
import Dialog from '../../../components/Dialog';
import api from '../../../services/api';
import { convertToBrDate } from '../../../utils/convertToBrDate';
import Link from 'next/link';

interface VacanciesViewProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  onSetTab?: any;
}

function VacanciesView(props: VacanciesViewProps) {
  const { children, value, index, onSetTab, ...other } = props;

  const [vacancies, setVacancies] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [vacancyId, setVacancyId] = React.useState(0);

  const handleLoadVacancies = React.useCallback(async () => {
    await api.get('/api/vacancy/findMany').then((resp) => {
      setVacancies(resp.data);
    });
  }, [reload]);

  React.useEffect(() => {
    handleLoadVacancies();
  }, [reload]);

  const handleClickOpen = (id: number) => {
    setVacancyId(id);
    setOpen(true);
  };

  function createColumn(field: string, headerName: string, width: number, id: string) {
    return {
      field,
      headerName,
      width,
      renderCell: (params: any) =>
        field === 'actions' ? (
          <>
            <Link href={`/vagas/${params.id}`}>
              <Button>
                <PageviewIcon />
              </Button>
            </Link>

            <Button onClick={() => onSetTab(1, params.id)}>
              <EditIcon />
            </Button>

            <Button onClick={() => handleClickOpen(params.id)}>
              <DeleteIcon />
            </Button>
          </>
        ) : null,
    };
  }

  function createRow(id: number, name: string, createdAt: string, actions: any) {
    return {
      id,
      name,
      createdAt,
      actions,
    };
  }

  const columns: any[] = [
    createColumn('id', 'ID', 200, ''),
    createColumn('name', 'Nome', 500, ''),
    createColumn('createdAt', 'Criado em', 200, ''),
    createColumn('actions', '', 200, ''),
  ];

  let rows: any[] = [];
  vacancies.map((vacancy: any) => {
    rows.push(createRow(vacancy.id, vacancy.name, String(convertToBrDate(vacancy.createdAt)), ''));
  });

  const handleDeleteVacancy = async () => {
    if (vacancyId === 0) {
      return;
    }

    await api.delete(`/api/vacancy/delete?id=${vacancyId}`).then(() => setReload((_reload) => !_reload));
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
          <Table columns={columns} rows={rows} />

          <Dialog
            open={open}
            setOpen={setOpen}
            title="Deseja deletar essa vaga?"
            positiveButtonText="Sim"
            negativeButtonText="Cancelar"
            onConfirm={handleDeleteVacancy}
          />
        </>
      )}
    </TabContainer>
  );
}

export default VacanciesView;
