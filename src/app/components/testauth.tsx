import { auth } from "@/auth"

export default async function TestAuth() {
  const session = await auth()
  
  return (
    <div>
      <h1>Auth Test</h1>
      {session ? (
        <div>
          <p>Signed in as: {session.user?.email}</p>
          <p>User ID: {session.user?.id}</p>
          <p>Session: {JSON.stringify(session, null, 2)}</p>
        </div>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  )
}