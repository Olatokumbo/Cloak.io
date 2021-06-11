import { useState, useEffect } from "react";
import { BellIcon } from "@heroicons/react/outline";
import { Menu, MenuItem } from "@material-ui/core";
import { getNotifications } from "../redux/actions/notifications";
import { useDispatch, useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";
const Notification = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.uid);
  const notifications = useSelector((state) => state.notif.notifications);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (userId) {
      dispatch(getNotifications(userId));
    }
  }, [userId]);
  return (
    <>
      <BellIcon
        className="h-6 w-6 text-gray-600 mx-5 cursor-pointer hover:text-gray-900"
        onClick={handleClick}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        getContentAnchorEl={null}
      >
        {notifications.map((notif) => (
          <NotificationItem key={notif.id} data={notif} />
        ))}
      </Menu>
    </>
  );
};

export default Notification;
