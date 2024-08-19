import { useState } from "react"
import "./App.css"

function App() {
  const [test, setTest] = useState<any>(null)

  const testAPI = async () => {
    let response = await fetch("http://localhost:3000/").then(res => res.json())
    console.log("response is: ")
    console.log(response)
    setTest(response)
  }

  return (
    <div>
      starter app
      <button onClick={testAPI}>API test</button>
      <div>{test}</div>
    </div>
  )
}

export default App
