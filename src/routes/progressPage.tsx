import { useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import DisplayRecords from '../components/DisplayRecords';
import { Exercise } from '../types';
import AddRecord from '../components/AddRecord';
import AddExercise from '../components/AddExercise';
import { Outlet } from 'react-router-dom';

function ProgressPage() {
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
    const isConfirm = window.confirm(
      `Are you sure you want to delete ${targetExercise?.name} and its records?`
    );
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
        const newRecords = targetExercise.records.filter(
          (record) => record.date !== Number(recordDate)
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
  }

  function handleEditRecord({ currentTarget }: React.MouseEvent<HTMLButtonElement>) {
    const exerciseId = currentTarget.id;
    const recordDate = currentTarget.value;

    setExercises((prev) => {
      // deepcopying records
      const exercises = [...prev];
      const exerciseIndex = exercises.findIndex((exercise) => exercise.id === exerciseId);
      const targetExercise = { ...exercises[exerciseIndex] };
      const targetRecord = targetExercise.records.find(
        (record) => record.date === Number(recordDate)
      );
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
    <div className='no-scrollbar relative h-full font-sans text-white'>
      <div className='flex-col p-6 md:p-10'>
        <div className='flex justify-between'>
          <Outlet />
          <h1 className='text-3xl'>LETS</h1>
          {errorMessage !== '' ? (
            <p className='rounded-md bg-white px-3 py-2 text-red-600'>{errorMessage}</p>
          ) : null}
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
          <div className='w-full min-w-[240p] flex-col space-y-10'>
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
        <div className='absolute right-0 top-0 z-10 flex h-full w-full bg-zinc-900/[0.8] text-white'>
          <div className='flex h-[100svh] w-screen items-center justify-center'>
            <div className='flex w-72 flex-col rounded-md bg-zinc-900'>
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

export default ProgressPage;
