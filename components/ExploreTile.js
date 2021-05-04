const ExploreTile = ({title, src}) => {
  return (
    <div className="my-5 mx-1 sm:mx-2 p-7 flex flex-col justify-center rounded-md cursor-pointer">
      <img className="w-12 h-auto m-auto" src={src} alt="design" />
      <h5 className="font-semibold text-gray-600 text-sm text-center">{title}</h5>
    </div>
  );
};

export default ExploreTile