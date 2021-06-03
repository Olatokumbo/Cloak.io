import { useState, useEffect } from "react";
import {
  Modal,
  Fade,
  Backdrop,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
// import { deleteJob } from "../redux/actions/jobs";
import { useRouter } from "next/router";
import { hireMe } from "../redux/actions/hires";
const useStyles = makeStyles((theme) => ({
  paper: {
    // position: "absolute",
    transform: `translate(0%, 20%)`,
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
const DeleteModal = ({ open, handleClose, id, data }) => {
  const classes = useStyles();
  const router = useRouter();
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(data.price);

  const handleHire = async () => {
    try {
      await hireMe({title, description:description.split("\n"), price, userId: data.userId, customerId: id })
      alert("Success")
    //   router.replace("/job/all");
    } catch (error) {
     alert(error.message)
    }
    handleClose();
  };

  useEffect(() => {
    setTitle(data.title);
    setPrice(data.price)
  }, [open]);
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
          <h1 className="text-gray-700 font-semibold">Hire Request Form</h1>
          <h5 className="text-gray-700 font-light my-3 text-sm">
            *Please contact the seller before hiring*
          </h5>
          <form>
            <TextField
              name="Title"
              size="small"
              label="Title"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="off"
              required
              value={title}
            />
            <TextField
              type="number"
              name="price"
              size="small"
              label="Price"
              variant="outlined"
              fullWidth={true}
              margin="dense"
                InputProps={{ inputProps: { min: data.price} }}
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
              disabled
            />
            <TextField
              name="description"
              size="small"
              label="Description"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              multiline={true}
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </form>
          <div
            // onSubmit={updateDescriptionHandler}
            className="flex flex-col w-full"
          >
            <div className="w-full flex justify-between">
              <Button
                variant="contained"
                color="secondary"
                margin="dense"
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
                className={classes.btn}
                onClick={handleHire}
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
