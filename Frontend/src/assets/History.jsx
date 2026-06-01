import { useEffect, useState } from "react"
import axios from "axios"

function History() {
    const [emails, setEmails] = useState([])
    useEffect(() => {

        axios.get("http://localhost:5000/history")
            .then((res) => {
                setEmails(res.data)
            }).catch((err) => {

                console.log(err)

            })

    }, [])
    return (
        <div className="bg-blue-950 h-screen flex flex-col">

            <div className="text-white text-3xl font-bold p-5 md:text-5xl">
                History
            </div>

            <div className="bg-white flex-1 mx-5 mb-5 p-5 rounded-lg overflow-y-auto">
                {emails.map((email, index) => (
                    <p key={index} className="border-b py-2">
                        {index +". " +email}
                    </p>
                ))}
            </div>

        </div>
    )

}
export default History