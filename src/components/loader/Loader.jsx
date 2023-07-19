import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-opacity-100 bg-primary z-50">
      <div className="text-center">
        <ThreeDots
          height={80}
          width={80}
          radius={9}
          color="#1A73E8"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
