import Entry from './Entry'

function Entries({ entries }) {
  if (entries) {
    // console.log(entries)
    return (
      <div>
        {entries.map((e) => (
          <div key={e.id} className="py-2">
            <Entry id={e.id} title={e.title} content={e.content} />
          </div>
        ))}

        {/* <h1>Hello Entries</h1> */}
      </div>
    )
  } else {
    return null
  }
}

export default Entries
