import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/auth";
import { useForm } from "react-hook-form";
import { auth } from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Link } from "react-router-dom";
import Input from "./Input";
import Logo from "./Logo";

function LoginForm() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const login = async (data) => {
        setError("")
        try {
            const session = await auth.login(data)
            console.log(session);
            
            if (session) {
                const userData = await auth.getCurrentUser()
                if (userData) {
                    dispatch(authLogin({userData}))
                    navigate('/')
                }
                else {
                    console.log("There is an error here", userData);
                }
            }
            else{
                setError("Email or Password is wrong! Try Again!")
            }
        } catch (error) {
            console.log(error);
            setError(error)
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)}>
                    <Input
                        type="email"
                        label="Email:"
                        placeholder="Enter Your Email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        type="password"
                        label="Password"
                        placeholder="Enter Your Password" 
                        {...register("password", {
                            required: true
                        })}
                    />
                    <Button type="submit">Sign In</Button>
                </form>
            </div>
        </div>

    )
}

export default LoginForm