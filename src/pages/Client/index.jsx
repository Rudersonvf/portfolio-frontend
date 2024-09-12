import { useTranslation } from "react-i18next";
import ClientHeader from "../../components/ClientHeader";
import styles from "./styles.module.scss";

const Client = () => {
  const { t } = useTranslation();

  return (
    <>
      <ClientHeader />
      <main>
        <section id="#" className={styles["hero-section"]}>
          <div className="container">
            <div className="row">
              <div className="col">
                <h1>{t("welcome-title")}</h1>
              </div>
              <div className="col">esq</div>
            </div>
          </div>
        </section>
      </main>
      <div>Footer</div>
    </>
  );
};

export default Client;
