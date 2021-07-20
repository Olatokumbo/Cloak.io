import Skeleton from "@material-ui/lab/Skeleton";
import { IconButton, makeStyles } from "@material-ui/core";
import { DotsHorizontalIcon } from "@heroicons/react/solid";

const useStyles = makeStyles((theme) => ({
  m: {
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
  },
  m_sm: {
    marginLeft: "0.10rem",
    marginRight: "0.10rem",
  },
}));

const MyPosterCardSkeleton = () => {
  const classes = useStyles();
  return (
    <div className="flex flex-col border-solid border-gray-200 border-2 h-72">
      <div className="flex h-40 relative -z-1">
        <Skeleton animation="wave" variant="rect" width="100%" height="100%" />
      </div>
      <div className="py-1 px-2 flex-1 flex flex-col justify-between">
        <Skeleton animation="wave" variant="text" height={40} />
        <Skeleton animation="wave" variant="text" height={40} width={70} />
        <div className="w-full flex justify-between items-center">
          <div className="flex">
            <Skeleton
              animation="wave"
              variant="circle"
              width={5}
              height={5}
              className={classes.m_sm}
            />
            <Skeleton
              animation="wave"
              variant="circle"
              width={5}
              height={5}
              className={classes.m_sm}
            />
            <Skeleton
              animation="wave"
              variant="circle"
              width={5}
              height={5}
              className={classes.m_sm}
            />
          </div>
          <div className="flex items-center">
            <Skeleton
              animation="wave"
              variant="text"
              width={50}
              className={classes.m}
            />
            <Skeleton animation="wave" variant="text" width={70} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPosterCardSkeleton;
