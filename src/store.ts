import { create } from 'zustand';
import { Exercise } from './types';

type State = {
  exercises: Exercise[];
};

type Action = {
  setExercises: (exercises: State['exercises']) => void;
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
  setExercises: (exercises: Exercise[]) => set(() => ({ exercises: exercises })),
}));
