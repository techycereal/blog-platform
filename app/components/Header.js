'use client'
import Link from "next/link";
import { useAppSelector } from '../store';
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from '../lib/firebaseConfig';
import { setAuthState } from '../store/authSlice';
import { useAppDispatch } from "../store";
import { useEffect, useState } from "react";
export default function Header() {
    const authState = useAppSelector((state) => state.auth.authState);
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const authToken = localStorage.getItem('userData');
        dispatch(setAuthState(!!authToken))
      }, []);
    async function handleLogout() {
        // Sign out from Firebase auth
        await fetch("/api/logout");

        await signOut(auth);

        // Clear session and update state
        dispatch(setAuthState(false));
        router.push("/login");
    }

    return (
        <header className="bg-blue-900 text-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link href='/' className="hover:text-gray-200 transition duration-200">
                        Home
                    </Link>
                </div>
                <nav className="space-x-4 text-sm">
                    <Link href='/createpost' className="hover:text-gray-200 transition duration-200">
                        Create Post
                    </Link>
                    {authState ? (
                        <button
                            onClick={handleLogout}
                            className="hover:text-gray-200 transition duration-200"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link href='/login' className="hover:text-gray-200 transition duration-200">
                                Log In
                            </Link>
                            <Link href='/register' className="hover:text-gray-200 transition duration-200">
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
