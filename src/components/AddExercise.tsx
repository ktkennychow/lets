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
      listOfExercises.filter((exercise) =>
        exercise.toLowerCase().startsWith(userInput.toLowerCase())
      )
    );

    setNewExerciseName(userInput);
  }

  function handleCloseModal() {
    setShowAddExerciseModal(false);
  }
  return (
    <div className='relative flex-col p-5'>
      <h2 className='text-2xl font-bold'>Add an exercise</h2>
      <div className='my-2 flex-col items-center space-y-2'>
        <div className='relative'>
          <p>Exercise name</p>
          <input
            list='similarExercises'
            type='text'
            value={newExerciseName}
            onChange={handleNewExerciseNameChange}
            required
            className='block w-full rounded-sm bg-zinc-100 p-1.5 text-zinc-900'
          />
          <datalist id='similarExercises' className='absolute left-0 top-0'>
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
            className='block w-full rounded-sm bg-zinc-100 p-1.5 text-zinc-900'
          />
        </div>
        <button
          onClick={handleAddExercise}
          className='w-full rounded-sm bg-zinc-100 px-2 py-1 text-sm text-zinc-900'>
          Confirm
        </button>
      </div>
      <button
        className='absolute right-2 top-2 h-6 w-6 rounded-sm bg-zinc-300 hover:bg-zinc-700'
        onClick={handleCloseModal}>
        x
      </button>
    </div>
  );
}
