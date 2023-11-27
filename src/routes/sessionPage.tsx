import { useState } from 'react';
import AddRecord from '../components/AddRecord';
import Modal from '../components/Modal';
import StartSession from '../components/StartSession';

export default function SessionPage() {
  const [showModal, setShowModal] = useState<boolean>(false);

  function handleOpenModal() {
    setShowModal(true);
  }

  return (
    <div className='w-full min-w-[240p] flex-col space-y-10'>
      <StartSession />
      {showModal ? (
        <Modal setShowModal={setShowModal}>
          <AddRecord />
        </Modal>
      ) : null}
      <div className='w-fullitems-center flex h-16 justify-center rounded-bl-md bg-zinc-800'>
        <button className='flex items-center justify-center' onClick={handleOpenModal}>
          <div className='text-2xl'>Add Manually</div>
        </button>
      </div>
    </div>
  );
}
