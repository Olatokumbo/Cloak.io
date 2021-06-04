import Image from "next/image";
const InfoCard = ({title, subtitle}) => {
  return (
    <div className="flex flex-col h-72">
      <div className="flex-1 relative -z-1 max-h-52">
        <Image
          src="/code.jpg"
          className="object-cover rounded-md"
          layout="fill"
        />
      </div>
      <div className="">
        <h1 className="text-lg font-bold text-gray-800">
          {title}
        </h1>
        <h5 className="text-gray-500">
          {subtitle}
        </h5>
      </div>
    </div>
  );
};

export default InfoCard;
