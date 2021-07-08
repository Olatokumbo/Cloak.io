import Layout from "../components/Layout";
import NotificationCard from "../components/NotificationCard";
import CategoryList from "../sections/CategoryList";
import { Button } from "@material-ui/core";
const Notifications = () => {
  return (
    <Layout>
      <CategoryList />
      <div className="p-4">
        <h1 className="text-2xl mb-5 font-semibold">Your Notifications</h1>
        <div className="w-full min-h-screen flex flex-col items-center">
          <NotificationCard data={{ message: "Hello World", url: "/explore" }} />
          <NotificationCard data={{ message: "Hello World", url: "/explore" }} />
          <NotificationCard data={{ message: "Hello World", url: "/explore" }} />
          <div className="w-full flex justify-center py-2 my-2">
          <Button variant="outlined" color="primary" size="large">Load More</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
