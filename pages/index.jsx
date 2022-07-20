import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Switch } from '@headlessui/react';

import _ from '../utils/stripe-promise';

const LandingPage = () => {

  const [plan, setPlan] = useState(false);
  useEffect(() => localStorage.setItem('plan', plan ? 'slow' : 'fast'), [plan]);

  const SLOGANS = [
    'waste money 💸',
    'be lazy 🦥',
    'grow slowly 🍼',
    'waste time ⏳',
    '...  ',
  ].map(str => Array.from(str));

  const [{ sloganIndex, charIndex }, setSloganState] = useState({
    isGrowing: true,
    sloganIndex: random({ min: 0, max: SLOGANS.length - 1 }),
    charIndex: 0,
  });

  const changeSloganState = ({ isGrowing, sloganIndex, charIndex }) => {
    if (!isGrowing && charIndex == 0) { // next slogan
      updateSlogan(1); // next iteration with medium typing speed
      return { isGrowing: true, charIndex: 0, sloganIndex: (sloganIndex + 1) % SLOGANS.length };
    }
    const willGrow = (SLOGANS[sloganIndex].length == charIndex - 1) ? false : isGrowing; // end reached?
    updateSlogan(willGrow === isGrowing ? (isGrowing === false ? 2 : 1) : 0); // back: fast, grow: medium, turn: slow
    return { isGrowing: willGrow, charIndex: charIndex + (isGrowing ? 1 : -1), sloganIndex };
  };

  const updateSlogan = (speed = 0) => {
    setTimeout(
      () => setSloganState(changeSloganState),
      random(({
        0: { min: 750, max: 1500 },
        1: { min: 100, max: 500 },
        2: { min: 50, max: 150 },
      })[speed])
    );
  };
  useEffect(() => { updateSlogan(); }, []);

  return (
    <div className='h-screen bg-transparent flex flex-row justify-center w-full text-gray-800 pb-1'>

      <main className='flex flex-col justify-evenly lowercase subpixel-antialiased tracking-wide h-screen w-10/12 text-center md:text-left'>
        <div>
          <p className='hidden md:block p-1 pb-3 font-bold md:text-6xl text-4xl'>
            BOOSTED-WRITING.COM 🔥
          </p>
          <p className='white-glowing p-1 font-thin md:text-5xl text-4xl'><span className='md:hidden'>🚀</span> Boost your writing productivity</p>
          <p className='white-glowing px-1 font-thin md:text-5xl text-4xl'>with paid time limits</p>
        </div>

        <div className='font-bold md:text-5xl text-4xl h-[16rem] p-1'>
          <div className='py-5'>
            Time is money.
          </div>
          <span className='text-red-600 pr-3 red-glowing'>
            Do not
          </span>
          <span>
            {  SLOGANS[sloganIndex].slice(0, charIndex) }
          </span>
          <span className='caret text-red-600'>
            |
          </span>
        </div>

        <div className='flex justify-center flex-col align-middle md:flex-row md:justify-start'>
          <Link href='/notepad'>
            <div className='cta w-100 md:w-fit bg-red-600 rounded-2xl p-5 text-white font-bold md:text-4xl text-2xl 
              hover:bg-red-500 hover:rounded-3xl cursor-pointer transition-all duration-500'>
                Start writing now!
            </div>
          </Link>

          <div className='self-center m-0 mt-5 md:m-0 md:ml-5'>
            <Switch
              checked={plan}
              onChange={setPlan}
              className={`${plan ? 'bg-gray-700' : 'bg-gray-400'} bg-opacity-40 relative inline-flex h-[38px] w-[96px] shrink-0 
                cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
            >
              <span
                aria-hidden='true'
                className={`${plan ? 'translate-x-12' : 'translate-x-0'} pointer-events-none inline-block h-[34px] w-[45px]
                  transform rounded-full bg-gray-100 shadow-lg ring-0 transition duration-200 ease-in-out z-10`}
              />
              <span className='absolute text-white text-center p-1 pl-2'>slow</span>
              <span className='absolute text-white text-center p-1 pr-3 right-0'>fast</span>
            </Switch>
          </div>
        </div>

        <a 
          className='absolute right-0 bottom-0 p-3 opacity-60 text-md md:text-xl'
          target="_blank" rel="noopener noreferrer"
          href='https://www.linkedin.com/in/gergo-miklos/'
        >
          📬
        </a>
      </main>
    </div>
  );
};

const random = ({ min, max }) => Math.ceil(Math.random() * (max - min) + min);

export default LandingPage;