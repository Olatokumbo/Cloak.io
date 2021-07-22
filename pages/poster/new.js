import { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
  Chip,
  IconButton,
  makeStyles,
  List,
  ListItem,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { UploadIcon } from "@heroicons/react/solid";
import Layout from "../../components/Layout";
import { uploadPoster } from "../../redux/actions/posters";
import { useSelector } from "react-redux";
import PrivateRoute from "../../hoc/PrivateRoute";
import fs from "fs";
import path from "path";
import useDisplayPhoto from "../../hooks/useDisplayPhoto";
import ImageCard from "../../components/ImageCard";
import { useRouter } from "next/router";
import useLocation from "../../hooks/useLocation";
import { errorNotification } from "../../utils/notifications";
import usePhoneValidator from "../../hooks/usePhoneValidator";

const useStyles = makeStyles((theme) => ({
  btn: {
    height: "fit-content",
    width: "fit-content",
    width: "auto",
    marginLeft: 3,
    marginRight: 3,
  },
  done_btn: {
    maxWidth: "20rem",
    margin: "auto",
    display: "block",
    background: "#00935b",
  },
  listItem: {
    width: "fit-content",
  },
  list: {
    maxWidth: "15rem",
    display: "grid",
  },
  input_sm: {
    maxWidth: "20rem",
    display: "grid",
  },
}));

const NewPoster = ({ categories }) => {
  const router = useRouter();
  const classes = useStyles();
  const userId = useSelector((state) => state.auth.uid);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    "graphics-and-design"
  );
  const [buttonState, setButtonState] = useState(false);
  const cities = useLocation();
  const display = useDisplayPhoto(photos);
  const { isPhoneNumber, message } = usePhoneValidator(phoneNumber);
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setPhotos((prevState) => prevState.concat(files));
  };
  const addPoster = async (e) => {
    e.preventDefault();
    setButtonState(true);
    try {
      await uploadPoster({
        title,
        description: description.split("\n"),
        location,
        phoneNumber,
        price,
        photos,
        userId,
        keywords,
        category: selectedCategory,
      });
      router.replace(`/profile/${userId}`);
    } catch (error) {
      setButtonState(false);
      errorNotification("Error", error.message);
    }
    setButtonState(false);
  };

  const changeCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const deletePhoto = (removedPhoto) => {
    setPhotos((prevState) =>
      prevState.filter((photo) => photo !== removedPhoto)
    );
  };

  const addKeyword = (e) => {
    e.preventDefault();
    setKeywords((prev) => [...prev, keyword]);
    setKeyword("");
  };

  const removeKeywords = (removeWord) => {
    setKeywords(keywords.filter((keyword) => keyword !== removeWord));
  };
  return (
    <Layout>
      <div className="w-full">
        <div className="flex mb-2 px-6 py-2 border-solid border-b border-gray-200">
          <div>
            <h1 className="text-xl text-gray-800 font-semibold">New Poster</h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mb-2 p-2 sm:p-4">
          <div className="flex-1"></div>
          <div className="flex-3 p-2 sm:p-1">
            <div className="w-full overflow-auto">
              <TextField
                name="Title"
                size="small"
                autoComplete="off"
                label="Title"
                variant="outlined"
                fullWidth={true}
                margin="normal"
                onChange={(e) => setTitle(e.target.value)}
                required
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
                rows={15}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
              <FormControl className={classes.list}>
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
                autoComplete="off"
                size="small"
                label={message}
                variant="outlined"
                className={classes.input_sm}
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
                className={classes.input_sm}
                margin="normal"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
              <FormControl className={classes.list}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCategory}
                  onChange={changeCategory}
                  required
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
                  autoComplete="off"
                  size="small"
                  label="Keyword"
                  variant="outlined"
                  className={classes.input_sm}
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
              <List className="flex flex-wrap max-w-32">
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

              <div className="mt-2 mb-5">
                <label htmlFor="photos">
                  <div className="flex">
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
                  required
                />
              </div>
              <div className="flex flex-wrap justify-center">
                {display.map((url, index) => (
                  <ImageCard
                    key={index}
                    url={url}
                    photo={photos[index]}
                    deletePhoto={deletePhoto}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 justify-center items-center p-5">
            <Button
              className={classes.done_btn}
              onClick={addPoster}
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              disabled={
                !(
                  title &&
                  description &&
                  phoneNumber &&
                  location &&
                  price > 0 &&
                  photos.length > 0 &&
                  keywords.length > 0
                ) || buttonState
              }
            >
              Publish
            </Button>
            {buttonState && <CircularProgress />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivateRoute(NewPoster);

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "utils", "category.json");
  let fileData = fs.readFileSync(filePath);
  let categories = JSON.parse(fileData);
  return {
    props: {
      categories,
    },
  };
};
