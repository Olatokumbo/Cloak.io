import {
  Modal,
  Fade,
  Backdrop,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    // position: "absolute",
    transform: `translate(0%, 30%)`,
    minWidth: 180,
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "auto",
    display: "flex",
    flexDirection: "column",
  },
  btn: {
    backgroundColor: "#374151",
    "&:hover": {
      background: "#535e70",
    },
  },
}));
const SocialLinkModal = ({ open, handleClose }) => {
  const classes = useStyles();

  //   const handleDeletePoster = () => {
  //     handleClose();
  //   };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h1 className="text-gray-700 font-semibold">Social Links</h1>
          <h5 className="text-gray-700 font-light my-2">
            Enter your Social Media Profile Links
          </h5>
          <form className="flex flex-col w-full">
            <TextField
              label="Twitter Url"
              variant="outlined"
              margin="dense"
              size="small"
              inputProps={{
                maxLength: 430,
              }}
            />
            <TextField
              label="Facebook Url"
              variant="outlined"
              margin="dense"
              size="small"
              inputProps={{
                maxLength: 430,
              }}
            />
            <TextField
              label="Instagram Url"
              variant="outlined"
              margin="dense"
              size="small"
              inputProps={{
                maxLength: 430,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              margin="normal"
              className={classes.btn}
            >
              Done
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default SocialLinkModal;
