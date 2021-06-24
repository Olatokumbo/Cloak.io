import { useState, useEffect } from "react";
import {
  Modal,
  Fade,
  Backdrop,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { updateProfileSocialLink } from "../redux/actions/profile";

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
const SocialLinkModal = ({
  open,
  handleClose,
  facebook,
  instagram,
  twitter,
  userId,
}) => {
  const classes = useStyles();
  const [twitterUrl, setTwitterUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

  const updateSocials = async (e) => {
    e.preventDefault();
    console.log("SUBMIT");
    try {
      await updateProfileSocialLink(
        twitterUrl,
        facebookUrl,
        instagramUrl,
        userId
      );
      handleClose();
    } catch (error) {}
  };

//   useEffect(() => {
//     twitter && setTwitterUrl(twitter);
//     facebook && setFacebookUrl(facebook);
//     instagram && setInstagramUrl(instagram);
//   }, [facebook, twitter, instagram]);
  useEffect(() => {
    if (open === false) {
      setTwitterUrl("");
      setFacebookUrl("");
      setInstagramUrl("");
    } else {
      twitter && setTwitterUrl(twitter);
      facebook && setFacebookUrl(facebook);
      instagram && setInstagramUrl(instagram);
    }
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
          <h1 className="text-gray-700 font-semibold">Social Links</h1>
          <h5 className="text-gray-700 font-light my-2">
            Enter your Social Media Profile Links
          </h5>
          <form className="flex flex-col w-full" onSubmit={updateSocials}>
            <TextField
              label="Twitter Url"
              variant="outlined"
              margin="dense"
              size="small"
              onChange={(e) => setTwitterUrl(e.target.value)}
              value={twitterUrl}
              inputProps={{
                maxLength: 430,
              }}
            />
            <TextField
              label="Facebook Url"
              variant="outlined"
              margin="dense"
              size="small"
              onChange={(e) => setFacebookUrl(e.target.value)}
              value={facebookUrl}
              inputProps={{
                maxLength: 430,
              }}
            />
            <TextField
              label="Instagram Url"
              variant="outlined"
              margin="dense"
              size="small"
              onChange={(e) => setInstagramUrl(e.target.value)}
              value={instagramUrl}
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
