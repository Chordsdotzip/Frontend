import Gear from './Gear';

const Loading: React.FC = () => {
  return (
    <>
      <div className="h-screen w-screen fixed z-50 bg-black opacity-45"></div>
      <div className="h-screen w-screen z-50 fixed">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-2xl bg-[#f5f5f5a3] p-4">
          <div className="spin h-1/3">
            <Gear />
          </div>
          <p className="text-[32px] font-bold text-center">LOADING ...</p>
        </div>
      </div>
    </>
  );
};

export default Loading;
