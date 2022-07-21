import { Fragment } from 'react';
import CheckoutForm from './checkout-form';
import { Dialog, Transition } from '@headlessui/react';

const FailedDialog = ({ failed, restart }) => {
  return (
    <Transition show={failed} as={Fragment}>
      <Dialog className='relative z-20' onClose={() => {/* */}}>
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
              <Dialog.Panel className='w-full max-w-md m-1 transform overflow-hidden rounded-2xl bg-gray-100 bg-opacity-75 p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  time is over ⌛️
                </Dialog.Title>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    you are slow.
                    pay to continue!
                  </p>
                </div>

                <CheckoutForm onSubmit={restart} />

              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default FailedDialog;