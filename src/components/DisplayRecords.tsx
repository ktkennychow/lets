import { Exercise } from '../types';

type DisplayRecordsProp = {
  exercises: Exercise[];
  handleEditExercise: ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => void;
  handleDeleteExercise: ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => void;
  handleEditRecord: ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => void;
  handleDeleteRecord: ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => void;
  setShowAddExerciseModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DisplayRecords({
  exercises,
  handleEditExercise,
  handleDeleteExercise,
  handleEditRecord,
  handleDeleteRecord,
  setShowAddExerciseModal,
}: DisplayRecordsProp) {
  function timestampToDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toDateString();
  }

  function handleOpenModal() {
    setShowAddExerciseModal(true);
  }

  return (
    <div className='max-w-[640px]'>
      <h2 className='text-2xl font-bold'>Your Exercise Log</h2>
      <div className='flex-col'>
        {exercises.map((exercise) => (
          <div key={exercise.id} className='flex w-full min-h-[80px] group'>
            <div className='flex-col w-32 justify-between flex bg-zinc-800 group-first:rounded-tl-md'>
              <div className='flex-col p-2'>
                <p className='text-md'>{exercise.name}</p>
                <p className='text-xs'>{exercise.note}</p>
              </div>
              <div className='flex justify-self-end gap-[1px]'>
                <button
                  id={exercise.id}
                  onClick={handleEditExercise}
                  className='text-[10px] bg-zinc-700 hover:bg-white text-zinc-100 hover:text-zinc-900 py-2 px-2 w-full'>
                  Edit
                </button>
                <button
                  id={exercise.id}
                  onClick={handleDeleteExercise}
                  className='text-[10px] bg-zinc-700 hover:bg-red-500 text-zinc-100 py-2 px-2  w-full'>
                  Delete
                </button>
              </div>
            </div>
            {/* display last four records only */}
            <div className='flex flex-1 overflow-x-scroll scroll-smooth no-scrollbar overscroll-none'>
              {exercise.records.slice(-6).map((record) => (
                <div
                  key={record.date}
                  className='flex-col bg-zinc-200 last:bg-white text-zinc-500 last:text-zinc-900 last:rounded-r-md text-center min-w-[100px] w-1/4 relative flex justify-between group shadow-zinc-500 shadow-lg'>
                  <div className='flex-col absolute flex top-0 right-0 h-10'>
                    <button
                      id={exercise.id}
                      value={record.date}
                      onClick={handleEditRecord}
                      className='text-xs bg-zinc-300 hover:bg-zinc-800 text-zinc-100 w-5 h-5 group-last:rounded-tr-md'>
                      E
                    </button>
                    <hr />
                    <button
                      id={exercise.id}
                      value={record.date}
                      onClick={handleDeleteRecord}
                      className='text-xs bg-zinc-300 hover:bg-red-500 text-zinc-100 w-5 h-5 rounded-bl-md'>
                      x
                    </button>
                  </div>
                  <div className='flex-col p-2'>
                    <p>{record.reps} rep</p>
                    <p>{record.sets} set</p>
                    <p>{record.addedWeight} kg</p>
                  </div>
                  <p className='text-xs justify-self-end w-full bg-zinc-300 group-last:rounded-br-md group-last:bg-zinc-100'>
                    {timestampToDate(record.date)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className='w-32 bg-zinc-800 h-16 flex justify-center items-center rounded-bl-md'>
        <button
          className='h-8 w-8 rounded-full bg-green-600 items-center flex justify-center'
          onClick={handleOpenModal}>
          <div className='text-2xl'>+</div>
        </button>
      </div>
    </div>
  );
}
