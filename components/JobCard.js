const JobCard = () => {
  return (
    <div className="rounded-md my-5 p-6 shadow-lg bg-white cursor-pointer hover:shadow-xl">
      <div className="flex justify-between mb-5 items-center">
        <div className="flex items-center mr-4">
          <img
            src="/davidO.jpg"
            alt="me"
            className="w-10 max-h-10 rounded-full mr-3"
          />
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">Looking for an editor for my Book</h2>
            <h6 className="text-xs text-gray-400 font-medium">faithodesola</h6>
          </div>
        </div>
        <h1 className="text-2xl">₦35,000</h1>
      </div>
      <div>
        <h5 className="text-gray-800 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.{" "}
        </h5>
      </div>
      <h5 className="text-right text-sm font-semibold text-gray-400">Jan 20, 2021</h5>
    </div>
  );
};

export default JobCard;
