import { useEffect, useState } from 'react';
import { useStore } from '../store';

export default function AddRecord() {
  const exercises = useStore((state) => state.exercises);
  const updateExercises = useStore((state) => state.updateExercises);
  const updateShowModal = useStore((state) => state.updateShowModal);

  // new record
  const [selectedExerciseId, setSelectedExerciseId] = useState(exercises[0]?.id || '');
  const [weight, setWeight] = useState('0');
  const [reps, setReps] = useState('1');
  const [sets, setSets] = useState('1');

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
      setWeight(String(latestRecord?.weight));
      setReps(String(latestRecord?.reps));
      setSets(String(latestRecord?.sets));
    } else {
      setWeight('0');
      setReps('1');
      setSets('1');
    }
  }, [exercises, selectedExerciseId, setWeight, setReps, setSets]);

  function handleAddRecord({ currentTarget }: React.MouseEvent<HTMLButtonElement>) {
    const newRecord = {
      date: Date.now(),
      weight: Number(weight),
      reps: Number(reps),
      sets: Number(sets),
    };

    // deepcopying records
    const id = currentTarget.id;
    const index = exercises.findIndex((exercise) => exercise.id === id);
    const targetExercise = { ...exercises[index] };
    const targetRecords = [...targetExercise.records];
    targetRecords.push(newRecord);
    const newTargetExercise = {
      ...targetExercise,
      records: targetRecords,
    };

    const newExercises = exercises.map((exercise) =>
      exercise.id === newTargetExercise.id ? newTargetExercise : exercise
    );

    updateExercises(newExercises);
    setWeight('0');
    setReps('1');
    setSets('1');
    updateShowModal(false);
  }

  function handleChange({ currentTarget }: React.ChangeEvent<HTMLSelectElement>) {
    const userInput = currentTarget.value;
    setSelectedExerciseId(userInput);
  }

  return (
    <div className='flex-col'>
      <h2 className='text-2xl font-bold'>Add a record</h2>
      <div className='my-2 flex-col items-center space-y-2'>
        <select
          name='exercise'
          id='exercise'
          className='block w-full rounded-sm bg-zinc-100 p-1.5 text-zinc-900'
          onChange={handleChange}
          value={selectedExerciseId}>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
        <div className='flex items-center justify-between'>
          <p>reps</p>
          <input
            type='number'
            value={reps}
            onChange={(event) => setReps(event.target.value)}
            min='1'
            max='30'
            step='1'
            className='w-16 rounded-sm bg-zinc-100 p-1.5 text-center text-zinc-900'
          />
        </div>
        <div className='flex items-center justify-between'>
          <p>sets</p>
          <input
            type='number'
            value={sets}
            onChange={(event) => setSets(event.target.value)}
            min='1'
            max='10'
            step='1'
            className='w-16 rounded-sm bg-zinc-100 p-1.5 text-center text-zinc-900'
          />
        </div>
        <div className='flex items-center justify-between'>
          <p>weight</p>
          <input
            type='number'
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            min='0'
            max='300'
            step='1'
            className='w-16 rounded-sm bg-zinc-100 p-1.5 text-center text-zinc-900'
          />
        </div>
        <button
          id={selectedExerciseId}
          onClick={handleAddRecord}
          className='w-full rounded-sm bg-zinc-100 px-2 py-1 text-sm text-zinc-900'>
          Confirm
        </button>
      </div>
    </div>
  );
}
