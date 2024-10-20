import Form from "./Login/Form";
import Welcome from "./Login/Welcome";

const Login = () => {
  return (
    <div className='flex w-full h-screen justify-between gap-5 overflow-hidden'>
      <Form />
      <Welcome />
    </div>
  )
}

export default Login;