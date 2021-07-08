// import { MenuItem } from "@material-ui/core";
import { formatRelative, subDays } from "date-fns";
import Link from "next/link";
import { IconButton } from "@material-ui/core";
import { Mail } from "@material-ui/icons";

const NotificationCard = ({ data }) => {
  return (
    <Link href={data.url}>
      <div className="w-full items-center justify-between rounded-md my-2 p-6 shadow-lg bg-green-400 cursor-pointer hover:shadow-xl flex max-w-3xl">
        <h1 className="text-lg mr-5 font-semibold  text-gray-800">
          {data.message}
        </h1>
        <div className="flex items-center">
          {/* <h5 className="text-xs text-gray-500 ml-5">
          {formatRelative(
            subDays(new Date(data.date.toDate()), 0),
            new Date(),
            { addSuffix: true }
          )}
        </h5> */}
          <h1 className="text-lg mr-5 font-semibold  text-gray-800">
            {data.message}
          </h1>
          <IconButton size="small">
            <Mail />
          </IconButton>
        </div>
      </div>
    </Link>
  );
};

export default NotificationCard;
