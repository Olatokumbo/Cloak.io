import Link from "next/link";
const Footer = () => {
  return (
    <div className="h-32 w-full p-10 border-gray-200 border-t-2 border-solid">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <Link href="/">
            <h1 className="text-2xl font-light hover: cursor-pointer mr-5">
              cloak.io
            </h1>
          </Link>
        </div>
        <h5 className="text-sm text-gray-600">© Copyright {new Date().getFullYear()}</h5>
      </div>
    </div>
  );
};

export default Footer;
