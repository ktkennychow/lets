import { useEffect, useState } from 'react';
import { useStore } from '../store';

export default function StartSession() {
  const exercises = useStore((state) => state.exercises);
  const updateExercises = useStore((state) => state.updateExercises);

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
  }

  return (
    <div className='flex-col'>
      <h2 className='text-2xl font-bold'>Start Session</h2>
      <div className='my-2 flex-col items-center space-y-2'>
        {exercises.map((exercise) => (
          <div key={exercise.id} className='flex flex-1 items-center space-x-2'>
            <input
              type='checkbox'
              value={exercise.name}
              id={exercise.id}
              checked
              className='h-5 w-5 appearance-none rounded-full bg-white'
            />
            <label htmlFor={exercise.id}>{exercise.name}</label>
            {exercise.records.slice(-1)?.map((record) => (
              <div className='flex flex-1 items-center'>
                <p className=''>at {record.sets} sets</p>
                <p className=''>{record.reps}</p>
                <p className=''>with {record.weight} weight</p>
              </div>
            ))}
          </div>
        ))}

        <button
          id={selectedExerciseId}
          onClick={handleAddRecord}
          className='w-full rounded-sm bg-zinc-100 px-2 py-1 text-sm text-zinc-900'>
          START
        </button>
      </div>
    </div>
  );
}
