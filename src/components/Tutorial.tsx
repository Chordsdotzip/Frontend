import UploadFile from '../assets/Pics/upload.png';
import Hosting from '../assets/Pics/hosting.png';
import Sheet from '../assets/Pics/sheet.png';
import BassGuitar from '../assets/Pics/bassguitar.png';

const Tutorial: React.FC = () => {
  return (
    <section id="tutorial" data-cy='tutorial'>
      <header className="text-[28px] md:text-[48px] font-bold mt-32">
        GET STARTED
      </header>
      <div className="flex justify-center items-center">
        <div className="grid grid-rows-4 w-full md:w-2/3 xl:gap-16 md:gap-8">
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-2 md:gap-8 md:h-60">
            <div className="flex justify-center items-center h-full">
              <img
                src={UploadFile}
                alt=""
                className="h-full object-scale-down"
              />
            </div>
            <div className="flex justify-center items-center text-[16px] md:text-[24px] font-semibold">
              1. Upload a song file by choose a song file on your computer or
              drop it in the file upload area.
            </div>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-8 md:h-60">
            <div className="flex justify-center items-center text-[16px] md:text-[24px] font-semibold">
              2. Waiting for server to processing your song file.
            </div>
            <div className="flex justify-center items-center h-full">
              <img src={Hosting} alt="" className="h-full object-scale-down" />
            </div>
          </div>
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-2 md:gap-8  md:h-60">
            <div className="flex justify-center items-center h-full">
              <img src={Sheet} alt="" className="h-full object-scale-down" />
            </div>
            <div className="flex justify-center items-center text-[16px] md:text-[24px] font-semibold">
              3. Get chords from your song file that show on your screen.
            </div>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-8  h-60 md:h-60">
            <div className="flex md:justify-center items-center text-[16px] md:text-[24px] font-semibold">
              4. Enjoy it !
            </div>
            <div className="flex justify-center items-center md:h-full">
              <img
                src={BassGuitar}
                alt=""
                className="h-full md:h-[256px] object-scale-down"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tutorial;
