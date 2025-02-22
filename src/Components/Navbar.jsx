import axios from "axios";
import { useTask } from "../context/TaskContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, createUser,logout } = useTask();
  const links =(
    <li className="text-2xl font-semibold">
      <Link to={'/'}>Home</Link>
    </li>
  )
  const handleLogin = () => {
    createUser()
      .then((res) =>
        axios.post("https://task-management-serverl.onrender.com/user", {
          uid: user?.uid,
          email: user?.email,
          displayName: user?.displayName,
        })
      )
      .catch((err) => console.log(err));
  };
  const handleLogOut =()=>{
    logout()
  }

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar w-11/12 mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
             {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">TO-DO</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
           {links}
          </ul>
        </div>
        <div className="navbar-end">
        {
          user?.email ?   <a onClick={handleLogOut} className="btn">
          Logout
        </a> :   <a onClick={handleLogin} className="btn">
          Login
        </a>
        }

        </div>
      </div>
    </div>
  );
};

export default Navbar;
