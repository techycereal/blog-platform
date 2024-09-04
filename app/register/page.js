"use client";

import { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { auth } from "../lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const usernameExists = await axios.post("/api/checkuname", {
        username: username,
      });

      if (!usernameExists.data.data) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setSuccessMessage("Registration successful!");

        const body = {
          name: name,
          username: username,
          uid: userCredential.user.uid,
        };
        await axios.post("/api/register", body);
        router.push("/");
      } else {
        setErrorMessage("Username already exists.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-700">
  <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
    <div className="p-6 md:p-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Create your account
      </h1>
      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-800"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-800"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full p-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500"
            placeholder="your_username"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-800"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-800"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500"
            placeholder="••••••••"
            required
          />
        </div>
        {errorMessage && (
          <div
            className="bg-red-50 border border-red-400 text-red-700 p-4 rounded-md"
            role="alert"
          >
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div
            className="bg-green-50 border border-green-400 text-green-700 p-4 rounded-md"
            role="alert"
          >
            <span>{successMessage}</span>
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2.5 rounded-md bg-blue-600 text-white font-medium text-sm hover:bg-primary-700 focus:ring-2 focus:ring-primary-600 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-500"
        >
          Register
        </button>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign in here
          </Link>
        </p>
      </form>
    </div>
  </div>
</main>

  );
}
