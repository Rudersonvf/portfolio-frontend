import ClientHeader from "../../components/ClientHeader";
import styles from "./styles.module.scss";

function Client() {
  return (
    <>
      <ClientHeader />
      <main>
        <div className="container">
          <div>Client</div>
        </div>
      </main>
      <div>Footer</div>
    </>
  );
}

export default Client;
