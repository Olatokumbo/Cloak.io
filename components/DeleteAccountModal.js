import { useState } from "react";
import {
  Modal,
  Fade,
  Backdrop,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { deleteAccount } from "../redux/actions/auth";
import { useDispatch } from "react-redux";
import { defaultNotification } from "../utils/notifications";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    // position: "absolute",
    transform: `translate(0%, 80%)`,
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
const DeleteAccountModal = ({ open, handleClose, id }) => {
  const [phrase, setPhrase] = useState("");
  const { displayName } = useSelector((state) => state.auth);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDeletePoster = async () => {
    try {
      await dispatch(deleteAccount());
      defaultNotification("Done", "Deleted your Account");
    } catch (error) {
      alert(error.message);
    }
    handleClose();
  };
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
          <h1 className="text-gray-700 font-semibold">Delete Account?</h1>
          <h5 className="text-gray-700 font-light my-2">
            Are you sure that you want to delete Your Account?
          </h5>
          <h5>
            Please type{" "}
            <span className="font-bold text-gray-700">{displayName}</span>
            to confirm
          </h5>
          <TextField
            type="text"
            variant="outlined"
            margin="normal"
            size="small"
            value={phrase}
            onChange={(e)=>setPhrase(e.target.value)}
            fullWidth
          />
          <div
            // onSubmit={updateDescriptionHandler}
            className="flex flex-col w-full"
          >
            <div className="w-full flex justify-between">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                margin="normal"
                onClick={handleClose}
                // className={classes.btn}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                margin="normal"
                disabled={!(phrase===displayName)}
                className={classes.btn}
                onClick={handleDeletePoster}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default DeleteAccountModal;
