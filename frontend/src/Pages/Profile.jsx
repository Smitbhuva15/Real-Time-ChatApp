import React, { useState } from 'react'
import { Camera, Mail, User } from "lucide-react";
import { useContext } from 'react';
import { AuthContext } from '../contextapi/AuthContext'
import toast from 'react-hot-toast';

const Profile = () => {

  const { userData, token } = useContext(AuthContext)
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading1, setLoading1] = useState(false);

  const handleImageUpload = async (e) => {

    e.preventDefault()
    const file = e.target.files[0];
   

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image)
      const data = {
        fileurl: base64Image
      }

      try {
        setLoading1(true)
        const response = await fetch(`http://localhost:5000/user/v2/api/update/profile`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(data)
        })

        if (response.ok) {
          const message = await response.json();
          toast.success(message.message)

        }
        else {
          const errormessage = await response.json();
          toast.error(errormessage.message)
        }



      } catch (error) {
        console.log(error)
        toast.error("Internal Network Error!!")

      }
      finally{
        setLoading1(false)
      }

    };

  }


  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">

          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg||userData.profilephoto || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                 
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={loading1}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {loading1 ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{userData?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{userData?.email}</p>
            </div>
          </div>

        </div>

        <div className="mt-6 bg-base-300 rounded-xl p-6">
          <h2 className="text-lg font-medium  mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{userData.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile