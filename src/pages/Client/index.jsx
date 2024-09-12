import ClientHeader from "../../components/ClientHeader";
import styles from "./styles.module.scss";

const Client = () => {
  return (
    <>
      <ClientHeader />
      <main>
        <section id="#">
          <div className="container">
            <div className={`${styles["hero-container"]} row`}>
              <div className="col">dir</div>
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
