import axios from "axios";
import {
  CLOUDINARY_IMAGE_URL,
  CLOUDINARY_VIDEO_URL,
} from "../../configs/cloudinary";

export const uploadVideo = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("resource_type", "video");

    const response = await axios.post(CLOUDINARY_VIDEO_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("resource_type", "image");

    const response = await axios.post(CLOUDINARY_IMAGE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};
