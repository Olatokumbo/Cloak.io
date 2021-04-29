const JobCard = () => {
  return (
    <div className="rounded-md my-2 p-6 shadow-lg bg-white cursor-pointer hover:shadow-xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center mr-4">
          <img
            src="/davidO.jpg"
            alt="me"
            className="w-10 max-h-10 rounded-full mr-3"
          />
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">
              Looking for an editor for my Book
            </h2>
            <h6 className="text-xs text-gray-400 font-medium">faithodesola</h6>
          </div>
        </div>
        <h1 className="text-2xl">₦35,000</h1>
      </div>
      <div className="my-5">
        <h5 className="text-gray-800 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.{" "}
        </h5>
      </div>
      <div className="flex justify-between items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <h5 className="text-sm font-semibold text-gray-400">
          Jan 20, 2021
        </h5>
      </div>
    </div>
  );
};

export default JobCard;
