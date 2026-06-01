import { useState } from 'react'
import axios from "axios"
import * as XLSX from "xlsx"
import { useNavigate } from 'react-router-dom'

function App() {
  const [msg, setmsg] = useState("")
  const [status, setstatus] = useState(false)
  const [emailList, setemailList] = useState([])
  const isDisabled = msg.trim() === "" || emailList.length === 0
  const navigate = useNavigate()

  function handleMsg(evt) {
    setmsg(evt.target.value)
  }

  function handleHistory() {
    navigate("/history")
  }

  function send() {
    setstatus(true)
    axios.post("http://localhost:5000/sendmail", { msg: msg, emailList: emailList }).
      then(function (data) {
        console.log(data)
        if (data.data === true) {
          alert("Message sent successfully")
          setstatus(false)
        } else {
          alert("Failed to send email")
          setstatus(false)
        }
      })

  }

  function handleFile(event) {
    const file = event.target.files[0]
    // creating a file reader object
    const reader = new FileReader()

    // When the reader is loaded
    reader.onload = function (event) {

      const data = event.target.result// data is read from excel file
      const workbook = XLSX.read(data, { type: "binary" }) // converts into readable format
      const sheetName = workbook.SheetNames[0] // gets sheet no
      const worksheet = workbook.Sheets[sheetName] // gets sheet data
      const eList = XLSX.utils.sheet_to_json(worksheet, { header: 'A' })
      const totalList = eList.map(function (item) {
        return (item.A)
      })
      setemailList(totalList)

    }

    // Instruction of the data type to reader- excel is stored as binary string
    reader.readAsBinaryString(file)
  }

  return (
    <div >
      <div className="bg-blue-950 text-white relative py-3">
        <h1 className="text-4xl font-bold text-center">BulkMail</h1>
        <h2 onClick={handleHistory} className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer">History</h2>
      </div>
      <div className='bg-blue-800 text-white text-center '>
        <h1 className='font-medium px-5 py-3'>We can help your buisness send multiple emails at once </h1>
      </div>
      <div className='bg-blue-600 text-white text-center '>
        <h1 className='font-medium px-5 py-3'>Drag and Drop</h1>
      </div>
      <div className='bg-blue-500 flex flex-col items-center text-black px-5 py-5 '>
        <textarea onChange={handleMsg} value={msg} className='bg-white w-[80%] h-32 outline-none border border-black rounded-md p-2' placeholder='Enter the text here...'></textarea>
        <div>
          <input type="file" onChange={handleFile} className='bg-blue-300 font-medium p-4 m-3 border-4 border-dashed cursor-pointer' />
        </div>

        <p>Total Emails in the file: {emailList.length}</p>

        <button onClick={send}
          disabled={isDisabled || status}
          className={`
                  text-white font-medium rounded-2xl px-5 py-3 mt-3
                  ${isDisabled || status ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-950 cursor-pointer hover:bg-blue-900"}
  `}
        >{status ? "Sending.." : "Send"}</button>
      </div>
      <div className='bg-blue-300 p-15 '>
      </div>
      <div className='bg-blue-200 p-14.5'>
      </div>


    </div>
  )
}

export default App
