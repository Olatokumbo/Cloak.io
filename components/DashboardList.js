import Link from "next/link";
const DashboardList = ({state}) => {
  return (
    <div className="py-5 px-5 flex overflow-auto w-full whitespace-nowrap border-b-2 border-gray-100 border-solid">
      <div className="flex">
      <Link href="/poster/dashboard"><h5 className={"text-gray-700 mx-4 cursor-pointer hover:text-gray-500" + ((state===1) ? " font-bold" : " font-normal")}>Dashboard</h5></Link>
      <Link href="/poster/hires/buying/active"><h5 className={"text-gray-700 mx-4 cursor-pointer hover:text-gray-500" + ((state===2) ? " font-bold" : " font-normal")}>Buying</h5></Link>
      <Link href="/poster/requests/selling/active"><h5 className={"text-gray-700 mx-4 cursor-pointer hover:text-gray-500" + ((state===3) ? " font-bold" : " font-normal")}>Selling</h5></Link>
      </div>
    </div>
  );
};

export default DashboardList;
