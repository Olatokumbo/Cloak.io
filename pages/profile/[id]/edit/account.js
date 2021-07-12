import { useState } from "react";
import Layout from "../../../../components/Layout";
import { Button, makeStyles, Avatar, IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import DeleteAccountModal from "../../../../components/DeleteAccountModal";
import { useSelector } from "react-redux";
import PrivateRoute from "../../../../hoc/PrivateRoute";
import { uploadProfilePhoto } from "../../../../redux/actions/profile";
import { imageResizer } from "../../../../utils/imageResizer";

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: 110,
    height: 110,
  },
  avatar_sm: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    // marginTop: theme.spacing(),
    width: 45,
    height: 45,
  },
  btn: {
    width: "fit-content",
    height: "fit-content",
  },
  changeProfileButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
  },
}));

const EditAccount = () => {
  const classes = useStyles();
  const { photoURL, displayName, uid } = useSelector((state) => state.auth);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
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
      <div className="p-5">
        <div className="flex m-4">
          <Avatar src={photoURL} className={classes.avatar_sm} />
          <div>
            <h1 className="text-lg font-medium">{displayName}</h1>
            <h1 className="text-sm font-thin">Your Account Settings</h1>
          </div>
        </div>
        <div className="w-full flex min-h-screen flex-col md:flex-row border-t border-solid border-gray-200">
          <div className="flex-none sm:flex-1">
            <div className="mx-auto p-5 border-b border-solid border-gray-200">
              <h1 className="text-base font-medium mx-auto text-center">Profile Picture</h1>
              <div className="relative">
                <Avatar src={photoURL} className={classes.avatar} />
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
              </div>
            </div>
          </div>
          <div className="flex-2 bg-gray-100 p-10">
            <div className="border-t border-b border-gray-300 py-4">
              <h1 className="text-lg font-semibold text-gray-800">
                Danger Zone
              </h1>
              <div className="flex justify-between flex-wrap border-red-600 border- border-solid p-6 border items-center rounded">
                <div>
                  <h1 className="my-2 font-medium">Account Deactivation</h1>
                  <h5 className="my-1 text-sm w-full sm:w-80">
                    This will permanently delete your Account including all your
                    informations and active posters and jobs
                  </h5>
                </div>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.btn}
                  onClick={() => setDeleteModalOpen(true)}
                >
                  Deactivate Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteAccountModal
        open={deleteModalOpen}
        handleClose={closeDeleteModal}
      />
    </Layout>
  );
};

export default PrivateRoute(EditAccount);
