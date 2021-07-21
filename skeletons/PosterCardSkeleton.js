import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { StarIcon } from "@heroicons/react/solid";

const useStyles = makeStyles((theme) => ({
  m: {
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
  },
}));

const PosterCardSkeleton = () => {
  const classes = useStyles();
  return (
    <div className="min-h-80 w-24 min-w-full flex flex-col border-2 border-solid border-gray-300 shadow-xl hover:shadow-2xl cursor-pointer rounded">
      <div className="h-40 relative -z-1">
        <Skeleton animation="wave" variant="rect" height={160} />
      </div>
      <div className="flex flex-col p-2 flex-auto">
        <Skeleton animation="wave" variant="text" height={40} />
        <Skeleton animation="wave" variant="text" />
        <Skeleton animation="wave" variant="text" />
        <Skeleton animation="wave" variant="text" />

        <div className="flex my-1">
          <div className="flex w-full justify-between">
            <div className="flex items-center">
              <Skeleton animation="wave" variant="circle" width={30} height={30} />
              <div className="flex flex-col ml-2">
                <Skeleton animation="wave" variant="text" width={90} />
              </div>
            </div>
            <div className="flex self-end">
              <LocationMarkerIcon className="h-5 w-5 text-gray-500" />
              <Skeleton animation="wave" variant="text" width={50} />
            </div>
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <div className="flex">
            <StarIcon className="h-6 w-6 text-yellow-400" />
            <Skeleton animation="wave" variant="text" width={30} />
            <Skeleton animation="wave" variant="text" width={20} className={classes.m} />
          </div>
          <div className="flex items-center">
            <Skeleton animation="wave" variant="text" width={20} className={classes.m} />
            <Skeleton animation="wave" variant="text" width={70} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterCardSkeleton;
