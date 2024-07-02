import axios from 'axios'
import React, { useState } from 'react'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8080/api/v1/register', {
        name: name,
        email: email,
        password: password
      })
      if (res.data) {
        console.log(res.data)
      } else {
        console.log("Error")
      }
    }
    catch (e) {
      console.log("Error in register")
    }
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 rounded-lg shadow-md max-w-md w-full flex flex-col items-center">
        <div className='p-3 '>SignUp</div>
        <form className="flex flex-col w-[80%]" onSubmit={handleSubmit}>
          <input
            className="mb-4 p-2 border border-gray-300 rounded"
            type="text"
            name="name"
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
            required
          />

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
          <button type='submit' className="bg-[#3797EF] text-white p-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
          <div className="flex justify-center mt-8 mb-4">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-[#3797EF]">
                Log In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Register