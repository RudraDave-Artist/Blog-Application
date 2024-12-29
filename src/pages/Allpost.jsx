import React, { useState } from "react";
import { services } from "../appwrite/conf";
import { PostCard } from "../components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Container} from "../components";
import { filterPost } from "../store/post";

function Allpost() {
    const [posts, setPosts] = useState([])
    const currentPosts  = useSelector((state) => state.post.activePosts)    
    console.log(currentPosts);
    
    useEffect(() => {
        setPosts(currentPosts)
    }, [])
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts.map((post) => {
                            return <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        })
                    }
                </div>
            </Container>
        </div>
    )
}

export default Allpost