import DashboardList from "../../../components/DashboardList";
import Layout from "../../../components/Layout";
import MenuCard from "../../../components/MenuCard";
import PrivateRoute from "../../../hoc/PrivateRoute";

const AllRequests = () => {
  return (
    <Layout>
      <DashboardList state={3} />
      <div className="w-full min-h-screen p-4">
        <h1 className="text-3xl font-semibold text-gray-700">My Work Orders</h1>
        <div className="py-2 px-1 m-4 sm:px-5 sm:m-24">
          <div className="flex flex-wrap justify-center items-center">
            <MenuCard
              title="Pending"
              url="/poster/requests/pending"
              photo="/icons/clock.svg"
            />
            <MenuCard
              title="Finished"
              url="/poster/requests/done"
              photo="/icons/checked.svg"
            />
            <MenuCard
              title="Cancelled"
              url="/poster/requests/cancelled"
              photo="/icons/cancel.svg"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivateRoute(AllRequests);
