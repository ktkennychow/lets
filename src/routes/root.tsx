import { Link, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div className='no-scrollbar relative h-full flex-col p-6 font-sans  text-white md:p-10'>
      <div className='flex h-12 flex-1 items-center justify-between'>
        <h1 className='text-5xl font-extrabold italic'>LETS</h1>
        <nav>
          <ul className='flex flex-1 items-center space-x-5'>
            <li>
              <Link to={'progress'}>Lastest Progress</Link>
            </li>
            <li>
              <Link to={'session'}>Today's Session</Link>
            </li>
            <li>
              <Link to={'history'}>History</Link>
            </li>
          </ul>
        </nav>
      </div>
      <hr className='my-5' />
      <Outlet />
    </div>
  );
}
