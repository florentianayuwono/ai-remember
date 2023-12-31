import CircularIndicator from "../components/common/CircularIndicator";


const Loading = () => {
    return (
      <div className="bg-secondary-darkpurple flex justify-center items-center h-screen w-screen">
        <CircularIndicator />
        Loading...
      </div>
    );
  };
  
  export default Loading;