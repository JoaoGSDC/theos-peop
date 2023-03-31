import React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { SelectContainer, SelectUI } from './styles';

interface IProps {
  label: string;
  values: any[];
  keyDisplay?: string;
  keyValue?: string;
  value?: any;
  name?: string;
  onChange?: any;
  disabled?: boolean;
}

function Select({ label, values, keyDisplay, keyValue, value = '', name, onChange, disabled }: IProps) {
  const [fieldValue, setFieldValue] = React.useState(value);

  React.useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue(event.target.value as string);

    onChange({
      target: {
        name,
        value: event.target.value,
      },
    });
  };

  return (
    <SelectContainer fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <SelectUI
        name={name}
        labelId="demo-simple-select-label"
        value={fieldValue}
        label={label}
        onChange={(event: any) => handleChange(event)}
        fullWidth
        blocked={disabled}
      >
        {values
          ? values?.map((valueItem) => (
              <MenuItem key={valueItem} value={keyValue ? valueItem[keyValue] : valueItem}>
                {keyDisplay ? valueItem[keyDisplay] : valueItem}
              </MenuItem>
            ))
          : null}
      </SelectUI>
    </SelectContainer>
  );
}

export default Select;
