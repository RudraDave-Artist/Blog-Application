import React, { useEffect, useState } from "react";
import { services } from "../appwrite/conf";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
import { PostCard } from "../components";
import { Container } from "../components";
import { useNavigate } from "react-router-dom";

function MyPost() {
    const navigate = useNavigate() 
    const [posts, setPosts] = useState([])
    const userId = useSelector(state => state.auth.userData)
    const status = useSelector(state => state.auth.status)
    useEffect(() => {
        console.log(userId);
        services.getPosts([Query.equal("userId", userId.$id)]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        }
        )
        if (!status) {
            navigate('/')
        }
    }, [status])


    return (posts.length > 0 ?
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
        </div> :
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            No Posts Yet!! Add New Posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>

    )
}
export default MyPost
