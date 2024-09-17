import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
function App() {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
  // add server proxy for vite

   axios.get('/api/jokes')
   .then((response)=>{
    setJokes(response.data)
   }).catch((error)=>{
      console.log(error)
   })
  }, [])
  
  return (
    <>
    <h1>Full stack App</h1>
    <p>JoKES:{jokes.length}</p>
    {jokes.map((joke,index)=>(
      <div key={joke.id}>
        <h3>{joke.title}</h3>
        <p>{joke.content}</p>
      </div>
    ))}
    </>
  )
}

export default App
