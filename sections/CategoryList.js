import Link from "next/link";
const CategoryList = ({ id }) => {
  return (
    <div className="py-2 flex overflow-auto w-full whitespace-nowrap border-b-2 border-gray-100 border-solid">
      <div className="m-auto flex">
        <Link href="/categories/graphics-and-design">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
              (id === "graphics-and-design" && " font-semibold")
            }
          >
            Graphics & Design
          </h5>
        </Link>
        <Link href="/categories/technology">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
              (id === "technology" && " font-semibold")
            }
          >
            Technology
          </h5>
        </Link>
        <Link href="/categories/audio-and-music">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
              (id === "audio-and-music" && " font-semibold")
            }
          >
            Audio & Music
          </h5>
        </Link>
        <Link href="/categories/business">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
              (id === "business" && " font-semibold")
            }
          >
            Business
          </h5>
        </Link>
        <Link href="/categories/marketing">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
              (id === "marketing" && " font-semibold")
            }
          >
            Marketing
          </h5>
        </Link>
        <Link href="/categories/writing-and-editing">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
              (id === "writing-and-editing" && " font-semibold")
            }
          >
            Writing & Editing
          </h5>
        </Link>
        <Link href="/categories/education-and-training">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
              (id === "education-and-training" && " font-semibold")
            }
          >
            Education & Training
          </h5>
        </Link>
        <Link href="/categories/media-and-communication">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
              (id === "media-and-communication" && " font-semibold")
            }
          >
            Media & Communication
          </h5>
        </Link>
        <Link href="/categories/health">
          <h5
            className={
              "text-gray-700 mx-4 cursor-pointer hover:text-gray-500" +
              (id === "health" && " font-semibold")
            }
          >
            Health
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default CategoryList;
