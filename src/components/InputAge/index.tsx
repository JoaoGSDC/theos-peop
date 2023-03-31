import MaskedInput from 'react-text-mask';
import { Input } from './styles';

interface IProps {
  label?: string;
  fullWidth?: boolean;
  name: string;
  value: string;
  onChange: (event: any) => void;
}

function InputAge({ label = '', fullWidth = true, name, value, onChange }: IProps) {
  return (
    <>
      <Input
        label={label}
        fullWidth={fullWidth}
        name={name}
        value={value}
        onChange={onChange}
        InputProps={{
          inputComponent: (props: any) => (
            <MaskedInput
              {...props}
              mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
              placeholderChar={'\u2000'}
            />
          ),
        }}
      />
    </>
  );
}

export default InputAge;
