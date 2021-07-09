import { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  CircularProgress,
  Chip,
  IconButton,
  makeStyles,
  List,
  ListItem,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchPostersbyId } from "../../../redux/actions/posters";
import { updatePoster } from "../../../redux/actions/posters";
import useLocation from "../../../hooks/useLocation";

import fs from "fs";
import path from "path";
import {
  errorNotification,
  successNotification,
} from "../../../utils/notifications";
import ImageCard from "../../../components/ImageCard";
import usePhoneValidator from "../../../hooks/usePhoneValidator";

const useStyles = makeStyles((theme) => ({
  btn: {
    height: "fit-content",
    width: "auto",
    marginLeft: 3,
    marginRight: 3,
  },
  listItem: {
    width: "fit-content",
  },
}));

const EditPoster = ({ categories, poster }) => {
  const router = useRouter();
  const classes = useStyles();
  const cities = useLocation();
  const userId = useSelector((state) => state.auth.uid);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    "graphics-and-design"
  );
  const [works, setWorks] = useState([]);
  const [buttonState, setButtonState] = useState(false);
  const { isPhoneNumber, message } = usePhoneValidator(phoneNumber);

  useEffect(() => {
    setTitle(poster.title);
    setDescription(poster.description.join(" "));
    setLocation(poster.location);
    setPrice(poster.price);
    setPhoneNumber(poster.phoneNumber);
    setKeywords(poster.keywords);
    setSelectedCategory(poster.category);
    setWorks(poster.works);
  }, []);
  const changeCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const editPosterHandler = async (e) => {
    e.preventDefault();
    setButtonState(true);
    try {
      await updatePoster({
        id: poster.id,
        title,
        description: description.split("\n"),
        price,
        category: selectedCategory,
        keywords,
        location,
        phoneNumber,
      });
      router.replace(`/profile/${userId}`);
    } catch (error) {
      setButtonState(false);
      errorNotification("Error", error.message);
    }
    setButtonState(false);
  };

  const addKeyword = (e) => {
    e.preventDefault();
    setKeywords((prev) => [...prev, keyword]);
    setKeyword("");
  };

  const removeKeywords = (removeWord) => {
    setKeywords(keywords.filter((keyword) => keyword !== removeWord));
  };

  if (userId !== poster.userId) return <Layout>Unauthorized</Layout>;
  return (
    <Layout>
      <div className="w-full min-h-screen p-4">
        <div className="max-w-96 sm:w-96 m-auto">
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
            error={!isPhoneNumber}
            type="text"
            name="phoneNumber"
            size="small"
            label={message}
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
          <form className="flex items-center" onSubmit={addKeyword}>
            <TextField
              type="text"
              name="keyword"
              size="small"
              label="Keyword"
              variant="outlined"
              fullWidth={true}
              margin="normal"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              required
            />
            <IconButton
              type="submit"
              color="primary"
              size="small"
              className={classes.btn}
            >
              <Add />
            </IconButton>
          </form>
          <List className="flex flex-wrap justify-center">
            {keywords.map((data, index) => (
              <ListItem key={index} className={classes.listItem}>
                <Chip
                  label={data}
                  onDelete={() => removeKeywords(data)}
                  color="primary"
                />
              </ListItem>
            ))}
          </List>
          {works &&
            works.map((work, index) => <ImageCard key={index} url={work} />)}
          <Button
            onClick={editPosterHandler}
            variant="contained"
            fullWidth
            size="large"
            color="primary"
            margin="normal"
            disabled={
              !(
                title &&
                description &&
                phoneNumber &&
                location &&
                price > 0 &&
                keywords.length > 0
              ) || buttonState
            }
          >
            Save
          </Button>
          {buttonState && <CircularProgress />}
        </div>
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
