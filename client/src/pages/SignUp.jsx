import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  const [formdata, setformdata] = useState({});
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const Navigate=useNavigate()

  // ON CHANGE FUNCTION
  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
    // console.log(e.target.value);
  };
  console.log(formdata);

  // SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setloading(true);
      //   const res =await fetch("api/user/signup", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(formdata),
      //   });
      //   const data = await res.json();
      //   console.log(data);
      const data = await axios.post("api/user/signup", formdata);
      if (data.status === false) {
        seterror(data.message);
        setloading(false);
        return;
      }
      seterror(data.data.message);
      setloading(false);
      Navigate("/signin")
      console.log(data);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error.response.data.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex mt-5 gap-4">
        <p>Have an Account ? </p>
        <Link to="/signin">
          <span className="text-blue-700">SignIn</span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-5">{error} </p>}
    </div>
  );
}
