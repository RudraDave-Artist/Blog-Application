import React, { useEffect, useState } from "react";
import { services } from "../appwrite/conf";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../components";
import parse from "html-react-parser"
import { removePost } from "../store/post";
import { Container } from "../components";
 function Post() {

    const [post, setPost] = useState()
    const { slug } = useParams();
    const navigate = useNavigate()

    const userData = useSelector(state => state.auth.userData)
    const currentPosts = useSelector((state) => state.post.posts)
    console.log(currentPosts);

    const dispatch = useDispatch()

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            services.getPost(slug).then((post) => {
                console.log(post);
                console.log(post.content);
                if (post) setPost(post)
                else navigate('/')
            })
        }
        else {
            navigate('/')
        }
    }, [slug, navigate])

    const deletePost = () => {
        services.deletePost(post.$id).then((status) => {
            if (status) {
                services.deleteFile(post.featuredImage)
                dispatch(removePost(slug))
                navigate('/')
            }
        })
    }

    return post ? <div className="py-8">
        <Container>
            <div className="flex flex-wrap lg:flex-nowrap gap-4">
                {/* Image Section */}
                <div className="w-full lg:w-1/2 flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={services.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Reading Section */}
                <div className="w-full lg:w-1/2 flex flex-col ">
                    <div className="w-full mb-6 text-center">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    <div className="browser-css">
                        {parse(post.content)}
                    </div>
                    <div className="absolute bottom-20 right-20 text-xl text-black-500">
                        Post By {userData.name}
                    </div>
                </div>
            </div>
        </Container>
    </div>
        : null;
}

export default Post