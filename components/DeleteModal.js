import { useState } from "react";
import {
  Modal,
  Fade,
  Backdrop,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { deletePoster } from "../redux/actions/posters";
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
const DeleteModal = ({ open, handleClose, id, title }) => {
  const [phrase, setPhrase] = useState("");
  const classes = useStyles();

  const handleDeletePoster = () => {
    deletePoster(id);
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
          <h1 className="text-gray-700 font-semibold">Delete Poster</h1>
          <h5 className="text-gray-700 font-light my-2">
            Are you sure that you want to delete this Poster?
          </h5>
          <h5>
            Please type{" "}
            <span className="font-bold text-sm text-gray-700">{title}</span>{" "}
            to confirm
          </h5>
          <TextField
            type="text"
            variant="outlined"
            margin="normal"
            size="small"
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
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
                disabled={!(phrase === title)}
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

export default DeleteModal;
