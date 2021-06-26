import Container from '../../../components/Container'
import Nav from '../../../components/Nav'
import EditEntryForm from '../../../components/EditEntryForm'

export default function EditEntryPage() {
  return (
    <>
      <Nav title="Edit" />
      <Container>
        <EditEntryForm />
      </Container>
    </>
  )
}
