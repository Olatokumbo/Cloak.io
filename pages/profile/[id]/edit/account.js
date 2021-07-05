import { useState } from "react";
import Layout from "../../../../components/Layout";
import { Button, makeStyles } from "@material-ui/core";
import DeleteAccountModal from "../../../../components/DeleteAccountModal";
import PrivateRoute from "../../../../hoc/PrivateRoute";

const useStyles = makeStyles(() => ({
  btn: {
    width: "fit-content",
    height: "fit-content",
  },
}));

const EditAccount = () => {
  const classes = useStyles();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  return (
    <Layout>
      <div className="p-5">
        <h1 className="text-lg font-semibold">Account Settings</h1>
        <div className="w-full flex min-h-screen flex-col md:flex-row">
          <div className="flex-none sm:flex-1"></div>
          <div className="flex-2 bg-gray-100 p-10 rounded-md">
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
