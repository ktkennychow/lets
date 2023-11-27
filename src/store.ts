import { create } from 'zustand';
import { Exercise } from './types';

type State = {
  exercises: Exercise[];
  showModal: boolean;
};

type Action = {
  updateExercises: (exercises: State['exercises']) => void;
  updateShowModal: (showModal: State['showModal']) => void;
};

function handleGetStoredData() {
  const storedData: string | null = localStorage.getItem('train-right-data');
  if (storedData === null) {
    return [];
  } else {
    return JSON.parse(storedData);
  }
}

export const useStore = create<State & Action>()((set) => ({
  exercises: handleGetStoredData(),
  showModal: false,
  updateExercises: (exercises: Exercise[]) => set(() => ({ exercises: exercises })),
  updateShowModal: (showModal: boolean) => set(() => ({ showModal: showModal })),
}));
