import Container from '../components/global/Container'
import LoginForm from '../components/forms/LoginForm'

export default function NewEntryPage() {
  return (
    <>
      {/* <Nav title="Login" /> */}
      <Container className="w-full lg:w-2/4">
        <LoginForm />
      </Container>
    </>
  )
}
