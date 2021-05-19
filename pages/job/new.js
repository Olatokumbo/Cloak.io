import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import PrivateRoute from "../../hoc/PrivateRoute";
import { addJob } from "../../redux/actions/jobs";
const NewJob = () => {
  const userId = useSelector((state) => state.auth.uid);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);

  const addJobHandler = async (e) => {
    e.preventDefault();
    try {
      addJob({ title, description, location, price, userId });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Layout>
      <div className="w-full min-h-screen p-4">
        <form onSubmit={addJobHandler} className="w-full m-auto md:w-96">
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
          >
            Done
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default PrivateRoute(NewJob);
