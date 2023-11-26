import { Link, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={'progress'}>progress</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
