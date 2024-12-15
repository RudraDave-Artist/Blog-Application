import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from '@tinymce/tinymce-react'

function RTE({name , control , label , defaultValue = ""}) {
    return (
        <div>
            {label && <label>{label}</label>}
            <Controller
            name={name || "Content"}
            control={control}
            defaultValue={defaultValue}
            render = {({field : {onChange}}) => {
                return  <Editor
                initialValue={defaultValue}
                apiKey='d3q8ji566td6aphl8dhgrujovvdvvj8yy7uw2p9fsn6nt4op'
                init={{
                    initialValue: defaultValue,
                    height: 500,
                    menubar: true,
                    plugins: [
                        "image",
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                        "anchor",
                    ],
                    toolbar:
                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                }}
                onEditorChange={onChange}
                />
            }}
            />
        </div>
    )
}
export default RTE