import React,{use, useId} from 'react'

const Input=React.forwardRef(function Input({
    label,
    type="text",
    className="",
    ...props
},ref){
    const id=useId()
    return (
        <div className='w-full'>
            {label && (
                <label
                    className='inline-block mb-1 pl-1 text-gray-700 dark:text-gray-200'
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white dark:bg-slate-800 text-black dark:text-white outline-none focus:bg-gray-50 dark:focus:bg-slate-700 duration-200 border border-gray-200 dark:border-gray-700 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input
