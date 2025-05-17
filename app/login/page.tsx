"use client";

import {useDispatch} from "react-redux";
import {setUser} from "../lib/features/userSlice";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./index.css";
export default function Login() {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        strongPasswordRegex,
        "Password must be at least 8 characters and \n include uppercase, lowercase, number, and special character"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const navigateToLeadManagement = () => {
    window.location.href = "/lead-management";
  };

  const onSubmit = async (formData: {email: string; password: string}) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok && data.message === "Login successful") {
      console.log("Form submission successful");
      dispatch(
        setUser({
          email: formData.email,
          authenticated: true,
        })
      );
      navigateToLeadManagement();
    } else {
      console.log("Form submission failed");
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-form-container">
      <div className="form-header">
        <h2>Login</h2>
        <p>Use your email and password to login</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
          className="border p-2 w-full"
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="border p-2 w-full"
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
}
