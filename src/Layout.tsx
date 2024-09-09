import Navbar from './components/Navbar'

interface Props{
    children: React.ReactNode
}
const Layout:React.FunctionComponent<Props> = (props:Props) => {
  return (
    <>
        <Navbar />
        {props.children}
    </>
  )
}

export default Layout