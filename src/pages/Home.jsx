import React, { useEffect, useState } from "react";
import { services } from "../appwrite/conf";
import { auth } from "../appwrite/auth";
import { PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addPost, filterPost, removeAllPosts } from "../store/post";
import { Container } from "../components";
import { Query } from "appwrite";
function Home() {
    const [posts, setPosts] = useState([])
    const dispatch = useDispatch()
    
    const allPosts = useSelector(state => state.post.posts)
    console.log(allPosts);
    
    const status = useSelector(state => state.auth.status)
    
    useEffect(()=>{
        dispatch(filterPost())
    },[allPosts])
    
    const currentPosts = useSelector((state) => state.post.activePosts)
    console.log(currentPosts);
    
    useEffect(() => {
        services.getPosts().then((post) => {
            if(post.documents.length == 0){
                dispatch(removeAllPosts())
                setPosts(null) 
            } 
            else if(allPosts.length !== post.documents.length){
                dispatch(removeAllPosts())
                post.documents.forEach(element => {
                    dispatch(addPost(element))
                });
                setPosts(post.documents)
            }
            else{
                console.log(post.documents)      
                setPosts(post.documents)
            } 
        })
    } ,[])

    if (status === false) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else if(currentPosts.length == 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            No Posts Yet!! Be First!
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts ? posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    )) : null}
                </div>
            </Container>
        </div>
    )
}

export default Home
