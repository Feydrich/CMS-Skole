import "../../styles/scss/loading.scss";
function Loading() {
  return (
    <div className="loadingOverlay">
      <div className="lds-dual-ring"></div>
    </div>
  );
}

export default Loading;
