import { useRouter } from "next/router";
import Image from "next/image";
const MenuCard = ({ title, url, photo }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(url)}
      className="rounded-md m-2 p-6 shadow-lg bg-white cursor-pointer hover:shadow-xl min-h-48 w-60 flex flex-col border-gray-500 border-solid border-2"
    >
      <Image
        src={photo}
        width={50}
        height={50}
        alt="Icon Image"
        draggable={false}
      />
      <h1 className="m-auto font-medium text-lg text-gray-600">{title}</h1>
    </div>
  );
};

export default MenuCard;
