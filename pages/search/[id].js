import ProfileCarousel from "../../components/ProfileCarousel";
const Profile = () => {
  return (
    <div className="min-h-screen flex">
      <div className="flex-2 bg-white py-5 px-10">
        <h1 className="text-2xl font-semibold my-5">
          Full Stack Web Developer
        </h1>
        <div className="flex items-center  mb-7">
          <img
            src="/davidO.jpg"
            alt="me"
            className="w-10 max-h-10 rounded-full mr-3"
          />
          <div className="flex flex-col">
            <h4 className="text-sm">faithodesola</h4>
            <h6 className="text-xs text-gray-600">Level 2</h6>
          </div>
        </div>
        <h1 className="text-lg font-semibold mt-5 mb-3">My Works</h1>
        <ProfileCarousel />
      </div>
      <div className="flex-1 bg-gray-200"></div>
    </div>
  );
};

export default Profile;
