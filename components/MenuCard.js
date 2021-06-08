import { useRouter } from "next/router";
const MenuCard = ({ title, url }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(url)}
      className="rounded-md my-2 p-6 shadow-lg bg-white cursor-pointer hover:shadow-xl min-h-48 flex flex-col border-gray-500 border-solid border-2"
    >
      <h1 className="m-auto">{title}</h1>
    </div>
  );
};

export default MenuCard;
