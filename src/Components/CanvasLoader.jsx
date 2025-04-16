import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress, errors, loaded } = useProgress();

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
      <div
        className="canvas-loader"
        style={{
          border: "4px solid #fff",
          borderTop: "4px solid transparent",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          animation: "spin 1s linear infinite",
          marginBottom: 20,
        }}
      />
      <p style={{ fontSize: 14, marginTop: 40 }}>
        {progress !== 0
          ? `${progress.toFixed(2)} %`
          : errors.length
          ? "Error loading assets"
          : "Loading..."}
      </p>
    </Html>
  );
};

export default CanvasLoader;
