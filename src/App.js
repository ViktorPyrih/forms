import './App.css';
import profileSchema from "./data/profile-schema.json";
import {createContext} from "react";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";

export const Context = createContext(profileSchema);

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            loader: () => {
                throw redirect("/registration");
            }
        },
        {
            path: "/registration",
            element: <RegistrationPage/>
        },
        {
            path: "/profile",
            element: <ProfilePage/>
        },
        {
            path: "/*",
            loader: () => {
                throw redirect("/");
            }
        }
    ]);
    return (
        <Context.Provider value={profileSchema}>
            <RouterProvider router={router}/>
        </Context.Provider>
    );
}

export default App;
