import React, { useEffect, useState } from 'react'

const Github = () => {
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch("https://api.github.com/users/dibyendu-dev")
        .then(response => response.json())
        .then(data => setData(data))
    },[])
  return (
    <div className=' text-center m4 bg-gray-600 text-white p-4 text-3xl'>
        Github Following: {data.following}
        <img className=' flex justify-center items-center ' src={data.avatar_url} alt="git_pic" width={300}/>
        </div>
  )
}

export default Github