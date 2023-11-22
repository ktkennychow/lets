import { useEffect, useState } from 'react';
import { Exercise } from '../types';

type AddRecordProps = {
  exercises: Exercise[];
  addedWeight: string;
  reps: string;
  sets: string;
  setAddedWeight: (value: string) => void;
  setReps: (value: string) => void;
  setSets: (value: string) => void;
  handleAddRecord: ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function AddRecord({
  exercises,
  addedWeight,
  reps,
  sets,
  setAddedWeight,
  setReps,
  setSets,
  handleAddRecord,
}: AddRecordProps) {
  const [selectedExerciseId, setSelectedExerciseId] = useState(exercises[0]?.id || '');

  function handleChange({ currentTarget }: React.ChangeEvent<HTMLSelectElement>) {
    const userInput = currentTarget.value;
    setSelectedExerciseId(userInput);
  }

  useEffect(() => {
    if (exercises.length === 1) {
      setSelectedExerciseId(exercises[0].id);
    }
  }, [exercises]);

  useEffect(() => {
    const selectedExercise = exercises.find((exercise) => exercise.id === selectedExerciseId);
    const latestRecord = selectedExercise?.records.slice(-1)[0];
    // When an exercise is selected, the set up from latest record is entered
    if (latestRecord) {
      setAddedWeight(String(latestRecord?.addedWeight));
      setReps(String(latestRecord?.reps));
      setSets(String(latestRecord?.sets));
    } else {
      setAddedWeight('0');
      setReps('1');
      setSets('1');
    }
  }, [exercises, selectedExerciseId, setAddedWeight, setReps, setSets]);

  return (
    <div className='flex-col'>
      <h2 className='text-2xl font-bold'>Add a record</h2>
      <div className='flex-col space-y-2 my-2 items-center'>
        <select
          name='exercise'
          id='exercise'
          className='bg-zinc-100 text-zinc-900 rounded-sm p-1.5 block w-full'
          onChange={handleChange}
          value={selectedExerciseId}>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
        <div className='flex justify-between items-center'>
          <p>reps</p>
          <input
            type='number'
            value={reps}
            onChange={(event) => setReps(event.target.value)}
            min='1'
            max='30'
            step='1'
            className='bg-zinc-100 text-zinc-900 rounded-sm p-1.5 w-16 text-center'
          />
        </div>
        <div className='flex justify-between items-center'>
          <p>sets</p>
          <input
            type='number'
            value={sets}
            onChange={(event) => setSets(event.target.value)}
            min='1'
            max='10'
            step='1'
            className='bg-zinc-100 text-zinc-900 rounded-sm p-1.5 w-16 text-center'
          />
        </div>
        <div className='flex justify-between items-center'>
          <p>weight</p>
          <input
            type='number'
            value={addedWeight}
            onChange={(event) => setAddedWeight(event.target.value)}
            min='0'
            max='300'
            step='1'
            className='bg-zinc-100 text-zinc-900 rounded-sm p-1.5 w-16 text-center'
          />
        </div>
        <button
          id={selectedExerciseId}
          onClick={handleAddRecord}
          className='text-sm bg-zinc-100 text-zinc-900 py-1 px-2 rounded-sm w-full'>
          Confirm
        </button>
      </div>
    </div>
  );
}
