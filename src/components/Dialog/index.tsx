import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { DialogContainer } from './styles';

interface IProps {
  open: boolean;
  setOpen: any;
  title: string;
  positiveButtonText: string;
  negativeButtonText: string;
  onConfirm?: any;
}

function Dialog({ open, setOpen, title, positiveButtonText, negativeButtonText, onConfirm }: IProps) {
  const handleConfirm = () => {
    handleClose();
    onConfirm(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogContainer
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>{negativeButtonText}</Button>
          <Button onClick={handleConfirm} autoFocus>
            {positiveButtonText}
          </Button>
        </DialogActions>
      </DialogContainer>
    </>
  );
}

export default Dialog;
