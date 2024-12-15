import React from "react";
import { forwardRef, useId } from "react";

const Input = forwardRef((
    {
        label,
        type = "text",
        className,
        ...props
    }, ref
) => {
    const id = useId()
    return (
        <div>
            {label && <label
                htmlFor={id}> {label}
            </label>
            }
            <input
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 w-full ${className}`}
                type={type}
                id={id}
                ref={ref}
                {...props}
            />
        </div>
    )
})
export default Input