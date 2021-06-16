import { MenuItem } from "@material-ui/core";
import { formatRelative, subDays } from "date-fns";
import { useRouter } from "next/router";

const NotificationItem = ({ data }) => {
  const router = useRouter();
  return (
    <MenuItem onClick={() => router.push(data.url)}>
      <div className="flex items-center w-80 justify-between">
        <h1 className="text-sm mr-5">{data.message}</h1>
        <h5 className="text-xs text-gray-500 ml-5">
          {formatRelative(
            subDays(new Date(data.date.toDate()), 0),
            new Date(),
            { addSuffix: true }
          )}
        </h5>
      </div>
    </MenuItem>
  );
};

export default NotificationItem;
