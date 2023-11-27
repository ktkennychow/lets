import { useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import DisplayRecords from '../components/DisplayRecords';
import AddExercise from '../components/AddExercise';
import { useStore } from '../store';
import Modal from '../components/Modal';

export default function ProgressPage() {
  const exercises = useStore((state) => state.exercises);
  const updateExercises = useStore((state) => state.updateExercises);
  const showModal = useStore((state) => state.showModal);
  const updateShowModal = useStore((state) => state.updateShowModal);
  // for new exercise

  const [newExerciseName, setNewExerciseName] = useState<string>('');
  const [note, setNote] = useState<string>('');
  // for error message
  const [errorMessage, setErrorMessage] = useState('');

  // update local storage
  useEffect(() => {
    localStorage.setItem('train-right-data', JSON.stringify(exercises));
  }, [exercises]);

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
    updateExercises([...exercises, newExercise]);
    setNewExerciseName('');
    setNote('');
    updateShowModal(false);
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
    const newExercises = exercises.map((exercise) =>
      exercise.id !== id ? exercise : editedExercise
    );
    updateExercises(newExercises);
  }

  function handleDeleteExercise({ currentTarget }: React.MouseEvent<HTMLButtonElement>) {
    const id = currentTarget.id;
    const targetExercise = exercises.find((exercise) => exercise.id === id);
    const isConfirm = window.confirm(
      `Are you sure you want to delete ${targetExercise?.name} and its records?`
    );
    if (isConfirm) {
      const newExercises = exercises.filter((exercise) => exercise.id !== id);
      updateExercises(newExercises);
    }
  }

  function handleDeleteRecord({ currentTarget }: React.MouseEvent<HTMLButtonElement>) {
    const exerciseId = currentTarget.id;
    const recordDate = currentTarget.value;
    const isConfirm = window.confirm(`Are you sure you want to delete this record?`);
    if (isConfirm) {
      // deepcopying records
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
      updateExercises(newExercises);
    }
  }

  function handleEditRecord({ currentTarget }: React.MouseEvent<HTMLButtonElement>) {
    const exerciseId = currentTarget.id;
    const recordDate = currentTarget.value;

    // deepcopying records
    const exerciseIndex = exercises.findIndex((exercise) => exercise.id === exerciseId);
    const targetExercise = { ...exercises[exerciseIndex] };
    const targetRecord = targetExercise.records.find(
      (record) => record.date === Number(recordDate)
    );
    let editedSets = window.prompt('Edit sets', String(targetRecord!.sets));
    let editedReps = window.prompt('Edit reps', String(targetRecord!.reps));
    let editedWeight = window.prompt('Edit weight', String(targetRecord!.weight));
    if (editedSets === null) {
      editedSets = String(targetRecord!.sets);
    }
    if (editedReps === null) {
      editedReps = String(targetRecord!.reps);
    }
    if (editedWeight === null) {
      editedWeight = String(targetRecord!.weight);
    }
    const editRecord = {
      date: targetRecord!.date,
      sets: Number(editedSets),
      reps: Number(editedReps),
      weight: Number(editedWeight),
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
    updateExercises(newExercises);
  }

  return (
    <div>
      <div className='flex-col'>
        <div className='flex flex-1 items-center justify-between'>
          <h2 className='text-2xl font-bold'>Current Progress</h2>
          <button
            className='flex h-8 w-8 items-center justify-center rounded-full bg-green-600'
            onClick={() => updateShowModal(true)}>
            <div className='text-2xl'>+</div>
          </button>
        </div>
        <div className='flex-col space-y-10 md:flex'>
          <DisplayRecords
            handleEditExercise={handleEditExercise}
            handleDeleteExercise={handleDeleteExercise}
            handleEditRecord={handleEditRecord}
            handleDeleteRecord={handleDeleteRecord}
          />
        </div>
      </div>
      {showModal ? (
        <Modal>
          <AddExercise
            handleAddExercise={handleAddExercise}
            newExerciseName={newExerciseName}
            note={note}
            setNewExerciseName={setNewExerciseName}
            setNote={setNote}
          />
        </Modal>
      ) : null}

      {errorMessage !== '' ? (
        <p className='rounded-md bg-white px-3 py-2 text-red-600'>{errorMessage}</p>
      ) : null}
    </div>
  );
}
