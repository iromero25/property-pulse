import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

export default function Spinner() {
  return (
    <ClipLoader
      color="#3b82f6"
      loading={true}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
}
