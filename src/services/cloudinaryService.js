import { requestCloudinary } from "../lib/axios";
import {
  CLOUDINARY_PRESET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "../config";
import CryptoJS from "crypto-js";

const getSignature = (publicId) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signatureString = `public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;

  return CryptoJS.SHA1(signatureString).toString(CryptoJS.enc.Hex);
};

export function saveImagesToCloudinary(imageFiles) {
  const uploadPromises = imageFiles.map((imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", `${CLOUDINARY_PRESET}`);

    const config = {
      method: "POST",
      url: "/image/upload",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return requestCloudinary(config);
  });

  return Promise.all(uploadPromises);
}

export function deleteImageFromCloudinary(publicId) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = getSignature(publicId);

  const data = new URLSearchParams({
    public_id: publicId,
    api_key: CLOUDINARY_API_KEY,
    signature: signature,
    timestamp: timestamp,
  });

  const config = {
    method: "POST",
    url: "/image/destroy",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  return requestCloudinary(config);
}
