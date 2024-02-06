import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import loading from '../store/loading';
import { AppState } from '../store/store';
import { useSelector } from 'react-redux';
import { resultInfo } from '../store/result';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { handleClickScroll } from '../helper';
import Trumpet from '../assets/Pics/trumpet.png';
import { Range, getTrackBackground } from 'react-range';

const STEP = 10;
const MIN = 0;
const MAX = 120;

const Result = () => {
  const [bpm, setBpm] = useState([60]);
  const dispatch: AppDispatch = useDispatch();
  const result: resultInfo = useSelector((state: AppState) => state.result);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(result.chords[0].length / 2);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(loading.actions.endLoading());
  }, []);

  return (
    <div className="min-h-screen p-12 w-full">
      <div className="pt-4 flex gap-2 w-full">
        {result.filename !== '' ? (
          <div className="flex flex-col w-full text-wrap gap-4">
            <div className="mt-20 text-2xl truncate font-bold bg-green-300 p-2 rounded w-fit max-w-full">
              {result?.filename}
            </div>
            <div className="md:flex gap-2 items-center">
              <p className="font-semibold">Beat per minute (BPM) :</p>{' '}
              <p className="text-xl">{bpm} BPM</p>
            </div>
            <Range
              values={bpm}
              step={STEP}
              min={MIN}
              max={MAX}
              onChange={(values) => setBpm(values)}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: '36px',
                    display: 'flex',
                    width: '200px',
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: '5px',
                      width: '100%',
                      borderRadius: '4px',
                      background: getTrackBackground({
                        values: bpm,
                        colors: ['#4ADE80', '#ccc'],
                        min: MIN,
                        max: MAX,
                      }),
                      alignSelf: 'center',
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '32px',
                    width: '32px',
                    borderRadius: '4px',
                    backgroundColor: '#FFF',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0px 2px 6px #AAA',
                  }}
                >
                  <div
                    style={{
                      height: '16px',
                      width: '5px',
                      backgroundColor: isDragged ? '#4ADE80' : '#CCC',
                    }}
                  />
                </div>
              )}
            />
            <div className="grid grid-rows-2 w-[250px] sm:w-[280px] gap-y-4">
              <div className="grid grid-cols-3 justify-center items-center">
                <p className="font-semibold">START AT:</p>
                <input
                  type="number"
                  onChange={(e) => setStart(Number(e.target.value))}
                  placeholder={'0'}
                  className="outline-none bg-green-300 p-2 rounded"
                  min={0}
                  max={result.chords[0].length / 2}
                />
                <p className="ml-2">S.</p>
              </div>
              <div className="grid grid-cols-3 justify-center items-center">
                <p className="font-semibold">END AT:</p>
                <input
                  type="number"
                  onChange={(e) => setEnd(Number(e.target.value))}
                  placeholder={String(result.chords[0].length / 2)}
                  className="outline-none bg-green-300 p-2 rounded"
                  min={start}
                  max={String(result.chords[0].length / 2)}
                />
                <p className="ml-2">S.</p>
              </div>
            </div>
            {result?.chords.map((chords) => {
              const perRoom = Math.floor(120 / (bpm[0] / 4));
              let count = 0;
              let newChords = [...chords];
              newChords = newChords.slice(start * 2, end * 2);
              const chordsElement = newChords?.map((chord: string) => {
                const uuid2: string = uuidv4();
                count += 1;
                if (count % perRoom) {
                  return (
                    <div key={uuid2}>
                      <div>{chord}</div>
                    </div>
                  );
                }
                return (
                  <div key={uuid2} className="flex gap-2">
                    <div>{chord}</div>
                    <p>/</p>
                  </div>
                );
              });
              const uuid: string = uuidv4();
              return (
                <div
                  key={uuid}
                  className="flex flex-wrap gap-2 max-w-full border border-solid p-4 rounded shadow-2xl w-fit"
                >
                  <p>/</p>
                  {chordsElement}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full gap-4 pt-24">
            <div className="relative h-28 md:h-40">
              <p className="text-[20px] md:text-[40px] font-semibold">
                NO RESULT TO SHOW!
              </p>
              <Link to="/">
                <button
                  className="bg-green-300 text-gray-700 font-semibold p-4 md:p-6 rounded hover:bg-green-400 hover:text-white text-[14px] md:text-[20px] transition ease-in-out delay-100 absolute bottom-0 right-0"
                  onClick={() => handleClickScroll('header')}
                >
                  LET'S START
                </button>
              </Link>
            </div>
            <img src={Trumpet} alt="" className="h-[400px] object-scale-down" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
