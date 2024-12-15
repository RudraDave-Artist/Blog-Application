import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth";
import { auth } from "../../appwrite/auth";

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        auth.logout().then(() => {
            dispatch(logout())
        })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <button
                className='inline-bock px-6 py-4 duration-200 hover:bg-blue-100 rounded-full'
                onClick={() => logoutHandler()}>
                Log Out
            </button>
        </div>
    )
}

export default LogoutBtn