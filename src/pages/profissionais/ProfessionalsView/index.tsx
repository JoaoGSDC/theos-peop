import React from 'react';
import { TabContainer } from '../../../components/Tabs/styles';
import Table from '../../../components/Table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PageviewIcon from '@mui/icons-material/Pageview';
import { Button } from '@mui/material';
import Dialog from '../../../components/Dialog';
import api from '../../../services/api';
import Link from 'next/link';

interface ProfessionalsViewProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  onSetTab?: any;
}

function ProfessionalsView(props: ProfessionalsViewProps) {
  const { children, value, index, onSetTab, ...other } = props;

  const [professionals, setProfessionals] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [professionalId, setProfessionalId] = React.useState(0);

  const handleLoadProfessionals = React.useCallback(async () => {
    await api.get('/api/professional/findMany').then((resp) => {
      setProfessionals(resp.data);
    });
  }, [reload]);

  React.useEffect(() => {
    handleLoadProfessionals();
  }, [reload]);

  const handleClickOpen = (id: number) => {
    setProfessionalId(id);
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
            <Link href={`/profissionais/${params.id}`}>
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

  function createRow(id: number, cpf: string, name: string, vacancy: string, actions: any) {
    return {
      id,
      cpf,
      name,
      vacancy,
      actions,
    };
  }

  const columns: any[] = [
    createColumn('cpf', 'CPF', 200, ''),
    createColumn('name', 'Nome', 300, ''),
    createColumn('vacancy', 'Vaga', 400, ''),
    createColumn('actions', '', 200, ''),
  ];

  let rows: any[] = [];
  professionals.map((professional: any) => {
    rows.push(createRow(professional.id, professional.cpf, professional.name, professional.vacancy, ''));
  });

  const handleDeleteProfessional = async () => {
    if (professionalId === 0) {
      return;
    }

    await api.delete(`/api/professional/delete?id=${professionalId}`).then(() => setReload((_reload) => !_reload));
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
            title="Deseja deletar esse profissional?"
            positiveButtonText="Sim"
            negativeButtonText="Cancelar"
            onConfirm={handleDeleteProfessional}
          />
        </>
      )}
    </TabContainer>
  );
}

export default ProfessionalsView;
