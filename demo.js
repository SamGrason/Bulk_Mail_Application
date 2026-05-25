const fileInput = document.getElementById("inputFile")

fileInput.addEventListener("change",function(event){
    const file = event.target.files[0]
    // creating a file reader object
    const reader = new FileReader()

    // When the reader is loaded
    reader.onload = function(event){

        const data = event.target.result// data is read from excel file
        const workbook = XLSX.read(data,{type:"binary"}) // converts into readable format
        const sheetName = workbook.SheetNames // gets sheet no
        const worksheet = workbook.Sheets[sheetName] // gets sheet data
        const emailList = XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        console.log(emailList)
    }

    // Instruction of the data type to reader- excel is stored as binary string
    reader.readAsBinaryString(file)
})