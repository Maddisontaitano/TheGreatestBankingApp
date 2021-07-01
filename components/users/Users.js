// How you render it then happens in a component(s)

import User from './User'

function Users({ users }) {
  if (users) {
    return (
      <div>
        {users.map((e) => (
          <div key={e.userId} className="py-2">
            <User id={e.userId} fname={e.fname} lname={e.lname} email={e.email} />
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default Users
