import React, { useState } from 'react'
import UserIcon from "../assets/signin.gif";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleOnSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        const dataResponse = await fetch(SummaryApi.forgotPassword.url,{
            method: SummaryApi.forgotPassword.method,
            credentials: 'include',
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({email})
        })

        const response = await dataResponse.json()

        if(response.success){
            toast.success(response.message)
        }

        if(response.error){
            toast.error(response.message)
        }

        setLoading(false)
    }


  return (
      <div className="container mx-auto p-4">
          <div className="bg-white p-4 w-full max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
              <img
                src={UserIcon}
                alt="gif"
                className="object-scale-down mix-blend-multiply"
              />
            </div>
    
            <div className="grid mt-5">

              <form className="flex flex-col gap-3 pt-6" onSubmit={handleOnSubmit}>
                <div>
                    <p className=' font-semibold text-sm text-slate-400 mb-2'>Enter Your Emial Here To Send the Password Reset Link ... Please Check Your Inbox After Send The email</p>
                  <label className=''>Enter Your Emial :</label>
                  <div
                    className="bg-slate-100 p-2 flex mt-2 "
                  >
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="w-full h-full outline-none bg-transparent"
                      name="newPassword"
                      value={email}
                      onChange={(e)=> setEmail(e.target.value)}
                      required
                    />
                  
                  </div>
                  
    
                
                </div>
    
                <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4"
              disabled={loading }
            >
              {loading ? "Sending..." : "Send"}
            </button>

              </form>
            </div>
          </div>
        </div>
  )
}

export default ForgotPassword