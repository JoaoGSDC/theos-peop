import React from 'react';

export const FormContext = React.createContext({
  form: {},
  handleSkillChange: (event: any, type: 'technical' | 'behavioral', index: number) => {},
  handleRemoveSkill: (index: number, type: 'technical' | 'behavioral') => {},
});
