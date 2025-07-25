import { useState } from "react"

function App() {

  const [color,setColor] = useState('olive')


   return (
    <>
    <div className=" w-full h-screen" style={{backgroundColor:color}}>
      <div className=" fixed flex flex-wrap gap-2 justify-center bottom-12 inset-x-0 px-2">
        <div className=" flex flex-wrap justify-center gap-3 shadow-lg bg-white px-2 py-2 rounded-4xl">
          <button className=" outline-none px-3 py-3 rounded-4xl" style={{backgroundColor:"red"}}
          onClick={()=> setColor("red")}
          >
            Red
          </button>
        </div>

        <div className=" flex flex-wrap justify-center gap-3 shadow-lg bg-white px-2 py-2 rounded-4xl">
          <button className=" outline-none px-3 py-3 rounded-4xl" style={{backgroundColor:"green"}}
          onClick={()=> setColor("green")}
          
          >
            green
          </button>
        </div>

        <div className=" flex flex-wrap justify-center gap-3 shadow-lg bg-white px-2 py-2 rounded-4xl">
          <button className=" outline-none px-3 py-3 rounded-4xl" style={{backgroundColor:"blue"}}
          onClick={()=> setColor("blue")}
          
          >
            blue
          </button>
        </div>

        <div className=" flex flex-wrap justify-center gap-3 shadow-lg bg-white px-2 py-2 rounded-4xl">
          <button className=" outline-none px-3 py-3 rounded-4xl" style={{backgroundColor:"orange"}}
          onClick={()=> setColor("orange")}
          
          >
            orange
          </button>
        </div>

        <div className=" flex flex-wrap justify-center gap-3 shadow-lg bg-white px-2 py-2 rounded-4xl">
          <button className=" outline-none px-3 py-3 rounded-4xl" style={{backgroundColor:"yellow"}}
          onClick={()=> setColor("yellow")}
          
          >
            yellow
          </button>
        </div>

        <div className=" flex flex-wrap justify-center gap-3 shadow-lg bg-white px-2 py-2 rounded-4xl">
          <button className=" outline-none px-3 py-3 rounded-4xl" style={{backgroundColor:"pink"}}
          onClick={()=> setColor("pink")}
          
          >
            pink
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
