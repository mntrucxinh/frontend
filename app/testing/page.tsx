import { auth, signIn, signOut } from '@/auth'

export default async function SignIn() {
  const session = await auth()
  console.log('Session:', session)
  const user = session?.user

  return user ? (
    <>
      <h1>Welcome {user.name}</h1>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <button type='submit'>Sign Out</button>
      </form>
    </>
  ) : (
    <>
      <h1>Not Authorize</h1>
      <form
        action={async () => {
          'use server'
          await signIn('google')
        }}
      >
        <button type='submit'>Signin with Google</button>
      </form>
    </>
  )
}
