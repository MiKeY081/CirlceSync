import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../config/firebase";
import { toast } from "react-toastify";

export const handleImageUpload = async (e, setIsLoading, setImages) => {
  setIsLoading(true);
  try {
    toast.success("Uploading...");
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(i);
      const image = e.target.files[i];
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, image);

      // Listen for state changes (including errors)
      uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        console.log("prgress is", progress);

        if (snapshot.error) {
          console.error(snapshot.error.message);
          toast.error("Image upload failed. Try again");
        }
      });

      // Wait for the upload to complete before getting the URL
      await uploadTask;

      // Now it's safe to call getDownloadURL
      const imageUrl = await getDownloadURL(storageRef);

      console.log(imageUrl);
      // Update image list with new URL
      setImages((prev) => [...prev, imageUrl]);
      toast.success("Image uploaded successfully");
    }
  } catch (error) {
    console.error(error.message);
    toast.error("Image upload failed. Try again");
  } finally {
    setIsLoading(false);
  }
};

export const handleSingleImageUpload = async (e, setIsLoading, setImage) => {
  setIsLoading(true);
  try {
    toast.success("Uploading...");
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(i);
      const fbimage = e.target.files[i];
      const storage = getStorage(app);
      const fileName = new Date().getTime() + fbimage.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, fbimage);

      // Listen for state changes (including errors)
      uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        console.log("progress is", progress);

        if (snapshot.error) {
          console.error(snapshot.error.message);
          toast.error("Image upload failed. Try again");
        }
      });

      // Wait for the upload to complete before getting the URL
      await uploadTask;

      // Now it's safe to call getDownloadURL
      const imageUrl = await getDownloadURL(storageRef);

      console.log(imageUrl);
      // Update image list with new URL
      setImage(imageUrl);
      toast.success("Image uploaded successfully");
    }
  } catch (error) {
    console.error(error.message);
    toast.error("Image upload failed. Try again");
  } finally {
    setIsLoading(false);
  }
};
