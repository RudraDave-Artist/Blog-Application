import React, { useEffect, useState } from "react";
import { services } from "../../appwrite/conf";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Select, Input, Button, RTE } from '../index';
import { useDispatch } from "react-redux";
import { addPost, filterPost, updatePost } from "../../store/post";

function Postform({ post }) {

    const { register, control, reset, watch, handleSubmit, setValue, getValues } = useForm({
        defaultValues: {
            title: "",
            content: "",
            slug: "",
            status: "active",
        }
    })

    useEffect(() => {
        if (post) {
            reset({
                title: post.title || "",
                content: post.content || "",
                slug: post.slug || "",
                status: post.status || "active",
            });
            setValue("slug", slugTransform(post.title))
        }
    }, [post, reset])

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const dispatch = useDispatch()

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await services.uploadFile(data.image[0]) : null
            
            if (file) {
                services.deleteFile(post.featuredImage)
                
            }
                const dbPost = await services.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                })
                
                if (dbPost) {
                    dispatch(updatePost({ id: post.$id, postData: dbPost }))
                    dispatch(filterPost())
                    navigate(`/post/${dbPost.$id}`)
                }
        }
        else {
            const file = await services.uploadFile(data.image[0])
            console.log(file);
            if (file) {
                // const fileId = file.then((data) => {
                //     return data.$id
                // })
                data.featuredImage = file.$id
                const dbPost = await services.createPost({
                    ...data,
                    userId: userData.$id
                })

                if (dbPost) {
                    dispatch(addPost({ ...dbPost }))
                    dispatch(filterPost())
                    // navigate('/')
                    navigate(`/post/${dbPost.$id}`)
                }
            }
            else {
                console.log("You have to add image and title");
            }
        }
    }

    const slugTransform = (value) => {
        if (value && typeof value === "string") {

            return value
                .trim()
                .toLowerCase()
                .replace(/\s/g, '-')
        }
        return ''
    }

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
            return () => {
                subscription.unsubscribe()
            }
        })
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title * :"
                    defaultValue={getValues("title")}
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    defaultValue={getValues("slug")}
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    readOnly
                />
                <RTE label="Content (Max. 255 char)  :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image * :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={services.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default Postform