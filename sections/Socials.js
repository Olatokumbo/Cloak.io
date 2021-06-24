import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Twitter, Facebook, Instagram } from "@material-ui/icons";
import SocialLinkModal from "../components/SocialLinkModal";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  icon: {
    width: 25,
    height: 25,
    margin: 2,
    color: "#4b5563",
  },
}));

const Socials = ({userId}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const uid = useSelector((state) => state.auth.uid);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="flex flex-col p-5 w-full border-solid border-gray-300 border-2 mt-5">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-gray-700 mb-3">Social Links</h1>
        {uid === userId && (
          <h1
            className="font-normal text-gray-500 mb-3 cursor-pointer hover:underline"
            onClick={handleOpen}
          >
            Edit
          </h1>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <Twitter className={classes.icon} />
          <h5 className="text-sm text-gray-600">faithodesola</h5>
        </div>
        <div className="flex items-center">
          <Facebook className={classes.icon} />
          <h5 className="text-sm text-gray-600">faithodesola</h5>
        </div>
        <div className="flex items-center">
          <Instagram className={classes.icon} />
          <h5 className="text-sm text-gray-600">faithodesola</h5>
        </div>
        <SocialLinkModal open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default Socials;
