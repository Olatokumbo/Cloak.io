import { useState } from "react";
import Layout from "../../../components/Layout";
import CategoryList from "../../../sections/CategoryList";
import { useRouter } from "next/router";
import {
  Avatar,
  makeStyles,
  Modal,
  TextField,
  Button,
  Backdrop,
  Fade,
  IconButton,
} from "@material-ui/core";
import { LocationMarkerIcon, CogIcon } from "@heroicons/react/solid";
import MyPosterCard from "../../../components/MyPosterCard";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Link from "next/link";
import {
  updateProfileDescription,
  uploadProfilePhoto,
} from "../../../redux/actions/profile";
import useProfile from "../../../hooks/useProfile";
import Socials from "../../../sections/Socials";
import { PhotoCamera } from "@material-ui/icons";
import { imageResizer } from "../../../utils/imageResizer";
import {
  errorNotification,
  successNotification,
} from "../../../utils/notifications";
const useStyles = makeStyles((theme) => ({
  avatar: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    width: 90,
    height: 90,
  },
  paper: {
    // position: "absolute",
    transform: `translate(0%, 30%)`,
    minWidth: 180,
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "auto",
    display: "flex",
    flexDirection: "column",
  },
  btn: {
    backgroundColor: "#374151",
    "&:hover": {
      background: "#535e70",
    },
  },
  btn1: {
    alignSelf: "flex-end",
  },
  icon: {
    width: 25,
    height: 25,
    margin: 2,
    color: "#4b5563",
  },
  changeProfileButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
  },
}));

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { uid, loading } = useSelector((state) => state.auth);
  const [description, setDescription] = useState("");
  const { user, posters } = useProfile(id, uid, loading);

  const handleOpen = () => {
    setDescription(user.description);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateDescriptionHandler = async (e) => {
    e.preventDefault();
    try {
      updateProfileDescription({
        id: uid,
        description: description.split("\n"),
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateProfilePhoto = async (file) => {
    try {
      const resizedPhotos = await imageResizer(file);
      await uploadProfilePhoto(uid, resizedPhotos);
      // successNotification("Success", "Updated Profile Picture");
    } catch (error) {
      errorNotification("Failed", error.message);
    }
  };
  return (
    <Layout>
      <CategoryList />
      <div className="flex p-3 flex-col md:flex-row">
        <div className="flex-1 px-3">
          <div className="flex flex-col justify-center items-center py-5 px-10 w-full border-solid border-gray-300 border-2">
            {uid === user.id && (
              <IconButton
                className={classes.btn1}
                onClick={() => router.push(`/profile/${uid}/edit/account`)}
              >
                <CogIcon className="h-6 w-6 text-gray-500" />
              </IconButton>
            )}
            <div className="relative">
              <Avatar src={user.photoURL} className={classes.avatar} />
              {uid === user.id && (
                <div>
                  <input
                    // accept="image/*"
                    accept=".jpeg, .jpg, .png"
                    style={{ display: "none" }}
                    id="raised-button-file"
                    type="file"
                    onChange={(e) => updateProfilePhoto(e.target.files)}
                  />
                  <label
                    htmlFor="raised-button-file"
                    style={{ display: "contents" }}
                  >
                    <IconButton
                      className={classes.changeProfileButton}
                      variant="raised"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </div>
              )}
            </div>
            <h1>{user.displayName}</h1>
            <h5 className="text-xs text-gray-600">{user.email}</h5>
            {user.location && (
              <div className="flex items-end mb-2">
                <LocationMarkerIcon className="h-5 w-5 text-gray-500" />
                <h5 className="text-xs text-gray-500">{user.location}</h5>
              </div>
            )}
            {/* {uid !== user.id && (
              <button className="mt-2 mb-1 bg-black focus:outline-none text-white px-3 py-2 md:px-4 rounded-md hover:bg-gray-900">
                Contact Me
              </button>
            )} */}
            <h5 className="text-xs text-gray-500">
              Member Since{" "}
              {user.joined &&
                format(new Date(user?.joined?.seconds * 1000), "MMMM yyyy")}
            </h5>
          </div>
          <div className="flex flex-col p-5 w-full border-solid border-gray-300 border-2 mt-5">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-gray-700 mb-3">Description</h1>
              {uid === user.id && (
                <h1
                  className="font-normal text-gray-500 mb-3 cursor-pointer hover:underline"
                  onClick={handleOpen}
                >
                  Edit
                </h1>
              )}
            </div>
            <h5 className="text-sm">{user.description}</h5>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <h1 className="text-gray-700 font-semibold">
                    Edit Description
                  </h1>
                  <form
                    onSubmit={updateDescriptionHandler}
                    className="flex flex-col w-full"
                  >
                    <TextField
                      placeholder="Enter Your Description"
                      variant="outlined"
                      multiline
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      margin="normal"
                      inputProps={{
                        maxLength: 430,
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      margin="normal"
                      className={classes.btn}
                    >
                      Done
                    </Button>
                  </form>
                </div>
              </Fade>
            </Modal>
          </div>
          {/* Social Links */}
          <Socials
            userId={user.id}
            twitter={user.twitterUrl}
            facebook={user.facebookUrl}
            instagram={user.instagramUrl}
          />
        </div>
        <div className="flex-1 md:flex-2 lg:flex-3 min-h-screen w-full p-5 border-solid border-gray-100 border-2">
          <div className="flex flex-col w-full justify-between items-center sm:flex-row">
            <h1 className="text-3xl font-bold text-gray-800 ml-0 mb-5 sm:mb-0 sm:ml-2">
              My Posters
            </h1>
            {uid === user.id && (
              <div className="flex flex-wrap  justify-center sm:justify-end">
                <Link href="/poster/new">
                  <button className="my-2 mx-2 bg-black focus:outline-none text-white px-3 py-2 md:px-4 rounded-md hover:bg-gray-900">
                    Add Poster
                  </button>
                </Link>
                <Link href="/poster/requests/all">
                  <button className="my-2 mx-2 focus:outline-none px-2 py-2 sm:px-4 sm:py-2 md:px-4 border-black border-solid border-2 rounded-md hover:bg-gray-200">
                    My Work
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="my-5 w-full px-2 grid gap-x-2 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {posters.map((poster) => (
              <MyPosterCard
                key={poster.id}
                data={poster}
                editable={uid === user.id}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

// export const getStaticPaths = async () => {
//   const res = await getAllProfileId();
//   const data = JSON.parse(res);

//   const paths = data.map((id) => ({ params: { id } }));

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

// export const getStaticProps = async (context) => {
//   let user = await fetchUser(context.params.id);
//   // let posters = await fetchPostersByUserId(context.params.id);
//   user = JSON.parse(user);
//   // posters = JSON.parse(posters);

//   return {
//     props: {
//       user,
//       // posters,
//     },
//     revalidate: 1,
//   };
// };
