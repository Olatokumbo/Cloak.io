import Layout from "../../../components/Layout";
import MenuCard from "../../../components/MenuCard";

const AllRequests = () => {
  return (
    <Layout>
      <div className="p-5 m-24">
        <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
          <MenuCard title="Pending Work Order" url="/poster/requests/pending" />
          <MenuCard title="Finished Works" url="/poster/requests/done" />
        </div>
      </div>
    </Layout>
  );
};

export default AllRequests;
