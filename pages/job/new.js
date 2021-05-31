import { useState } from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import PrivateRoute from "../../hoc/PrivateRoute";
import { useRouter } from "next/router";
import { addJob } from "../../redux/actions/jobs";
const NewJob = () => {
  const router = useRouter();
  const userId = useSelector((state) => state.auth.uid);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [buttonState, setButtonState] = useState(false);

  const addJobHandler = async (e) => {
    e.preventDefault();
    setButtonState(true);
    try {
      await addJob({ title, description, location, price, userId });
      router.replace("/job/all");
    } catch (error) {
      console.log("ERROR");
      alert(error.message);
      setButtonState(false)
    }
  };
  return (
    <Layout>
      <div className="w-full min-h-screen p-4">
        <form onSubmit={addJobHandler} className="m-auto max-w-96 sm:w-96">
          <h1 className="text-lg font-semibold">New Job</h1>
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
          <TextField
            name="location"
            size="small"
            label="Location"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
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
            disabled={
              !(title && description && location && price > 0) || buttonState
            }
          >
            Done
          </Button>
          {buttonState && <CircularProgress />}
        </form>
      </div>
    </Layout>
  );
};

export default NewJob;
