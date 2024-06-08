import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formdata, setformdata] = useState({});
  // const [error, seterror] = useState(null);
  // const [loading, setloading] = useState(false);
  const {loading,error} = useSelector((state) =>state.user);
  const dispatch= useDispatch() // redux dispatch method
  const Navigate=useNavigate()

  // ON CHANGE FUNCTION
  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formdata);

  // SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart(true))
      // setloading(true);
      const data = await axios.post("api/user/signin", formdata);
      if (data.success === false) { //data.status === false
        dispatch(signInFailure(data.message))
        // seterror(data.message);
        // setloading(false);
        return;
      }
      dispatch(signInSuccess(data))
      // setloading(false);
      // seterror(data.data.message);
      Navigate("/")
      console.log(data);
    } catch (error) {
      console.log(error);
      // dispatch(signInFailure(error.message))
      dispatch(signInFailure(error.response.data.message))
      // setloading(false);
      // seterror(error.response.data.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>   
      </form>
      <div className="flex mt-5 gap-4">
        <p>Do not have an Account ? </p>
        <Link to="/signup">
          <span className="text-blue-700">SignUp</span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-5">{error} </p>}
    </div>
  );
}
