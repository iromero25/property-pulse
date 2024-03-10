import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

interface LoadingPageProps {
  loading: boolean;
}

export default function LoadingPage({ loading }: LoadingPageProps) {
  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
}
