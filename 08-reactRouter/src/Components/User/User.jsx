
import { useParams } from 'react-router-dom'

const User = () => {
    const {id} = useParams()
  return (
    <div className=' bg-gray-400 text-white text-3xl text-center p-4'>User: {id}</div>
  )
}

export default User