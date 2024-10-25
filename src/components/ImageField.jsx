import { useCallback } from "react";

import PropTypes from "prop-types";
import { FaImages } from "react-icons/fa6";

import * as cloudinaryService from "../services/cloudinaryService";

import "../sass/components/image-field.scss";

const ImageField = ({ onUploadImage }) => {
  const handleFiles = useCallback(
    async (files) => {
      const uploadPromises = Array.from(files).map(async (image) => {
        try {
          const response = await cloudinaryService.saveImagesToCloudinary([
            image,
          ]);
          onUploadImage(response[0].data.url);
        } catch (error) {
          console.error("Erro ao enviar imagens para o Cloudinary:", error);
        }
      });

      await Promise.all(uploadPromises);
    },
    [onUploadImage]
  );

  const handleImageChange = (event) => {
    handleFiles(event.target.files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="input-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label htmlFor="images-upload" className="upload-label">
        <span className="upload-text">Escolha os arquivos ou arraste aqui</span>
        <FaImages />
        <span className="extensions">.webp* .jpg* .jpeg* .png*</span>
        <input
          type="file"
          name="image"
          id="images-upload"
          accept="image/webp, image/jpg, image/jpeg, image/png"
          multiple
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

ImageField.propTypes = {
  onUploadImage: PropTypes.func.isRequired,
};

export default ImageField;
