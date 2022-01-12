import Snackbar from '@material-ui/core/Snackbar';

const Snackbars = ({ messages, setMessages }) => {
  const { open, message } = messages;
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessages(prev => {
      return {
        ...prev,
        open: false
      }
    });
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