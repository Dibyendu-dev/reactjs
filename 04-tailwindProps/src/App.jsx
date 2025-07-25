
import './App.css'
import Card from './components/card'

function App() {
 let dd={
  age:29,
  gender:"M"
 }
 let sd={
  age:49,
  gender:"F"
 }

  return (
    <>
    
    <div className=' flex flex-row'>
      <Card name="dibyendu das" birthdate="27th july 1996" bio={dd}/>
      <Card name="sewli das" birthdate="20th april 1977" bio={sd}/>
    </div>
    
    </>
  )
}

export default App
