import { requestBackend } from "../lib/axios";
import {
  CLOUDINARY_NAME,
  CLOUDINARY_PRESET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "../config";

export function saveImagesToCloudinary(imageFiles) {
  console.log("envvars: ", CLOUDINARY_NAME, " / ", CLOUDINARY_PRESET);

  const uploadPromises = imageFiles.map((imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", `${CLOUDINARY_PRESET}`);
    const config = {
      method: "POST",
      url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      //withCredentials: true,
    };

    return requestBackend(config);
  });

  return Promise.all(uploadPromises);
}

export function deleteImageFromCloudinary(publicId) {
  const config = {
    method: "DELETE",
    url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/resources/image/upload/${publicId}`,
    headers: {
      Authorization: `Basic ${btoa(
        CLOUDINARY_API_KEY + ":" + CLOUDINARY_API_SECRET
      )}`,
    },
  };

  return requestBackend(config);
}
