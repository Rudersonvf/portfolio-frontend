import PropTypes from "prop-types";
import * as cloudinaryService from "../../services/cloudinaryService";
import styles from "./styles.module.scss";
const ImageCard = ({ imageLink }) => {
  async function handleImageDelete(imageLink) {
    const publicId = extractPublicId(imageLink);

    try {
      const response = await cloudinaryService.deleteImageFromCloudinary(
        publicId
      );
      console.log("Imagem excluída com sucesso no Cloudinary:", response);
    } catch (error) {
      console.error("Erro ao excluir a imagem no Cloudinary:", error);
    }
  }

  function extractPublicId(url) {
    const parts = url.split("/");
    const fileWithExtension = parts[parts.length - 1]; // Pega o último trecho (tox5zogbyc8lnzh3z00q.png)
    const publicId = fileWithExtension.split(".")[0]; // Remove a extensão, ficando só o ID
    return publicId;
  }

  return (
    <div className={styles["component-image-card"]}>
      <img src={imageLink} alt="image" />
      <div
        onClick={() => handleImageDelete(imageLink)}
        className={styles.delete}
      >
        delete
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  imageLink: PropTypes.string.isRequired,
};

export default ImageCard;
