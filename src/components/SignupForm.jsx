import React, { useState } from "react";
import { auth } from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Input, Button } from './index'
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/auth";
import Logo from "./Logo";

function SignupForm() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    const signup = async (data) => {
        setError("")
        try {
            const user = await auth.createAccount(data)
            console.log(user);
            if (user) {
                const userData = await auth.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                    console.log("user data is",userData);
                    navigate('/login')
                }
            }
        } catch (error) {
            setError(error)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(signup)}>
                    <div className='space-y-5'>
                        <Input
                            type="name"
                            label="Name :"
                            placeholder="Enter Your Name"
                            {...register("name", {
                                required: true
                            })}
                        />
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
                        <Button type="submit">Create An Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SignupForm