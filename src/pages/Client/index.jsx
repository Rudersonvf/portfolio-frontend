import { useTranslation } from "react-i18next";
import ClientHeader from "../../components/ClientHeader";
import styles from "./styles.module.scss";
import Button from "../../components/Button";

const Client = () => {
  const { t } = useTranslation();

  return (
    <>
      <ClientHeader />
      <main>
        <section id="#" className={styles["hero-section"]}>
          <div className="container" style={{ border: "1px solid red" }}>
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
                <div className="d-flex gap-1">
                  <Button value={"download cv"} shape={"circle"} />
                </div>
              </div>
              <div className="col">
                <p>esq</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div>Footer</div>
    </>
  );
};

export default Client;
