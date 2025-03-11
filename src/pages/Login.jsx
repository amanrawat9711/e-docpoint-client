import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate()
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    try {
      if(state==='Signup'){
        const {data} = await axios.post(backendUrl +  `/api/user/register`,{name,password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
         toast.error(data.message)
        }
        }
        else{
        const {data} = await axios.post(backendUrl +  `/api/user/login`,{password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
         toast.error(data.message)
        }
        }
    } catch (error) {
      toast.error(error.message)
    }

  };

  useEffect(()=>{
if(token ){
navigate("/")
}
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 items-start m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Signup" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Signup" ? "Sign up" : "Login"} to book appointment
        </p>
        {state === "Signup" ? (
          <div className="w-full">
            <p className="w-full ">Full Name</p>
            <input
              className="border border-zinc-400 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        ) : (
          ""
        )}

        <div className="w-full">
          <p className="w-full ">Email</p>
          <input
            className="border border-zinc-400 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p className="w-full ">Password</p>
          <input
            className="border border-zinc-400 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type="submit" className="cursor-pointer bg-indigo-500 text-white py-2 w-full rounded-md text-base">
          {state === "Signup" ? "Create Account" : "Login"}
        </button>
        {state === "Signup" ? (
          <p>
            Already have an account?{" "}
            <span
              className="text-indigo-500 cursor-pointer underline"
              onClick={() => setState("Login")}
            >
              {" "}
              Login here!
            </span>{" "}
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              className="text-indigo-500 cursor-pointer underline"
              onClick={() => setState("Signup")}
            >
              {" "}
              Click here!
            </span>{" "}
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
