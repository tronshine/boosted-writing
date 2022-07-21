import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { decode } from 'js-base64';

const SucceededDialog = ({ succeeded, restart }) => {

  const [copied, setCopied] = useState(false);

  const copy = () => {
    const text = decode(localStorage.getItem('text'));
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      console.error(text);
      setCopied(false);
    }
  };

  const continew = () => {
    restart(false);
    setCopied(false);
  };

  const deleteh = () => {
    restart(true);
    setCopied(false);
  };

  return (
    <Transition show={succeeded} as={Fragment}>
      <Dialog className='relative z-10' onClose={() => { }}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-30' />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300 delay-500'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full md:items-center items-end justify-center'>
              <Dialog.Panel className='w-full max-w-md transform m-1 overflow-hidden rounded-2xl bg-gray-100 bg-opacity-75 p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  congrats!  🎉
                </Dialog.Title>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    you are fast.
                    checkpoint reached!
                  </p>
                </div>
                <div className='flex mt-3'>
                  <button
                    className={`mr-4 rounded-md border border-transparent bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300 bg-opacity-75
                      outline-none transition-all ${copied && 'opacity-50'}`}
                    onClick={copy}
                  >
                    {copied ? 'copied 📦' : 'copy 📦'}
                  </button>
                  <button
                    className='mr-4 rounded-md border border-transparent bg-green-200 px-4 py-2 font-medium text-green-700 hover:bg-green-300 outline-none bg-opacity-75 transition-all'
                    onClick={continew}
                  >
                    continue 🏄🏾
                  </button>
                  <button
                    className='rounded-md border border-transparent bg-red-200 px-4 py-2 font-medium text-red-700 hover:bg-orange-200 outline-none bg-opacity-75 transition-all'
                    onClick={deleteh}
                  >
                    delete ⛈
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default SucceededDialog;