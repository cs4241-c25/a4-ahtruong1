import LoginForm from './components/LoginForm.jsx';
import Phonebook from './components/Phonebook.jsx';

import axios from "axios";
import { useState } from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Logs the user in if the credentials are valid
    async function login(e) {
        e.preventDefault();

        // Retrieve form data
        const formData = new FormData(e.target);

        // Convert FormData to JS object
        const body = Object.fromEntries(formData.entries());

        try {
            // Make HTTP request to server
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/login`,
                body,
                {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
                }
            );
            if (response.status === 200) setIsLoggedIn(true);
        } catch (e) {
            console.error(e);
            alert("Incorrect username or password. Please try again!");
        }
    }

    return (
        <main className="w-screen h-screen grid place-items-center bg-background font-electrolize text-lg">
            <div className="w-[55vw]">
                <h1 className="text-2xl mb-3 font-extrabold">WPI Phonebook</h1>
                <p className="mb-3 text-md leading-[normal]">WPI phonebook is a directory of phone numbers for WPI students. Unlike traditional phonebooks, the directory automatically generates a playful description of each student based on their major. <span className="font-bold"> Only common majors, such as BME, CS, DS, ME, and RBE are supported.</span> These descriptions are meant to keep the project lighthearted and fun.</p>
                <hr className="border-gray-500 mb-3"/>
                { isLoggedIn ? <Phonebook/> : <LoginForm submitHandler={login}/> }
            </div>
        </main>
    )
}

export default App
