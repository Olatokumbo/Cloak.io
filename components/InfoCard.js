import Image from "next/image";
const InfoCard = () => {
  return (
    <div className="flex flex-col h- h-72">
      <div className="flex-1 relative -z-1">
        <Image
          src="/code.jpg"
          className="object-cover rounded-md"
          layout="fill"
        />
      </div>
      <div className="">
        <h1 className="text-lg font-bold text-gray-800">
          Lorem ipsum dolor sit amet, consectetur adipiscing
        </h1>
        <h5 className="text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt
        </h5>
      </div>
    </div>
  );
};

export default InfoCard;
