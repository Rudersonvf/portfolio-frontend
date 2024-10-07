import PropTypes from "prop-types";
import * as cloudinaryService from "../../services/cloudinaryService";
import { FaImages } from "react-icons/fa6";
import styles from "./styles.module.scss";

const ImageField = ({ onUploadImage }) => {
  async function handleImageChange(event) {
    const files = event.target.files;

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
  }

  return (
    <div className={styles["input-container"]}>
      <label htmlFor="images-upload" className={styles["upload-label"]}>
        <span className={styles["upload-text"]}>
          Escolha os arquivos ou arraste aqui
        </span>
        <FaImages />
        <span className={styles.extensions}>.webp* .jpg* .jpeg* .png*</span>
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
