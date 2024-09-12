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
                <h1 className="display-1 text-nowrap">{t("welcome-title")}</h1>
                <h1 className="display-1 text-nowrap">{t("welcome-name")}</h1>
                <h4 className="display-5">{t("welcome-position")}</h4>
                <p>
                  {t("welcome-txt-1")} <span>{t("welcome-txt-2")}</span>,{" "}
                  <span>{t("welcome-txt-3")}</span> {t("welcome-txt-4")}{" "}
                  <span>{t("welcome-txt-5")}</span>
                </p>
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
