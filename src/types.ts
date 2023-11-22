type Exercise = {
  id: string;
  name: string;
  note: string;
  records: Record[];
};
type Record = {
  date: number;
  addedWeight: number;
  reps: number;
  sets: number;
};

export type { Exercise, Record };
