import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backandUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(
          backandUrl + "/api/user/register",
          {
            name,
            email,
            password,
          }
        );

        if (response.data.success) {
          const token = response.data.token.trim();
          console.log("📝 Register successful, token:", token.substring(0, 20) + "...");
          setToken(token);
          localStorage.setItem('token', token);
          console.log("💾 Token saved to localStorage");
          toast.success("Account created successfully!");
          setTimeout(() => navigate('/'), 500);
        } else {
          toast.error(response.data.message);
        }

      } else {
        const response = await axios.post(
          backandUrl + "/api/user/login",
          {
            email,
            password,
          }
        );

        if (response.data.success) {
          const token = response.data.token.trim();
          console.log("🔑 Login successful, token:", token.substring(0, 20) + "...");
          setToken(token);
          localStorage.setItem('token', token);
          console.log("💾 Token saved to localStorage");
          toast.success("Login successful!");
          setTimeout(() => navigate('/'), 500);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log("Error during login/signup:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-black"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Login" ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer hover:text-gray-700">Forget Your Password?</p>

        {currentState === "Login" ? (
          <p
            onClick={() => {
              setCurrentState("Sign Up");
              setName("");
              setEmail("");
              setPassword("");
            }}
            className="cursor-pointer hover:text-gray-700"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => {
              setCurrentState("Login");
              setName("");
              setEmail("");
              setPassword("");
            }}
            className="cursor-pointer hover:text-gray-700"
          >
            Login Here
          </p>
        )}
      </div>

      <button
        disabled={loading}
        className="bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Processing..." : currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
