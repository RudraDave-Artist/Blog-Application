import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { services } from "../appwrite/conf";
import { Postform } from "../components";

function EditPost() {
    const [post, setPost] = useState()
    const { slug } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (slug) {
            services.getPost(slug).then((post) => {
                if (post) setPost(post)
            })
        }
        else {
            navigate('/')
        }
    }, [slug , navigate])
    return (
        <div className="py-8">
            <Postform post={post} />
        </div>
    )
}
export default EditPost