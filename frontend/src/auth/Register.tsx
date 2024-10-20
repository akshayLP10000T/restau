import Form from "./Register/Form"
import Welcome from "./Register/Welcome"

const Register = () => {
  return (
    <div className='flex w-full h-screen justify-between gap-5 overflow-hidden'>
      <Welcome />
      <Form />
    </div>
  )
}

export default Register