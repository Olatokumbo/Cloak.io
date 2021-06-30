import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

export const imageResizer = async (photos) => {
  const resizedPhotos = [];
  let files = Array.from(photos)
  if (files.length > 0) {
    await Promise.all(
      files.map(async (photo) => {
        const file = await resizeFile(photo);
        resizedPhotos.push(file);
      })
    );
  }
  return resizedPhotos;
};
