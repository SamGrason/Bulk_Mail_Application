import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {

    const navigate = useNavigate()

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [loginerror, setloginerror] = useState(false)
    const [status, setstatus] = useState(false)

    const isDisabled = username.trim() === "" || password.trim() === ""

    function handleUser(evt) {
        setusername(evt.target.value)
        setloginerror(false)
    }

    function handlePass(evt) {
        setpassword(evt.target.value)
        setloginerror(false)
    }

    function handleLogin() {

        setstatus(true)

        axios.post("http://localhost:5000/login", {
            username,
            password
        })
            .then((data) => {

                setstatus(false)

                if (data.data === true) {
                    navigate("/home")
                } else {
                    setloginerror(true)
                    setusername("")
                    setpassword("")
                }
            })
            .catch((err) => {
                console.log("Login Error:", err)
                setstatus(false)
                setloginerror(true)
            })
    }

    function handleAdd() {
        navigate("/adduser")
    }

    return (
        <div>
            <div className="bg-blue-950 flex h-screen justify-center items-center relative">

                <h1 className="absolute top-5 left-5 text-white text-3xl font-bold md:text-5xl">
                    BulkMail Sender
                </h1>

                <div className="h-[50vh] w-[90%] max-w-sm bg-white flex flex-col p-5 border rounded-2xl">

                    <h1 className="font-bold text-4xl pt-5 pb-5">
                        Login
                    </h1>

                    <div className="flex flex-col">

                        <input
                            type="text"
                            value={username}
                            onChange={handleUser}
                            className="w-full border rounded-md p-2 mb-2 focus:outline-none focus:ring-0"
                            placeholder="Enter your username"
                        />

                        <input
                            type="password"
                            value={password}
                            onChange={handlePass}
                            className="w-full border rounded-md p-2 mb-2 focus:outline-none focus:ring-0"
                            placeholder="Enter your password"
                        />

                        <button
                            onClick={handleLogin}
                            disabled={isDisabled || status}
                            className={`
                                w-full p-2 mt-3 rounded-2xl text-white
                                ${isDisabled || status
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-800 hover:bg-blue-900 cursor-pointer"}
                            `}
                        >
                            {status ? "Logging in..." : "Login"}
                        </button>

                    </div>

                    {loginerror && (
                        <p className="text-red-600 mt-3">
                            Invalid Credentials
                        </p>
                    )}

                    <h2
                        onClick={handleAdd}
                        className="text-gray-500 underline pt-5 cursor-pointer"
                    >
                        Don't have an account?
                    </h2>

                </div>
            </div>
        </div>
    )
}

export default Login