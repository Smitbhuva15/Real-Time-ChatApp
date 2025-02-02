import React, { useContext } from 'react'
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import AuthImagePattern from '../components/AuthImagePattern';
import { AuthContext } from '../contextapi/AuthContext';




const Login = () => {

  const [password, setPassword] = useState(true);
  const [password1, setPassword1] = useState(true);




  const [loading1, setLoading1] = useState(false);
  const navigate = useNavigate()

  const {setToken} = useContext(AuthContext);

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const onSubmit = async (data, e) => {
 
    e.preventDefault()
    try {
      setLoading1(true)
      const response = await fetch(`http://localhost:5000/user/v2/api/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        const message = await response.json();
        setToken(message.user.token)
      
        localStorage.setItem('token',message.user.token)
        toast.success(message.message)
        
        reset()
        setTimeout(() => {
          navigate("/");
        }, 2000);

      }
      else {
        const errormessage = await response.json();
        const mess = errormessage.message
        const isAarry = await Array.isArray(mess);
        if (isAarry) {
          for (let i = 0; i < mess.length; i++) {
            toast.error(mess[i]);
          }
        }
        else {
          toast.error(mess)
        }
      }
    } catch (error) {

      console.log(error)
      toast.error("Internal Network Error!!")

    }
    finally {
      setLoading1(false)
    }

  }


  return (
    <div className="min-h-screen grid lg:grid-cols-2">

    {/* left side */}
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                      group-hover:bg-primary/20 transition-colors"
            >
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">Get started with your free account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className={`input input-bordered w-full pl-10`}
                placeholder="hello@example.com"
                {...register("email")}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={password ? 'password' : 'text'}
                className={`input input-bordered w-full pl-10`}
                placeholder="••••••••"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setPassword(!password)}
              >
                {password ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Confirm Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={password1 ? 'password' : 'text'}
                className={`input input-bordered w-full pl-10`}
                placeholder="••••••••"
                {...register("confirmpassword")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setPassword1(!password1)}
              >
                {password1 ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading1}>
            {loading1 ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Please Wait
              </>
            ) : (
                "Sign in"
            )}
          </button>
        </form>
          <div className="text-center">
                    <p className="text-base-content/60">
                      Don&apos;t have an account?{" "}
                      <Link to="/signup" className="link text-blue-800 link-primary">
                        Create account
                      </Link>
                    </p>
                  </div>
      </div>
    </div>


    {/* right side */}
    <AuthImagePattern
      title="Join our community"
      subtitle="Connect with friends, share memories, and stay close to the ones you love and care for."
    />

  </div>
  )
}

export default Login