import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import {
  IconButton,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import DeleteModal from "../components/DeleteModal";
import { updatePosterVisibility } from "../redux/actions/posters";
import { motion } from "framer-motion";
const MyPosterCard = ({ data, editable }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [visibility, setVisibility] = useState(data.visibility);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const updateVisibility = async () => {
    try {
      await updatePosterVisibility(data.id, !visibility);
      setVisibility((prev) => !prev);
    } catch (error) {}
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex flex-col border-solid border-gray-200 border-2 h-72"
    >
      <div className="flex h-40 relative -z-1">
        <Image
          src={data.works[0] || "/wallpaper.png"}
          className="object-cover"
          layout="fill"
          loading="eager"
        />
      </div>
      <div className="p-2 flex-1 flex flex-col justify-between">
        <h1>{data.title}</h1>
        {editable && (
          <FormControlLabel
            control={
              <Switch
                checked={visibility}
                onChange={updateVisibility}
                color="primary"
              />
            }
            label="Visibility"
          />
        )}
        <div className="w-full flex justify-between items-center">
          <IconButton onClick={handleClick} size="small">
            <DotsHorizontalIcon className="h-4 w-4 m-1 text-gray-700 cursor-pointer" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link href={`/search/${data.id}`}>
              <a target="_blank">
                <MenuItem>View</MenuItem>
              </a>
            </Link>
            {editable && (
              <>
                <Link href={`/poster/${data.id}/edit`}>
                  <a>
                    <MenuItem>Edit</MenuItem>
                  </a>
                </Link>
                <MenuItem onClick={() => setDeleteModalOpen(true)}>
                  Delete
                </MenuItem>
              </>
            )}
          </Menu>
          <div className="flex items-center">
            <h5 className="text-gray-800 mr-1 text-xs">Starting at</h5>
            <h5 className="text-sm font-semibold text-gray-800">
              ₦{data.price}
            </h5>
          </div>
        </div>
      </div>
      <DeleteModal
        open={deleteModalOpen}
        handleClose={closeDeleteModal}
        id={data.id}
        title={data.title}
      />
    </motion.div>
  );
};

export default MyPosterCard;
