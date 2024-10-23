import { useState } from "react";

import PropTypes from "prop-types";

import * as cloudinaryService from "../services/cloudinaryService";

import Spinner from "./Spinner";
import "../sass/components/image-card.scss";

const ImageCard = ({ imageLink, onImageDelete }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleImageDelete(imageLink) {
    setIsLoading(true);
    const publicId = extractPublicId(imageLink);

    try {
      const response = await cloudinaryService.deleteImageFromCloudinary(
        publicId
      );
      console.log("Imagem excluída com sucesso no Cloudinary:", response);
      onImageDelete(imageLink);
    } catch (error) {
      console.error("Erro ao excluir a imagem no Cloudinary:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function extractPublicId(url) {
    const parts = url.split("/");
    const fileWithExtension = parts[parts.length - 1];
    const publicId = fileWithExtension.split(".")[0];
    return publicId;
  }

  return (
    <div className="component-image-card">
      {isLoading && <Spinner />}
      <img src={imageLink} alt="image" />
      <button
        type="button"
        onClick={() => handleImageDelete(imageLink)}
        className="btn btn-danger delete"
      >
        delete
      </button>
    </div>
  );
};

ImageCard.propTypes = {
  imageLink: PropTypes.string.isRequired,
  onImageDelete: PropTypes.func.isRequired,
};

export default ImageCard;
