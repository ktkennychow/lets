import { useStore } from '../store';

type DisplayRecordsProp = {
  handleEditExercise: ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => void;
  handleDeleteExercise: ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => void;
  handleEditRecord: ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => void;
  handleDeleteRecord: ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function DisplayRecords({
  handleEditExercise,
  handleDeleteExercise,
  handleEditRecord,
  handleDeleteRecord,
}: DisplayRecordsProp) {
  const exercises = useStore((state) => state.exercises);

  function timestampToDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toDateString();
  }

  return (
    <div className='w-full'>
      <div className='flex w-full flex-col'>
        {exercises.map((exercise) => (
          <div key={exercise.id} className='group flex min-h-[80px] w-full flex-1'>
            <div className='flex w-1/2 flex-1 flex-col justify-between bg-zinc-800 group-first:rounded-tl-md'>
              <div className='flex-col p-2'>
                <p className='text-md'>{exercise.name}</p>
                <p className='text-xs'>{exercise.note}</p>
              </div>
              <div className='flex gap-[1px] justify-self-end'>
                <button
                  id={exercise.id}
                  onClick={handleEditExercise}
                  className='w-full bg-zinc-700 px-2 py-2 text-[10px] text-zinc-100 hover:bg-white hover:text-zinc-900'>
                  Edit
                </button>
                <button
                  id={exercise.id}
                  onClick={handleDeleteExercise}
                  className='w-full bg-zinc-700 px-2 py-2 text-[10px] text-zinc-100  hover:bg-red-500'>
                  Delete
                </button>
              </div>
            </div>
            {/* display last four records only */}
            <div className='flex w-1/2 flex-1'>
              {exercise.records.slice(-1).map((record) => (
                <div
                  key={record.date}
                  className='relative flex w-full min-w-[100px] flex-col justify-between bg-zinc-200 text-center text-zinc-500 shadow-lg shadow-zinc-500 last:rounded-r-md last:bg-white last:text-zinc-900'>
                  <div className='flex flex-1 '>
                    <div className='flex flex-1 items-center justify-evenly'>
                      <div className='flex h-12 w-12 flex-col items-center justify-center rounded-full border-4 border-zinc-500 '>
                        <p>{record.reps}</p>
                        <p>rep</p>
                      </div>
                      <div className='flex h-12 w-12 flex-col items-center justify-center rounded-full border-4 border-zinc-500 '>
                        <p>{record.sets}</p>
                        <p>set</p>
                      </div>
                      <div className='flex h-12 w-12 flex-col items-center justify-center rounded-full border-4 border-zinc-500 '>
                        <p>{record.weight}</p>
                        <p>kg</p>
                      </div>
                    </div>
                    <div className='flex h-10 w-5 flex-col'>
                      <button
                        id={exercise.id}
                        value={record.date}
                        onClick={handleEditRecord}
                        className='h-5 w-5 rounded-tr-md bg-zinc-300 text-xs text-zinc-100 hover:bg-zinc-800'>
                        E
                      </button>
                      <hr />
                      <button
                        id={exercise.id}
                        value={record.date}
                        onClick={handleDeleteRecord}
                        className='h-5 w-5 rounded-bl-md bg-zinc-300 text-xs text-zinc-100 hover:bg-red-500'>
                        x
                      </button>
                    </div>
                  </div>
                  <p className='w-full justify-self-end rounded-br-md bg-zinc-100 text-xs'>
                    {timestampToDate(record.date)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
