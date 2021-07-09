import Container from '../components/global/Container'
import UserEntryForm from '../components/forms/UserEntryForm'

export default function NewUserPage() {
  return (
    <>
      <Container className="w-full lg:w-2/4">
        <UserEntryForm />
      </Container>
    </>
  )
}