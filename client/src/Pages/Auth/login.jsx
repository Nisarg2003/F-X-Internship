import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8080/api/v1/login', {
        email: email,
        password: password
      })
      if (res.data.success) {
        console.log(res.data)
        const userData = { ...res.data.user, password: "" };
        localStorage.setItem("user", JSON.stringify(userData))
        navigate('/')
      } else {
        console.log("Error")
      }
    }
    catch (e) {
      console.log("Error in Login")
    }
  }
  return (

    <div className="flex items-center justify-center h-screen">
      <div className="p-4 rounded-lg shadow-md max-w-md w-full flex flex-col items-center">
        <div className='mt-3 mb-6 font-semibold '>Login To Continue</div>
        <form className="flex flex-col w-[80%]" onSubmit={handleSubmit}>

          <input
            className="mb-4 p-2 border border-gray-300 rounded"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="mb-4 p-2 border border-gray-300 rounded"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-[#3797EF] text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
          <div className="flex justify-center mt-8 mb-4">
            <p>
              Don't have an account?{" "}
              <a href="/register" className="text-[#3797EF]">
                SignUp
              </a>
            </p>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login