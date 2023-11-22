import { useState } from 'react';
import { listOfExercises } from '../assets/exercise';

type AddExerciseProps = {
  newExerciseName: string;
  note: string;
  setNewExerciseName: (value: string) => void;
  setNote: (value: string) => void;
  handleAddExercise: () => void;
  setShowAddExerciseModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AddExercise({
  newExerciseName,
  note,
  setNewExerciseName,
  setNote,
  handleAddExercise,
  setShowAddExerciseModal,
}: AddExerciseProps) {
  const [listOfSimilarExercises, setListOfSimilarExercises] = useState<string[]>([]);

  function handleNewExerciseNameChange({ currentTarget }: React.ChangeEvent<HTMLInputElement>) {
    const userInput = currentTarget.value;
    setListOfSimilarExercises(
      listOfExercises.filter((exercise) => exercise.toLowerCase().startsWith(userInput.toLowerCase()))
    );

    setNewExerciseName(userInput);
  }

  function handleCloseModal() {
    setShowAddExerciseModal(false);
  }
  return (
    <div className='flex-col relative p-5'>
      <h2 className='text-2xl font-bold'>Add an exercise</h2>
      <div className='flex-col space-y-2 my-2 items-center'>
        <div className='relative'>
          <p>Exercise name</p>
          <input
            list='similarExercises'
            type='text'
            value={newExerciseName}
            onChange={handleNewExerciseNameChange}
            required
            className='bg-zinc-100 text-zinc-900 rounded-sm p-1.5 block w-full'
          />
          <datalist id='similarExercises' className='absolute top-0 left-0'>
            {listOfSimilarExercises.map((similarExercise) => (
              <option key={similarExercise} value={similarExercise}></option>
            ))}
          </datalist>
        </div>
        <div>
          <p>Note</p>
          <textarea
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
            }}
            className='bg-zinc-100 text-zinc-900 rounded-sm p-1.5 block w-full'
          />
        </div>
        <button onClick={handleAddExercise} className='text-sm bg-zinc-100 text-zinc-900 py-1 px-2 rounded-sm w-full'>
          Confirm
        </button>
      </div>
      <button
        className='absolute top-2 right-2 w-6 h-6 bg-zinc-300 hover:bg-zinc-700 rounded-sm'
        onClick={handleCloseModal}>
        x
      </button>
    </div>
  );
}
