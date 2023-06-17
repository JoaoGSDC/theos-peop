import React from 'react';

import HeaderPage from '../../components/HeaderPage';
import { Card, PagesContainer } from '../../styles/pages.styles';
import { CardsContainer, FieldItemsContainer, ViewField } from '../../styles/agenda.styles';
import Calendar from '../../components/Calendar';
import Dialog from '../../components/Dialog';
import { TextField } from '@mui/material';
import useForm from '../../components/UseForm';
import Select from '../../components/Select';
import { convertToBrDate } from '../../utils/convertToBrDate';
import api from '../../services/api';

const vacancies = [
  {
    id: 1,
    name: 'Desenvolvedor FrontEnd Senior',
  },
];

const schedules = [
  { id: 1, hour: '7:00' },
  { id: 2, hour: '8:00' },
  { id: 3, hour: '9:00' },
  { id: 4, hour: '10:00' },
  { id: 5, hour: '11:00' },
  { id: 6, hour: '12:00' },
  { id: 7, hour: '13:00' },
  { id: 8, hour: '14:00' },
  { id: 9, hour: '15:00' },
  { id: 10, hour: '16:00' },
  { id: 11, hour: '17:00' },
  { id: 12, hour: '18:00' },
];

const meetings = [
  {
    id: 1,
    schedule: '10:00',
    name: 'João Gabriel Sousa da Cruz',
    vacancy: 'Desenvolvedor FrontEnd Senior',
    email: 'joaogsdc@gmail.com',
  },
  {
    id: 2,
    schedule: '13:00',
    name: 'João Gabriel Sousa da Cruz',
    vacancy: 'Desenvolvedor FrontEnd Senior',
    email: 'joaogsdc@gmail.com',
  },
  {
    id: 3,
    schedule: '16:00',
    name: 'João Gabriel Sousa da Cruz',
    vacancy: 'Desenvolvedor FrontEnd Senior',
    email: 'joaogsdc@gmail.com',
  },
];

function Agenda() {
  const fields = {
    name: '',
    email: '',
    vacancy: '',
    schedule: '',
  };

  const { form, handleInputChange, handleSetFormValueToEdit } = useForm({ fields });

  const [selectedDate, setSelectedDate] = React.useState<string>(convertToBrDate(new Date()));
  const [open, setOpen] = React.useState<boolean>(false);
  const [meet, setMeet] = React.useState<any>();

  function setViewDateAgenda(date: Date) {
    setSelectedDate(convertToBrDate(date));
  }

  async function handleSaveSchedule() {
    await api.post(`/api/agenda/insert`, fields);
  }

  return (
    <>
      <PagesContainer>
        <HeaderPage main="Agenda de entrevistas" subtext="Marque e gerencie entrevistas com profissionais" />

        <CardsContainer>
          <Card>
            <Calendar onSetDate={setViewDateAgenda} />
          </Card>

          <Card>
            <h2>
              Entrevistas | {selectedDate}
              <button onClick={() => setOpen(true)}>+</button>
            </h2>

            <ul>
              {meetings?.map((meet) => {
                return (
                  <>
                    <li
                      onClick={() => {
                        handleSetFormValueToEdit(meet);
                        setOpen(true);
                      }}
                    >
                      <div>{meet.schedule}</div>
                      <div>{meet.name}</div>
                      <div>{meet.vacancy}</div>
                    </li>
                  </>
                );
              })}
            </ul>
          </Card>
        </CardsContainer>
      </PagesContainer>

      <Dialog
        title="Entrevista"
        type="medium"
        open={open}
        setOpen={setOpen}
        onConfirm={handleSaveSchedule}
        positiveButtonText="Salvar"
        negativeButtonText="Cancelar"
      >
        <FieldItemsContainer>
          <ViewField>
            <TextField type="text" label="Nome" name="name" value={form.name} onChange={handleInputChange} fullWidth />

            <TextField
              type="mail"
              label="Email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              fullWidth
            />
          </ViewField>

          <ViewField>
            <Select
              label="Vaga"
              values={vacancies}
              name="vacancy"
              value={form.vacancy}
              onChange={handleInputChange}
              keyValue="id"
              keyDisplay="name"
            />

            <Select
              label="Horários"
              values={schedules}
              name="schedule"
              value={form.schedule}
              onChange={handleInputChange}
              keyValue="id"
              keyDisplay="hour"
            />
          </ViewField>
        </FieldItemsContainer>
      </Dialog>
    </>
  );
}

export default Agenda;
