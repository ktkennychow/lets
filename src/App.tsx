import { useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import DisplayRecords from './components/DisplayRecords.jsx';
import { Exercise } from './types.js';
import AddRecord from './components/AddRecord.js';
import AddExercise from './components/AddExercise.js';

function App() {
  const [exercises, setExercises] = useState<Exercise[]>(() => handleGetStoredData());
  // for new exercise
  const [showAddExerciseModal, setShowAddExerciseModal] = useState<boolean>(false);
  const [newExerciseName, setNewExerciseName] = useState<string>('');
  const [note, setNote] = useState<string>('');
  // for new record
  const [addedWeight, setAddedWeight] = useState('0');
  const [reps, setReps] = useState('1');
  const [sets, setSets] = useState('1');
  // for error message
  const [errorMessage, setErrorMessage] = useState('');

  // update local storage
  useEffect(() => {
    localStorage.setItem('train-right-data', JSON.stringify(exercises));
  }, [exercises]);

  function handleGetStoredData() {
    const storedData: string | null = localStorage.getItem('train-right-data');
    if (storedData === null) {
      return [];
    } else {
      return JSON.parse(storedData);
    }
  }

  function handleAddExercise() {
    // validation
    if (newExerciseName === '') {
      setErrorMessage('🚫 Exercise name cannot be empty!');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }
    const newExercise = {
      id: uuid4(),
      name: newExerciseName,
      note: note,
      records: [],
    };
    setExercises((prev) => [...prev, newExercise]);
    setNewExerciseName('');
    setNote('');
    setShowAddExerciseModal(false);
  }

  function handleEditExercise({ currentTarget }: React.MouseEvent<HTMLButtonElement>) {
    const id = currentTarget.id;
    const targetExercise = exercises.find((exercise) => exercise.id === id);
    let editedName = window.prompt('Edit name', targetExercise!.name);
    let editedNote = window.prompt('Edit note', targetExercise!.note);
    if (editedName === null) {
      editedName = targetExercise!.name;
    }
    if (editedNote === null) {
      editedNote = targetExercise!.note;
    }
    const editedExercise = {
      id: targetExercise!.id,
      name: editedName,
      note: editedNote,
      records: targetExercise!.records,
    };
    setExercises((prev) => {
      const newExercises = prev.map((exercise) => (exercise.id !== id ? exercise : editedExercise));
      return newExercises;
    });
  }

  function handleDeleteExercise({ currentTarget }: React.MouseEvent<HTMLButtonElement>) {
    const id = currentTarget.id;
    const targetExercise = exercises.find((exercise) => exercise.id === id);
    const isConfirm = window.confirm(`Are you sure you want to delete ${targetExercise?.name} and its records?`);
    if (isConfirm) {
      setExercises((prev) => {
        const newExercises = prev.filter((exercise) => exercise.id !== id);
        return newExercises;
      });
    }
  }

  function handleAddRecord({ currentTarget }: React.MouseEvent<HTMLButtonElement>) {
    const newRecord = {
      date: Date.now(),
      addedWeight: Number(addedWeight),
      reps: Number(reps),
      sets: Number(sets),
    };

    setExercises((prev) => {
      // deepcopying records
      const id = currentTarget.id;
      const exercises = [...prev];
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

      return newExercises;
    });
    setAddedWeight('0');
    setReps('1');
    setSets('1');
  }

  function handleDeleteRecord({ currentTarget }: React.MouseEvent<HTMLButtonElement>) {
    const exerciseId = currentTarget.id;
    const recordDate = currentTarget.value;
    const isConfirm = window.confirm(`Are you sure you want to delete this record?`);
    if (isConfirm) {
      setExercises((prev) => {
        // deepcopying records
        const exercises = [...prev];
        const exerciseIndex = exercises.findIndex((exercise) => exercise.id === exerciseId);
        const targetExercise = { ...exercises[exerciseIndex] };
        const newRecords = targetExercise.records.filter((record) => record.date !== Number(recordDate));
        const newTargetExercise = {
          ...targetExercise,
          records: newRecords,
        };

        const newExercises = exercises.map((exercise) =>
          exercise.id === newTargetExercise.id ? newTargetExercise : exercise
        );

        return newExercises;
      });
    }
  }

  function handleEditRecord({ currentTarget }: React.MouseEvent<HTMLButtonElement>) {
    const exerciseId = currentTarget.id;
    const recordDate = currentTarget.value;

    setExercises((prev) => {
      // deepcopying records
      const exercises = [...prev];
      const exerciseIndex = exercises.findIndex((exercise) => exercise.id === exerciseId);
      const targetExercise = { ...exercises[exerciseIndex] };
      const targetRecord = targetExercise.records.find((record) => record.date === Number(recordDate));
      let editedSets = window.prompt('Edit sets', String(targetRecord!.sets));
      let editedReps = window.prompt('Edit reps', String(targetRecord!.reps));
      let editedWeight = window.prompt('Edit weight', String(targetRecord!.addedWeight));
      if (editedSets === null) {
        editedSets = String(targetRecord!.sets);
      }
      if (editedReps === null) {
        editedReps = String(targetRecord!.reps);
      }
      if (editedWeight === null) {
        editedWeight = String(targetRecord!.addedWeight);
      }
      const editRecord = {
        date: targetRecord!.date,
        sets: Number(editedSets),
        reps: Number(editedReps),
        addedWeight: Number(editedWeight),
      };
      const newRecords = targetExercise.records.map((record) =>
        record.date !== Number(recordDate) ? record : editRecord
      );
      const newTargetExercise = {
        ...targetExercise,
        records: newRecords,
      };

      const newExercises = exercises.map((exercise) =>
        exercise.id === newTargetExercise.id ? newTargetExercise : exercise
      );

      return newExercises;
    });
  }

  return (
    <div className='text-white h-full font-sans relative no-scrollbar'>
      <div className='flex-col p-6 md:p-10'>
        <div className='flex justify-between'>
          <h1 className='text-3xl'>Train Right</h1>
          {errorMessage !== '' ? <p className='text-red-600 py-2 px-3 bg-white rounded-md'>{errorMessage}</p> : null}
        </div>
        <hr className='my-5' />
        <div className='flex-col space-y-10 md:flex'>
          <DisplayRecords
            exercises={exercises}
            handleEditExercise={handleEditExercise}
            handleDeleteExercise={handleDeleteExercise}
            handleEditRecord={handleEditRecord}
            handleDeleteRecord={handleDeleteRecord}
            setShowAddExerciseModal={setShowAddExerciseModal}
          />
          <div className='flex-col space-y-10 w-full min-w-[240p]'>
            <AddRecord
              exercises={exercises}
              addedWeight={addedWeight}
              reps={reps}
              sets={sets}
              setAddedWeight={setAddedWeight}
              setReps={setReps}
              setSets={setSets}
              handleAddRecord={handleAddRecord}
            />
          </div>
        </div>
      </div>
      {showAddExerciseModal ? (
        <div className='absolute text-white top-0 right-0 z-10 h-full w-full bg-zinc-900/[0.8] flex'>
          <div className='flex h-[100svh] w-screen justify-center items-center'>
            <div className='w-72 bg-zinc-900 rounded-md flex-col flex'>
              <AddExercise
                newExerciseName={newExerciseName}
                note={note}
                setNewExerciseName={setNewExerciseName}
                setNote={setNote}
                handleAddExercise={handleAddExercise}
                setShowAddExerciseModal={setShowAddExerciseModal}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
