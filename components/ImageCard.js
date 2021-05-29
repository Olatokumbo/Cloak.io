import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
const ImageCard = ({ url, deletePhoto, photo }) => {
  return (
    <div className="flex flex-col w-52 h-full p-4 m-2.5 bg-gray-800 rounded-lg items-center">
      <div className="h-full w-full">
        <img src={url} alt="slideshow" />
      </div>
      <div className="mt-3">
        <IconButton size="small" onClick={() => deletePhoto(photo)}>
          <DeleteIcon style={{ color: "white" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default ImageCard;
