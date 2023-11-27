import { ReactNode } from 'react';
import { useStore } from '../store';

type ModalProps = {
  children: ReactNode;
};

export default function Modal({ children }: ModalProps) {
  const updateShowModal = useStore((state) => state.updateShowModal);

  return (
    <div className='absolute right-0 top-0 z-10 flex h-full w-full bg-zinc-900/[0.9] text-white'>
      <div className='flex w-screen items-center justify-center'>
        <div className='relative flex w-72 flex-col rounded-md bg-zinc-900 p-10'>
          <button
            className='absolute right-2 top-2 h-6 w-6 rounded-sm bg-zinc-300 hover:bg-zinc-700'
            onClick={() => updateShowModal(false)}>
            x
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
