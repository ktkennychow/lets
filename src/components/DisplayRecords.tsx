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
    <div className='max-w-[640px] w-full m-auto'>
      <h2 className='text-2xl font-bold'>Current Progress</h2>
      <div className='flex-col flex w-full'>
        {exercises.map((exercise) => (
          <div key={exercise.id} className='flex w-full flex-1 min-h-[80px] group'>
            <div className='flex-col w-1/2 flex-1 justify-between flex bg-zinc-800 group-first:rounded-tl-md'>
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
            <div className='flex flex-1 w-1/2'>
              {exercise.records.slice(-1).map((record) => (
                <div
                  key={record.date}
                  className='flex-col bg-zinc-200 last:bg-white text-zinc-500 last:text-zinc-900 last:rounded-r-md text-center min-w-[100px] w-full relative flex justify-between shadow-zinc-500 shadow-lg'>
                  <div className='flex flex-1 '>
                    <div className='flex flex-1 justify-evenly items-center'>
                      <div className='border-4 border-zinc-500 rounded-full w-12 h-12 items-center justify-center flex-col flex '>
                        <p>{record.reps}</p>
                        <p>rep</p>
                      </div>
                      <div className='border-4 border-zinc-500 rounded-full w-12 h-12 items-center justify-center flex-col flex '>
                        <p>{record.sets}</p>
                        <p>set</p>
                      </div>
                      <div className='border-4 border-zinc-500 rounded-full w-12 h-12 items-center justify-center flex-col flex '>
                        <p>{record.addedWeight}</p>
                        <p>kg</p>
                      </div>
                    </div>
                    <div className='flex-col flex w-5 h-10'>
                      <button
                        id={exercise.id}
                        value={record.date}
                        onClick={handleEditRecord}
                        className='text-xs bg-zinc-300 hover:bg-zinc-800 text-zinc-100 w-5 h-5 rounded-tr-md'>
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
                  </div>
                  <p className='text-xs justify-self-end w-full rounded-br-md bg-zinc-100'>
                    {timestampToDate(record.date)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className='w-1/2 bg-zinc-800 h-16 flex justify-center items-center rounded-bl-md'>
        <button
          className='h-8 w-8 rounded-full bg-green-600 items-center flex justify-center'
          onClick={handleOpenModal}>
          <div className='text-2xl'>+</div>
        </button>
      </div>
    </div>
  );
}
