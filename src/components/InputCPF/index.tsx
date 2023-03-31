import React from 'react';
import { TextField } from '@mui/material';
import MaskedInput from 'react-text-mask';

interface IProps {
  name: string;
  value: string;
  onChange: (event: any) => void;
}

function InputCPF({ name, value, onChange }: IProps) {
  return (
    <>
      <TextField
        label="CPF"
        name={name}
        value={value}
        onChange={onChange}
        fullWidth
        InputProps={{
          inputComponent: (props: any) => (
            <MaskedInput
              {...props}
              mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
              placeholderChar={'\u2000'}
            />
          ),
        }}
      />
    </>
  );
}

export default InputCPF;
