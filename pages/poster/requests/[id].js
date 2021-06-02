import Layout from "../../../components/Layout";
const WorkOrder = () => {
  return (
    <Layout>
      <div className="flex p-3 flex-col md:flex-row">
        <div className="flex-1 px-3"></div>
        <div className="flex-1 md:flex-2 lg:flex-3 min-h-screen w-full p-5 border-solid border-gray-100 border-2">
        <h1 className="text-2xl font-bold my-1 text-center">
              Work Order
            </h1>
          <div className="flex justify-between items-center flex-col md:flex-row">
            <h1 className="text-2xl font-semibold my-1 text-center md:my-5">
              Title
            </h1>
            <h5 className="text-2xl font-semibold text-gray-800">₦{10000}</h5>
          </div>
          <h1 className="font-bold text-lg my-5 text-gray-800">Description</h1>
          {[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          ].map((text, index) => (
            <p key={index} className="my-3 text-sm">
              {text}
            </p>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default WorkOrder;
