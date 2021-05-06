import { HeartIcon } from "@heroicons/react/outline";
const JobCard = ({ data }) => {
  return (
    <div className="rounded-md my-2 p-6 shadow-lg bg-white cursor-pointer hover:shadow-xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center mr-4">
          <img
            src={data?.photoURL}
            alt="me"
            className="w-10 max-h-10 rounded-full mr-3"
          />
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">{data?.title}</h2>
            <h6 className="text-xs text-gray-400 font-medium">
              {data?.displayName}
            </h6>
          </div>
        </div>
        <h1 className="text-2xl">{`₦${data.price}`|| "" }</h1>
      </div>
      <div className="my-5">
        <h5 className="text-gray-800 text-sm">{data?.description}</h5>
      </div>
      <div className="flex justify-between items-center">
        <HeartIcon className="h-6 w-6" />
        {/* <h5 className="text-sm font-semibold text-gray-400">Jan 20, 2021</h5> */}
      </div>
    </div>
  );
};

export default JobCard;
