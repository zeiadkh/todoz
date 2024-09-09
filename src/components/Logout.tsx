import { Button } from '@mui/material'
import { Logout as LogoutAction} from '../store/actions/authAction'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const Logout = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(LogoutAction())
  }, [])
  return (
    <Button>Logout</Button>
  )
}

export default Logout