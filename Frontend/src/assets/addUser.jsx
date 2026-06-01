import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"



function AddUser() {
    const navigate = useNavigate()
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const isDisabled = username.trim() === "" || password.trim() === "";
    const [loginerror, setloginerror] = useState(false)
    const [status, setstatus] = useState(false)

    function handleUser(evt) {
        setusername(evt.target.value)
    }
    function handlePass(evt) {
        setpassword(evt.target.value)
    }

    function handleLogin() {
        setstatus(true)
        axios.post("http://localhost:5000/adduser", {
            username: username,
            password: password
        }).then(function (data) {
            if (data.data === true) {
                navigate("/")
                setstatus(false)
            } else {
                setstatus(false)
                setusername("")
                setpassword("")
                setloginerror(true)
            }
        })

    }
    

    return (
        <div>

            <div className="bg-blue-950 flex h-screen justify-center items-center relative">
                <h1 className="absolute top-5 left-5 text-white text-3xl font-bold md:text-5xl">BulkMail Sender</h1>

                <div className=" h-[40vh]  max-w-sm bg-white flex flex-col p-5   border rounded-2xl">
                    <h1 className=" font-bold  text-4xl pt-5 pb-5 ">SignUp</h1>
                    <div className="flex flex-col flex-wrap justify-between md:flex-row">
                        <input type="text" value={username} onChange={handleUser} className="w-full border rounded-md p-1 m-1 focus:outline-0 focus:ring-0" placeholder="Enter your username" />
                        <input type="password" value={password} onChange={handlePass} className="w-full border rounded-md focus:outline-0 focus:ring-0 p-1 m-1 " placeholder="Enter your password" />
                        <button onClick={handleLogin}
                            disabled={isDisabled || status}
                            className={` border-0 rounded-2xl  block w-full p-1 mt-3 
                        ${isDisabled || status ? "bg-blue-400 cursor-not-allowed" : "bg-blue-800 cursor-pointer"}
                        `}>{status ? "Signing in.." : "Sign In"}</button>
                    </div>
                    {loginerror ? <p className="text-red-600 mt-3">
                        Signup Failed, Try Again
                    </p> : <p></p>}



                </div>
            </div>
        </div>

    )
}
export default AddUser