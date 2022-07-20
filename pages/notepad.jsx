import Link from 'next/link';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import FailedDialog from '../components/failed-dialog';
import SucceededDialog from '../components/succeeded-dialog';
import useInterval from '../utils/use-interval';
import csrPage from '../utils/csr-page';


const WritingPage = csrPage(() => {

  const isFast = 'fast' === (localStorage.getItem('plan') || 'fast');
  const initTimeoutTime = (isFast ? 5 : 15) * 1000;
  const initCheckpointTime = (isFast ? 2 : 5) * 60 * 1000;

  const [text, setText] = useState('');

  const [succeeded, setsucceeded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [stopped, setStopped] = useState(true);

  const [timeoutTime, initTimeoutInterval, startTimeoutInterval, stopTimeoutInterval] = useInterval(initTimeoutTime, 100);
  const [checkpointTime, initCheckpointInterval, startCheckpointInterval, stopCheckpointInterval] = useInterval(initCheckpointTime, 1000);

  const textarea = useRef();
  const focus = () => textarea?.current?.focus();
  useEffect(() => { focus(); }, []);

  const stop = () => {
    setFailed(!succeeded);
    setStopped(true);

    stopTimeoutInterval();
    stopCheckpointInterval();

    localStorage.setItem('text', window.btoa(text));
  };

  useEffect(() => { timeoutTime <= 0 && stop(); }, [timeoutTime]);
  useEffect(() => { checkpointTime <= 0 && setsucceeded(true); }, [checkpointTime]);

  const onChange = value => {
    setText(value);

    setStopped(false);

    initTimeoutInterval();
    startTimeoutInterval();
    startCheckpointInterval();
  };

  const restart = clear => {
    if (clear) {
      setText('');
      localStorage.setItem('text', '');
    } else {
      setText(window.atob(localStorage.getItem('text')));
    }

    setStopped(true);
    setsucceeded(false);
    setFailed(false);

    initTimeoutInterval();
    initCheckpointInterval();

    focus();
  };

  return (
    <div className='min-h-screen'>

      <div className='hidden lg:block fixed top-1 left-1 p-3 bg-transparent text-3xl opacity-40'>
        <Link href='/'>
          <div className='cursor-pointer'>🔥</div>
        </Link>
      </div>

      <div
        className={`sticky top-0 h-[0.5vh] transition-all duration-300 ease-out ${succeeded ? 'green-timer' : 'red-timer'}`}
        style={{ width: `${timeoutTime / initTimeoutTime * 100}%` }}
      />
      <main onClick={focus} className='min-w-screen min-h-[98vh] h-full'>
        <div className='flex justify-center min-h-[98vh] h-full w-full' >
          <div className='min-h-full max-w-screen-md w-full m-1 mt-5 bg-white rounded-lg bg-opacity-50'>
            <textarea
              ref={textarea}
              value={text} onChange={e => onChange(e.target.value)} autoFocus={true}
              style={{ filter: `blur(${Math.max(0, ((initTimeoutTime / 2) - timeoutTime) / (initTimeoutTime / 2) * 0.3) }rem)` }}
              placeholder='start writing...'
              className='p-5 min-h-full w-full text-lg font-semibold leading-6 text-gray-900 subpixel-antialiased tracking-wide
                border-none outline-none resize-none bg-transparent shadow-none appearance-none caret-red-600'
            />
          </div>
        </div>
      </main>
      <div className='fixed bottom-2 right-2 text-center w-12 py-1 bg-slate-600 rounded-lg opacity-40 '>
        <div className='text-white font-extralight'>
          {Math.floor(checkpointTime / 60000)}:{Math.round(checkpointTime % 60000 / 1000)
            .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
        </div>
      </div>

      <FailedDialog {...{ failed: stopped && failed, restart }} />
      <SucceededDialog {...{ succeeded: stopped && succeeded, restart }} />
    </div>
  );
});

export default WritingPage;


