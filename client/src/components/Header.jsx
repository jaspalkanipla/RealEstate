import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex-wrap">
            <span className="text-slate-500">Jaspal</span>
            <span className="text-slate-700">Singh</span>
          </h1>
        </Link>
        <form className="bg-slate-100 rounded-lg p-2 flex items-center">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search"
          />
          <FaSearch className="text-slate-700" />
        </form>
        <ul className="flex gap-3">
       
          <Link to="/signup">
            <li className="hidden sm:inline text-slate-700 hover:underline">SignUp</li>
          </Link>

          <Link to="/signout">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              SignOut
            </li>
          </Link>
          <Link to="/profile">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Profile
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.data.avatar}
                className="rounded-full h-7 w-7 object-cover"
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline">SignIn</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
