import { MenuItem } from "@material-ui/core";
import { formatRelative, subDays } from "date-fns";

const NotificationItem = ({ data }) => {
  return (
    <MenuItem>
      <div className="flex items-center w-64 justify-between">
        <h1 className="text-sm">{data.message}</h1>
        <h5 className="text-xs text-gray-500">
          {formatRelative(subDays(new Date(data.date.toDate()), 0), new Date(), { addSuffix: true })}
        </h5>
      </div>
    </MenuItem>
  );
};

export default NotificationItem;
