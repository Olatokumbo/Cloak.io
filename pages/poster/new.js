import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { UploadIcon } from "@heroicons/react/solid";
import Layout from "../../components/Layout";
const NewPoster = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [photos, setPhotos] = useState([]);
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setPhotos(files);
  };
  return (
    <Layout>
      <div className="w-full min-h-screen p-4">
        <form className="w-96 m-auto">
          <h1 className="text-lg font-semibold">New Poster</h1>
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
          {/* <TextField
            type="file"
            name="Photos"
            size="small"
            label="Photos"
            variant="outlined"
            fullWidth={true}
            margin="normal"
          /> */}
          <div className="my-5">
            <label htmlFor="photos">
              <div className="flex justify-center">
                <UploadIcon className="h-7 w-7 text-gray-500" />
                <h1 className="font-bold text-gray-700">Upload Photos</h1>
              </div>
            </label>
            <input
              type="file"
              id="photos"
              multiple
              hidden
              accept=".jpeg, .jpg, .png"
              onChange={handleUpload}
            />
          </div>
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

export default NewPoster;
