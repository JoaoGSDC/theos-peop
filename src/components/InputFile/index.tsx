import { Alert, Snackbar } from '@mui/material';
import React, { useState, useRef } from 'react';
import { InputFileCustom } from './styles';

function InputFile({ value, name, onChange }: any) {
  const fileInput = useRef(null);
  const [error, setError] = useState<string>();
  const [open, setOpen] = useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event: any) => {
    const file = event.target.files[0];

    if (file.type !== 'application/pdf') {
      (fileInput?.current as any).value = '';
      setOpen(true);
      setError('Somente arquivos PDF são permitidos!');
      return;
    }

    const fileUrl = URL.createObjectURL(file);

    const _event = {
      target: {
        name,
        value: fileUrl,
      },
    };

    onChange(_event);
    setError('');
  };

  return (
    <>
      <InputFileCustom name={name} type="file" ref={fileInput} accept="application/pdf" onChange={handleChange} />

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

export default InputFile;
