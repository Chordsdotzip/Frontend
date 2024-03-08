import { useRef } from 'react';
import Guitar from '../assets/Pics/guitar.png';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import loading from '../store/loading';
import { useNavigate } from 'react-router-dom';
import { FileRejection, useDropzone } from 'react-dropzone';
import AddFile from '../assets/Pics/addfile.png';
import result from '../store/result';
import { Toast } from '../Toast';
import { api } from '../axiosInstance';
import { service } from '../services/services';

interface response {
  data: {
    status_code: string;
    detail: { chords: string[][]; url: string };
  };
}

const Header: React.FC = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    maxFiles: 1,
    maxSize: 20000000,
    accept: {
      'audio/*': ['.wav', '.mp3', '.mp4'],
    },
    onDropRejected,
  });

  async function onDropRejected(err: Array<FileRejection>) {
    await Toast.fire({
      icon: 'error',
      title: 'Error',
      titleText: err[0].errors[0].message,
    });
  }
  async function onDropAccepted(acceptedFiles: File[]) {
    if (acceptedFiles) {
      dispatch(loading.actions.startLoading());
      try {
        const data = new FormData();
        data.append('file', acceptedFiles[0]);
        const url = await service.upload(data);
        data.append('url', url);
        const res: response = await api.post('/files', data);
        dispatch(
          result.actions.saveResult({
            filename: acceptedFiles[0].name,
            chords: res.data.detail.chords,
            url: url,
          })
        );
        navigate('/result');
      } catch (err: any) {
        await Toast.fire({
          icon: 'error',
          title: 'Error',
          titleText: err.response.data.detail,
        });
        dispatch(loading.actions.endLoading());
      }
    }
  }

  return (
    <section id="header" data-cy="header">
      <div className="flex justify-between items-center mt-32 flex-col gap-14 xl:flex-row">
        <div className="w-full md:w-2/3 xl:w-1/2 flex justify-center items-center flex-col">
          <img src={Guitar} className="h-96 object-scale-down" />
          <div className="flex flex-col gap-2 text-gray-700">
            <p className="font-bold text-[64px] md:text-[80px] text-wrap leading-[56px] md:leading-[72px]">
              Extract Chords From Song
            </p>
            <div className="text-sm md:text-xl font-semibold flex gap-2 items-center">
              100% Automatically and{' '}
              <p className="bg-green-300 p-2 rounded">free</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/5 xl:w-1/2 flex justify-center items-center flex-col">
          <div
            className="h-72 w-full md:w-2/3 rounded-xl shadow-2xl bg-white items-center relative"
            {...getRootProps()}
          >
            <input
              data-cy="input-file"
              type="file"
              id="file"
              ref={inputFile}
              accept="audio/*"
              // onChange={(e) => handleFileChange(e)}
              {...getInputProps()}
            ></input>

            {isDragActive ? (
              <div className="h-full w-full flex justify-center items-center">
                <img
                  src={AddFile}
                  alt=""
                  className="h-[128px] object-scale-down"
                />
              </div>
            ) : (
              <button
                className="bg-green-300 text-gray-700 font-semibold p-4 rounded hover:bg-green-400 hover:text-white absolute inset-x-10 md:inset-x-20 inset-y-28 text-md md:text-[20px] transition ease-in-out delay-100"
                // onClick={onButtonClick}
              >
                Upload File
              </button>
            )}
            <div className="absolute bottom-4 font-semibold w-full text-center">
              or drop a file here.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
