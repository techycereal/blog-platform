'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../lib/firebaseConfig';
import { setAuthState } from '../store/authSlice';
import { useAppDispatch } from "../store";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    dispatch(setAuthState(true));

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();
      console.log(credential.user);
      console.log(idToken);

      const url = `/api/user/${credential.user.uid}`;
      const apiResponse = await fetch(url);
      const data = await apiResponse.json();
      localStorage.setItem('userData', JSON.stringify(data.data))

      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      router.push('/');
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-700">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6 md:p-8 space-y-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Log In!
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Your email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="mt-1 block w-full p-2.5 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="mt-1 block w-full p-2.5 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 p-4 rounded-md" role="alert">
                <span>{error}</span>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2.5 rounded-md bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              Enter
            </button>
            <p className="text-sm text-gray-400 text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
