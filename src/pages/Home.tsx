import Contact from '../components/Contact';
import Header from '../components/Header';
import Tutorial from '../components/Tutorial';
import { motion, useScroll } from 'framer-motion';
import { AppState } from '../store/store';
import { useSelector } from 'react-redux';
import { LoadingStatus } from '../store/loading';
import Loading from '../components/Loading';
import { useEffect } from 'react';

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { scrollYProgress } = useScroll();
  const loadingStatus: LoadingStatus = useSelector(
    (state: AppState) => state.loading
  );
  return (
    <>
      {loadingStatus.isShow ? <Loading /> : <></>}

      <div className="flex flex-col min-h-screen  text-gray-700 gap-4 md:gap-14 mx-6 md:mx-8 xl:mx-28">
        <Header />
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="progress-bar bg-green-400"
        />
        <Tutorial />
        <Contact />
      </div>
    </>
  );
};

export default Home;
