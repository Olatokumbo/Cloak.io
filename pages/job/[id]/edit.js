import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  makeStyles,
  CircularProgress,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@material-ui/core";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { updateJob, fetchJobById } from "../../../redux/actions/jobs";
import PrivateRoute from "../../../hoc/PrivateRoute";
import DeleteJobModal from "../../../components/DeleteJobModal";

const useStyles = makeStyles((theme) => ({
  btn: {
    // marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
}));
const EditJob = ({ job }) => {
  const router = useRouter();
  const classes = useStyles();
  const userId = useSelector((state) => state.auth.uid);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [buttonState, setButtonState] = useState(false);

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    setTitle(job.title);
    setDescription(job.description[0]);
    setLocation(job.location);
    setPrice(job.price);
  }, []);

  const editJobHandler = async (e) => {
    e.preventDefault();
    setButtonState(true);
    try {
      await updateJob({
        id: job.id,
        title,
        description,
        price,
        location,
      });
      router.replace("/job/all");
    } catch (error) {
      console.log(error);
    }
  };

  if (userId !== job.userId) return <Layout>Unauthorized</Layout>;
  return (
    <Layout>
      <div className="w-full min-h-screen p-4">
        <form onSubmit={editJobHandler} className="m-auto max-w-96 sm:w-96">
          <h1 className="text-lg font-semibold">Edit Job</h1>
          <TextField
            name="Title"
            size="small"
            label="Title"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextField
            name="description"
            size="small"
            label="Description"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            multiline={true}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <FormControl fullWidth={true}>
            <InputLabel>Location</InputLabel>
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputLabelProps={{ shrink: true }}
            >
              {cities.map((name, i) => (
                <MenuItem key={i} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            type="number"
            name="price"
            size="small"
            label="Price"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            color="primary"
            className={classes.btn}
            disabled={
              !(title && description && location && price > 0) || buttonState
            }
          >
            Done
          </Button>
          <Button
            variant="contained"
            fullWidth
            size="large"
            color="secondary"
            className={classes.btn}
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete Job
          </Button>
          {buttonState && <CircularProgress />}
        </form>
        <DeleteJobModal
          open={deleteModalOpen}
          handleClose={closeDeleteModal}
          id={job.id}
        />
      </div>
    </Layout>
  );
};

export default PrivateRoute(EditJob);

export const getServerSideProps = async ({ params }) => {
  let job;
  try {
    job = await fetchJobById(params.id);
    job = JSON.parse(job);
  } catch (error) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      job,
    },
  };
};
