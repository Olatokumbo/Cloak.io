import Link from "next/link";
import ExploreTile from "../components/ExploreTile";
const Explore = () => {
  return (
    <div className="w-full mt-28">
      <h1 className="text-3xl font-bold text-gray-800">Explore</h1>
      <div className="my-4 grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 w-full">
        <Link href="/categories/graphics-and-design">
          <a>
            <ExploreTile src="/icons/design.svg" title="Graphics and Design" />
          </a>
        </Link>
        <Link href="/categories/technology">
          <a>
            <ExploreTile src="/icons/tech.svg" title="Technology" />
          </a>
        </Link>
        <Link href="/categories/audio-and-music">
          <a>
            <ExploreTile src="/icons/audio.svg" title="Audio and Music" />
          </a>
        </Link>
        <Link href="/categories/business">
          <a>
            <ExploreTile src="/icons/business.svg" title="Business" />
          </a>
        </Link>
        <Link href="/categories/marketing">
          <a>
            {" "}
            <ExploreTile src="/icons/marketing.svg" title="Marketing" />
          </a>
        </Link>
        <Link href="/categories/education-and-training">
          <a>
            <ExploreTile
              src="/icons/training.svg"
              title="Education and Training"
            />
          </a>
        </Link>
        <Link href="/categories/media-and-communication">
          <a>
            <ExploreTile
              src="/icons/media.svg"
              title="Media and Communication"
            />
          </a>
        </Link>
        <Link href="/categories/health">
          <a>
            <ExploreTile src="/icons/health.svg" title="Health" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Explore;
