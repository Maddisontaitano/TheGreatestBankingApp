import Nav from '../components/Nav'
import Container from '../components/Container'
import EntryForm from '../components/EntryForm'

export default function NewEntryPage() {
  return (
    <>
      <Nav title="New" />
      <Container className="w-full lg:w-2/4">
        <EntryForm />
      </Container>
    </>
  )
}
