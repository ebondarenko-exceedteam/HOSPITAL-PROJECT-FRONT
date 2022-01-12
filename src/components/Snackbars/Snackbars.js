import Snackbar from '@material-ui/core/Snackbar';

const Snackbars = ({ message, setOpen, open }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
    </>
  );
};

export default Snackbars;