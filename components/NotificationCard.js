// import { MenuItem } from "@material-ui/core";
import { formatRelative, subDays, format } from "date-fns";
import Link from "next/link";
import { IconButton } from "@material-ui/core";
import { Mail } from "@material-ui/icons";
import { BellIcon } from "@heroicons/react/solid";

const NotificationCard = ({ data }) => {
  return (
    <Link href={data.url}>
      <div className="w-full justify-between rounded-md my-2 p-6 shadow-lg bg-white cursor-pointer hover:shadow-xl flex flex-col max-w-3xl border-gray-200 border-solid border-2">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <BellIcon className="text-gray-800 w-8 h-8 m-2 leading-3" />
            <h1 className="text-lg mr-5 font-semibold  text-gray-800">
              {data.message}
            </h1>
          </div>
          <div className="flex items-center">
            <IconButton size="small">
              <Mail />
            </IconButton>
          </div>
        </div>
        <h1 className="text-xs font-semibold  text-gray-800 self-end">
          {/* {formatRelative(
            subDays(new Date(data.date.toDate()), 0),
            new Date(),
            { addSuffix: true }
          )} */}
          {format(
            new Date(data.date._seconds || data.date.seconds * 1000),
            "MMMM dd, yyyy 'at' h:mm a"
          )}
        </h1>
      </div>
    </Link>
  );
};

export default NotificationCard;
