import Layout from "../components/Layout";
import NotificationCard from "../components/NotificationCard";
import CategoryList from "../sections/CategoryList";
import { Button, CircularProgress } from "@material-ui/core";
import useNotification from "../hooks/useNotification";
import { useSelector } from "react-redux";
import {
  fetchNextNotifications,
  fetchNotifications,
} from "../redux/actions/notifications";
const Notifications = () => {
  const id = useSelector((state) => state.auth.uid);
  const { items, loadMore, loading, hasMore } = useNotification(
    fetchNotifications,
    fetchNextNotifications,
    id
  );
  return (
    <Layout>
      <CategoryList />
      <div className="p-4">
        <h1 className="text-2xl mb-5 font-semibold">Your Notifications</h1>
        <div className="w-full min-h-screen flex flex-col items-center">
          {items?.map((notif) => (
            <NotificationCard key={notif.id} data={notif} />
          ))}
          <div className="w-full flex  flex-col justify-center items-center py-2 my-2">
            {loading && <CircularProgress />}
            <Button
              variant="outlined"
              color="primary"
              size="large"
              disabled={!hasMore}
              onClick={loadMore}
            >
              Load More
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
