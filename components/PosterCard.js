import { truncate } from "../utils/truncate";
import Image from "next/image";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { Avatar, makeStyles } from "@material-ui/core";
import { StarIcon } from "@heroicons/react/solid";
import { getReview } from "../utils/reviews";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  avatar: {
    // marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 25,
    height: 25,
  },
}));

const PosterCard = ({ data, searched }) => {
  const classes = useStyles();
  return (
    <motion.div
      layout
      whileHover={{ opacity: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="h-full flex flex-col border-2 border-solid border-gray-300 shadow-xl hover:shadow-2xl cursor-pointer rounded"
    >
      <div className="h-40 relative -z-1">
        <Image
          src={data.works[0] || "/wallpaper.png"}
          className="object-cover"
          layout="fill"
          loading="eager"
        />
      </div>
      <div className="flex flex-col p-2 flex-auto">
        <h1 className="text-md font-medium text-gray-800">{data.title}</h1>
        <h1 className="text-xs text-gray-600 flex-1 w-100 overflow-hidden overflow-ellipsis">
          {truncate(data.description[0])}
        </h1>
        <div className="flex my-1">
          <div className="flex w-full justify-between">
            <div className="flex items-center">
              <Avatar
                src={searched ? data.photoURL : data.authorData.photoURL}
                className={classes.avatar}
              />
              <div className="flex flex-col">
                <h4 className="text-sm font-semibold">
                  {searched ? data.displayName : data.authorData.displayName}
                </h4>
                {/* <h6 className="text-xs text-gray-600">Level 2</h6> */}
              </div>
            </div>
            <div className="flex self-end">
              <LocationMarkerIcon className="h-5 w-5 text-gray-500" />
              <h5 className="text-xs self-end text-gray-500">
                {data.location || "Unspecified"}
              </h5>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          {/* {data.ratings.length > 0 && ( */}
          <div className="flex">
            <StarIcon className="h-6 w-6 text-yellow-400" />
            <h1 className="text-yellow-400 font-bold">
              {getReview(data.ratings)}
            </h1>
            <h5 className="mx-1 font-medium text-gray-400">
              ({data.ratings.length})
            </h5>
          </div>
          {/* )} */}
          <div className="flex items-center">
            <h5 className="text-gray-800 mr-1 text-xs">Starts at</h5>
            <h5 className="text-xl font-semibold text-gray-800">
              ₦{data.price}
            </h5>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PosterCard;
