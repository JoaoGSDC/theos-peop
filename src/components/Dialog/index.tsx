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
  edit?: boolean;
  onConfirm?: any;
  children?: any;
  type?: '' | 'medium';
}

function Dialog({
  open,
  setOpen,
  title,
  positiveButtonText,
  negativeButtonText,
  edit = false,
  onConfirm,
  children,
  type = '',
}: IProps) {
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
        type={type}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <button>delete</button>

        {children ? (
          <>
            <div>{children}</div>
          </>
        ) : null}

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
