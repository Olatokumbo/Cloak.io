import Link from "next/link";
const categoryList = () => {
  return (
    <div className="py-2 flex overflow-auto w-full whitespace-nowrap border-b-2 border-gray-100 border-solid">
      <div className="m-auto flex">
        <Link  className="font-normal hover:font-bold" href="/categories/graphics-and-design"><h5 className="text-gray-700 mx-4 cursor-pointer hover:text-gray-500">Graphics and Design</h5></Link>
        <Link href="/categories/technology"><h5 className="text-gray-700 mx-4 cursor-pointer hover:text-gray-500">Technology</h5></Link>
        <Link href="/categories/audio-and-music"><h5 className="text-gray-700 mx-4 cursor-pointer hover:text-gray-500">Audio and Music</h5></Link>
        <Link href="/categories/business"><h5 className="text-gray-700 mx-4 cursor-pointer hover:text-gray-500">Business</h5></Link>
        <Link href="/categories/marketing"><h5 className="text-gray-700 mx-4 cursor-pointer hover:text-gray-500">Marketing</h5></Link>
        <Link href="/categories/writing-and-editing"><h5 className="text-gray-700 mx-4 cursor-pointer hover:text-gray-500">Writing and Editing</h5></Link>
        <Link href="/categories/education-and-training"><h5 className="text-gray-700 mx-4 cursor-pointer hover:text-gray-500">Education and Training</h5></Link>
        <Link href="/categories/media-and-communication"><h5 className="text-gray-700 mx-4 cursor-pointer hover:text-gray-500">Media and Communication</h5></Link>
        <Link href="/categories/health"><h5 className="text-gray-700 mx-4 cursor-pointer hover:text-gray-500">Health</h5></Link>
      </div>
    </div>
  );
};

export default categoryList;
