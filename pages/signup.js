import Nav from '../components/Nav'
import Container from '../components/Container'
import UserEntryForm from '../components/UserEntryForm'

export default function NewUserPage() {
  return (
    <>
      {/* <Nav title="New User" /> */}
      <Container className="w-full lg:w-2/4">
        <UserEntryForm />
      </Container>
    </>
  )
}