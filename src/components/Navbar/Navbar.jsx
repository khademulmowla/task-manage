import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaList, FaPlus, FaUser, FaSignOutAlt, } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import { MdAddTask } from 'react-icons/md';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logOut();
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className='navbar bg-gray-400 text-white shadow-sm container px-4 mx-auto'>
            {/* Left side - Mobile Dropdown */}
            <div className="flex-1 lg:hidden flex items-center">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-gray-400 rounded-box z-[1] mt-3 p-2 shadow">
                        <li>
                            <Link to='/'><FaHome className="inline mr-2" />Home</Link>
                        </li>
                        {/* Conditionally render "All Task" and "Add Task" for logged-in users */}
                        {user && (
                            <>
                                <li>
                                    <Link to='/add-task'><FaPlus className="inline mr-2" />Add Task</Link>
                                </li>
                                <li>
                                    <Link to='/all-task'><FaList className="inline mr-2" />All Task</Link>
                                </li>
                                <li>
                                    <Link to='/my-task'><MdAddTask className="inline" />My Task</Link>
                                </li>

                            </>
                        )}
                        {!user && (
                            <li>
                                <Link to='/login'><FaUser className="inline mr-2" />Login</Link>
                            </li>
                        )}
                        {user && (
                            <>
                                <li>
                                    <button
                                        onClick={handleLogOut}
                                        className="text-white">
                                        <FaSignOutAlt className="inline mr-2" />Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {/* Right side - Logo for Mobile */}
            <div className='lg:flex-1 lg:pl-2 flex justify-end lg:justify-start'>
                <Link to='/' className='flex gap-2 items-center'>
                    <h1>TASK</h1>
                    <span className='font-bold'>Management</span>
                </Link>
            </div>

            {/* Right side - Navigation and User Dropdown for Desktop */}
            <div className='flex-none pr-2 hidden lg:flex'>
                <ul className='menu menu-horizontal px-1'>
                    <li>
                        <Link to='/'><FaHome className="inline" />Home</Link>
                    </li>
                    {/* Conditionally render "All Task" and "Add Task" for logged-in users */}
                    {user && (
                        <>

                            <li>
                                <Link to='/add-task'><FaPlus className="inline mr-2" />Add Task</Link>
                            </li>
                            <li>
                                <Link to='/all-task'><FaList className="inline mr-2" />All Task</Link>
                            </li>
                            <li>
                                <Link to='/my-task'><MdAddTask className="inline" />My Task</Link>
                            </li>
                        </>
                    )}
                    {!user && (
                        <li>
                            <Link to='/login'><FaUser className="inline" />Login</Link>
                        </li>
                    )}
                </ul>

                {/* Dark Mode Toggle for Desktop */}

                {user && (
                    <div className='dropdown dropdown-end z-50'>
                        <div
                            tabIndex={0}
                            role='button'
                            className='btn btn-ghost btn-circle avatar'
                        >
                            <div title={user?.displayName} className='w-10 rounded-full'>
                                <img
                                    referrerPolicy='no-referrer'
                                    alt='User Profile Photo'
                                    src={user?.photoURL}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-400 rounded-box w-52'
                        >
                            <li className='mt-2'>
                                <button
                                    onClick={handleLogOut}
                                    className='bg-gray-700 hover:bg-gray-500 block text-center'
                                >
                                    <FaSignOutAlt className="inline mr-2" />Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;