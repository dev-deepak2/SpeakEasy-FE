// Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './NavBar.jsx';

export default function Layout() {
  return (
    <div className=" overflow-x-hidden overflow-y-hidden bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <div className="pt-5 px-2"> {/* Add padding if navbar is fixed */}
        <Outlet />
      </div>
    </div>
  );
}
