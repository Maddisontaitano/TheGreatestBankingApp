import Nav from '../components/Nav'
import Container from '../components/Container'
import LoginForm from '../components/LoginForm'

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
