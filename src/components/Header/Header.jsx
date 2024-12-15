import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import LogoutBtn from "./LogoutBtn";
import Container from "../container/Container";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Header() {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)    
    const navItems = [
        {
            name: "Home",
            slug: '/',
            active: true
        },
        {
            name: "Login",
            slug: '/login',
            active: !authStatus
        },
        {
            name: "Sign Up",
            slug: '/signup',
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: '/all-post',
            active: authStatus
        },
        {
            name: "My Posts",
            slug: '/my-post',
            active: authStatus
        },
        {
            name: "Add Post",
            slug: '/add-post',
            active: authStatus
        }
    ]
    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <h3>
                                    <button
                                        className='inline-bock px-6 py-4 duration-200 hover:bg-blue-100 rounded-full'
                                        onClick={() => navigate(item.slug)}>
                                        {item.name}
                                    </button>
                                    </h3>
                                </li>
                            ) : null)}
                        {
                            authStatus && <li><LogoutBtn /></li>
                        }
                    </ul>
                    </nav>
            </Container>
        </header>
    )
}

export default Header