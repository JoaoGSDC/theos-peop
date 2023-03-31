import React, { useState } from 'react';

interface IProps {
  fields: any;
}

const useForm = ({ fields }: IProps) => {
  const [form, setForm] = useState(fields);
  const [initForm, setInitForm] = useState(fields);

  /* React.useEffect(() => {
    console.log(form);
  }, [form]); */

  const handleInputChange = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSetFormValueToEdit = (value: any) => {
    setForm(value);
  };

  const handleSkillChange = (event: any, type: 'technical' | 'behavioral', index: number) => {
    const skills = form[type + 'Skills'];
    const skill = skills[index];
    const field = event.target.name.startsWith('weight')
      ? 'weight'
      : event.target.name.startsWith('note')
      ? 'note'
      : 'ability';

    setForm({
      ...form,
      [type + 'Skills']: [
        ...skills.slice(0, index),
        {
          ...skill,
          [field]: {
            ...skill[field],
            value: event.target.value,
          },
        },
        ...skills.slice(index + 1),
      ],
    });
  };

  const handleAddSkill = (type: 'technical' | 'behavioral') => {
    const skills = form[type + 'Skills'];
    const index = skills.length;

    setForm({
      ...form,
      [type + 'Skills']: [
        ...skills,
        {
          weight: { name: 'weight-' + index, value: '' },
          note: { name: 'note-' + index, value: '' },
          ability: { name: 'ability-' + index, value: '' },
        },
      ],
    });

    return index;
  };

  const handleRemoveSkill = (index: number, type: 'technical' | 'behavioral') => {
    const skills = form[type + 'Skills'];

    setForm({
      ...form,
      [type + 'Skills']: [...skills.slice(0, index), ...skills.slice(index + 1)],
    });
  };

  const reset = () => {
    setForm(fields);
  };

  const isDefault = () => {
    return initForm === form;
  };

  return {
    form,
    handleInputChange,
    handleSkillChange,
    handleAddSkill,
    reset,
    isDefault,
    handleSetFormValueToEdit,
    handleRemoveSkill,
  };
};

export default useForm;
