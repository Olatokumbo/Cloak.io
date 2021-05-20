import { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { fetchPostersbyId } from "../../../redux/actions/posters";
import { updatePoster } from "../../../redux/actions/posters";

import fs from "fs";
import path from "path";
const EditPoster = ({ categories, poster }) => {
  const userId = useSelector((state) => state.auth.uid);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(
    "graphics-and-design"
  );

  useEffect(() => {
    setTitle(poster.title);
    setDescription(poster.description[0]);
    setLocation(poster.location);
    setPrice(poster.price);
    setPhoneNumber(poster.phoneNumber)
    setSelectedCategory(poster.category);
  }, []);
  const changeCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const editPosterHandler = async (e) => {
    e.preventDefault();
    try {
      updatePoster({
        id: poster.id,
        title,
        description,
        price,
        category: selectedCategory,
        location,
        phoneNumber
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (userId !== poster.userId) return <Layout>Unauthorized</Layout>;
  return (
    <Layout>
      <div className="w-full min-h-screen p-4">
        <form onSubmit={editPosterHandler} className="max-w-96 sm:w-96 m-auto">
          <h1 className="text-lg font-semibold">Edit Poster</h1>
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
            type="text"
            name="phoneNumber"
            size="small"
            label="Phone Number"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            required
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
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory}
              onChange={changeCategory}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            color="primary"
            margin="normal"
          >
            Save
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default EditPoster;

export const getServerSideProps = async ({ params }) => {
  let poster;
  try {
    poster = await fetchPostersbyId(params.id);
    poster = JSON.parse(poster);
  } catch (error) {
    return {
      notFound: true,
      //   redirect: {
      //     destination: `/profile/${userId}`,
      //   },
    };
  }
  const filePath = path.join(process.cwd(), "utils", "category.json");
  let fileData = fs.readFileSync(filePath);
  let categories = JSON.parse(fileData);
  return {
    props: {
      categories,
      poster,
    },
  };
};
