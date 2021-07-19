import Layout from "../../components/Layout";
import MenuCard from "../../components/MenuCard";
import PrivateRoute from "../../hoc/PrivateRoute";

const AllRequests = () => {
  return (
    <Layout>
      <div className="w-full min-h-screen p-4">
        <h1 className="text-3xl font-semibold text-gray-700">Dashboard</h1>
        <div className="py-2 px-1 m-4 sm:px-5 sm:m-24">
          <div className="flex flex-wrap justify-center items-center">
            <MenuCard
              title="Buying"
              url="/poster/hires/buying/active"
              photo="/icons/buying.svg"
            />
            <MenuCard
              title="Selling"
              url="/poster/requests/selling/active"
              photo="/icons/selling.svg"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivateRoute(AllRequests);
