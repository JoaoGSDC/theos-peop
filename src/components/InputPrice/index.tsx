import MaskedInput from 'react-text-mask';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';

interface IProps {
  label?: string;
  fullWidth?: boolean;
}

function InputPrice({ label = '', fullWidth = true }: IProps) {
  return (
    <>
      <OutlinedInput
        fullWidth
        id="outlined-adornment-amount"
        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
        label="Amount"
      />
    </>
  );
}

export default InputPrice;
