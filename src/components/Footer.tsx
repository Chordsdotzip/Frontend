import { FaInstagram } from 'react-icons/fa';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { handleClickScroll } from '../helper';

// import Trumpet from '../assets/Pics/trumpet.png';

const Footer: React.FC = () => {
  return (
    <section className="h-[250px] bg-gray-700 flex flex-col justify-center items-center text-white gap-4 relative">
      <div className="flex gap-6">
        <FaInstagram
          className="text-white hover:text-green-400 hover:cursor-pointer"
          size={40}
        />
        <FaFacebookSquare
          className="text-white hover:text-green-400 hover:cursor-pointer"
          size={40}
        />
        <FaXTwitter
          className="text-white hover:text-green-400 hover:cursor-pointer"
          size={40}
        />
      </div>
      <div className="flex gap-2 text-[14px] md:text-[18px] flex-col md:flex-row">
        <Link to="/">
          <p
            className="hover:text-green-400 hover:cursor-pointer"
            onClick={() => handleClickScroll('header')}
          >
            HOME
          </p>
        </Link>
        <p className="hidden md:block">|</p>
        <p className="hover:text-green-400 hover:cursor-pointer">
          <Link to="/result">EXTRACT CHORDS</Link>
        </p>
        <p className="hidden md:block">|</p>
        <Link to="/">
          <p
            className="hover:text-green-400 hover:cursor-pointer"
            onClick={() => handleClickScroll('tutorial')}
          >
            HOW TO USE
          </p>
        </Link>
        <p className="hidden md:block">|</p>

        <Link to="/">
          <p
            className="hover:text-green-400 hover:cursor-pointer"
            onClick={() => handleClickScroll('contact-us')}
          >
            CONTACT US
          </p>
        </Link>
      </div>
      <div className="md:mt-10 text-[12px] md:text-[16px] font-bold">
        <p>ChordsDotZip Official @ 2024</p>
      </div>
      {/* <img src={Trumpet} alt="" className="h-32 absolute right-0 bottom-0" /> */}
    </section>
  );
};

export default Footer;
