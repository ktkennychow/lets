import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className='relative mx-auto flex h-full min-h-[90svh] max-w-[640px] flex-1 flex-col p-6 font-sans text-white md:p-10'>
      <div className='flex max-h-12 flex-1 items-center justify-between'>
        <h1 className='text-3xl font-extrabold italic tracking-[-0.1em] md:text-6xl'>LETS</h1>
        <nav>
          <ul className='flex flex-1 items-center space-x-5'>
            <li>
              <Link to={'/progress'}>Progress</Link>
            </li>
            <li>
              <Link to={'session'}>Session</Link>
            </li>
            <li>
              <Link to={'history'}>History</Link>
            </li>
            <li>
              <Link to={'setting'}>Setting</Link>
            </li>
          </ul>
        </nav>
      </div>
      <hr className='my-5' />
      <Outlet />
    </div>
  );
}
