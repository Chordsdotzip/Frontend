import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import Postman from '../assets/Pics/postman.png';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import loading from '../store/loading';
import { Toast } from '../Toast';

const Contact: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    emailjs.init('lDBYPMjXO12EgpxBX');
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !message) {
      await Toast.fire({
        icon: 'error',
        title: 'Error',
        titleText: 'Please fill the information',
      });
      return;
    }
    dispatch(loading.actions.startLoading());
    const serviceId = 'service_aq9i5vl';
    const templateId = 'template_hkqnk5c';
    try {
      //   setLoading(true);
      await emailjs.send(serviceId, templateId, {
        from_name: name,
        from_email: email,
        message: message,
      });
      await Toast.fire({
        icon: 'success',
        title: 'Success',
      });
    } catch (err) {
      await Toast.fire({
        icon: 'error',
        title: 'Error',
        titleText: 'Error',
      });
    } finally {
      setName(null);
      setEmail(null);
      setMessage(null);
      dispatch(loading.actions.endLoading());
      (document.getElementById('contact-us-form')! as HTMLFormElement).reset();
    }
  };
  return (
    <section id="contact-us" className="w-full">
      <div className="text-white p-4 flex justify-center items-center gap-4 my-32 flex-col-reverse w-full lg:flex-row">
        <img src={Postman} alt="" className="h-[300px] object-scale-down" />
        <div className=" rounded-xl shadow-2xl py-6 md:py-12 px-6 md:px-20">
          <p className="text-[30px] md:text-[48px] font-bold mb-2 text-gray-700">
            CONTACT US
          </p>
          <form
            id="contact-us-form"
            className="flex flex-col gap-4 w-full md:w-[320px]"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-col gap-2">
              <p className="text-[14px] md:text-[20px] font-semibold text-gray-400">
                Name
              </p>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="outline-0 text-gray-700 py-2 px-4 rounded bg-green-100 font-semibold focus:outline-green-300 focus:outline-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[14px] md:text-[20px] font-semibold text-gray-400">
                E-mail
              </p>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="outline-0 text-gray-700 py-2 px-4 rounded bg-green-100 font-semibold focus:outline-green-300 focus:outline-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[14px] md:text-[20px] font-semibold text-gray-400 ">
                Message
              </p>

              <textarea
                name=""
                id=""
                onChange={(e) => setMessage(e.target.value)}
                className="outline-0 text-gray-700 py-2 px-4 rounded h-40 resize-none bg-green-100 font-semibold focus:outline-green-300 focus:outline-2"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-300 px-4 py-2 rounded text-gray-700 text-[14px] md:text-[20px] font-semibold hover:text-white hover:bg-green-400"
            >
              Send it!
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
