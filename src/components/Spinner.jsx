import "../sass/components/spinner.scss";

const Spinner = () => {
  return (
    <div className="position">
      <div className="spinner-border m-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
