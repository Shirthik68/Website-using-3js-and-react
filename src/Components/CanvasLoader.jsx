import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html
      center
      as="div"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#F1F1F1", // Text color fix
        fontWeight: 800,
      }}
    >
      <span className="canvas-loader" />
      <p style={{ fontSize: 14, marginTop: 40 }}>
        {progress !== 0 ? `${progress.toFixed(2)} %` : "Loading..."}
      </p>
    </Html>
  );
};

export default CanvasLoader;
