import '../styles/LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingScreen;