import AddRecord from '../components/AddRecord';
import Modal from '../components/Modal';
import StartSession from '../components/StartSession';
import { useStore } from '../store';

export default function SessionPage() {
  const showModal = useStore((state) => state.showModal);
  const updateShowModal = useStore((state) => state.updateShowModal);

  return (
    <div className='w-full min-w-[240p] flex-col space-y-10'>
      <StartSession />

      {showModal ? (
        <Modal>
          <AddRecord />
        </Modal>
      ) : null}

      <div className='flex h-16 w-full items-center justify-center bg-zinc-800'>
        <button className='flex items-center justify-center' onClick={() => updateShowModal(true)}>
          <div className='text-2xl'>Add Manually</div>
        </button>
      </div>
    </div>
  );
}
