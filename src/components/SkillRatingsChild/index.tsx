import React from 'react';
import { Button, TextField } from '@mui/material';
import MaskedInput from 'react-text-mask';
import { Container, Input, SmallInput } from './styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormContext } from '../../context/FormContext';

interface IProps {
  isProfessionals?: boolean;
  type?: 'technical' | 'behavioral';
  index?: number;
}

function SkillRatingsChild({ isProfessionals = true, type = 'technical', index = 0 }: IProps) {
  const { form, handleSkillChange, handleRemoveSkill } = React.useContext(FormContext);

  const [weight, setWeight] = React.useState('');
  const [note, setNote] = React.useState('');
  const [skill, setSkill] = React.useState('');

  React.useEffect(() => {
    const skillRatingValues = (form as any)[`${type}Skills`];

    if (skillRatingValues == undefined) {
      return;
    }

    setWeight(skillRatingValues[index]?.weight?.value);
    setNote(skillRatingValues[index]?.note?.value);
    setSkill(skillRatingValues[index]?.ability?.value);
  }, [form]);

  const handleWeightChange = (event: any) => {
    const value = event.target.value;

    setWeight(value);
    handleSkillChange({ target: { name: 'weight', value } }, type, index);
  };

  const handleNoteChange = (event: any) => {
    const value = event.target.value;

    setNote(value);
    handleSkillChange({ target: { name: 'note', value } }, type, index);
  };

  const handleSkillNameChange = (event: any) => {
    const value = event.target.value;

    setSkill(value);
    handleSkillChange({ target: { name: 'ability', value } }, type, index);
  };

  return (
    <>
      <Container>
        <SmallInput
          label=""
          name={`weight-${index}`}
          value={weight}
          onChange={handleWeightChange}
          blocked={isProfessionals}
          InputProps={{
            inputComponent: (props) => (
              <MaskedInput {...props} mask={[/\d/, /\d/]} placeholderChar={'\u2000'} guide={false} />
            ),
          }}
        />

        {isProfessionals ? (
          <SmallInput
            label=""
            name={`note-${index}`}
            value={note}
            onChange={handleNoteChange}
            InputProps={{
              inputComponent: (props) => (
                <MaskedInput {...props} mask={[/\d/, /\d/]} placeholderChar={'\u2000'} guide={false} />
              ),
            }}
          />
        ) : null}

        <Input
          name={`skill-${index}`}
          value={skill}
          onChange={handleSkillNameChange}
          label=""
          blocked={isProfessionals}
          fullWidth
        />

        {!isProfessionals ? (
          <Button onClick={() => handleRemoveSkill(index, type)}>
            <DeleteIcon />
          </Button>
        ) : null}
      </Container>
    </>
  );
}

export default SkillRatingsChild;
