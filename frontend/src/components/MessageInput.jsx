import React, { useState } from 'react'
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { AuthContext } from '../contextapi/AuthContext';
import { useSelector } from 'react-redux';
import moment from 'moment'

const MessageInput = ({socket}) => {

    const selecteduser = useSelector((store) => store.message.selecteduser);
    const id = selecteduser?._id;
   
    const [imagePreview, setImagePreview] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    const { token,userData } = useContext(AuthContext)

    const handleImageUpload = (e) => {

        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setImagePreview(base64Image)
        }

    }

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const onSubmit = async (data, e) => {
        const text = data.text
      
        const newdata = {
            text: text,
            file: imagePreview
        }
        socket.emit("send-message",{
            ...newdata,
            receiverId :selecteduser._id,
            senderId:userData._id,
            createdAt: moment().format('DD-MM-YYYY hh:mm:ss')
        })
   
    
        try {
            const response = await fetch(`${apiUrl}/user/v2/api//post/message/${id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newdata)
            })

            if (response.ok) {
                const message = await response.json();
                console.log(message)
                reset()
                setImagePreview(null)
            }
            else {
                const errmessage = await response.json();
                console.log(errmessage)
            }

        } catch (error) {
            console.log(error)
            toast.error("Internal Network Error!!")
        }

    }

    const removeImage = () => {
        setImagePreview(null)
    }
    return (
        <div className="p-4 w-full">

            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                                 flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )

            }


            <form className="flex items-center gap-2 " onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        {...register("text")}
                    />
                    <label
                        className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"} `} >

                        <Image size={20} />
                        <input type='file'
                            className='hidden'
                            {...register("file")}
                            onChange={handleImageUpload}
                              accept="image/*"
                        />

                    </label>
                </div>
                <button

                    className="btn btn-sm btn-circle"
                >
                    <Send size={22} />
                </button>
            </form>
            

        </div>
    )
}

export default MessageInput