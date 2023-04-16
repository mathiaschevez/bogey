import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { api } from '~/utils/api'

export function Layout({ children }: { children: JSX.Element }) {
  const { data: sessionData } = useSession()
  console.log(sessionData)

  return (
    sessionData?.user ? 
      <div className='flex flex-col'>
        <Navbar />
        {children}
        <Footer />
      </div> :
       <div className="flex flex-col items-center justify-center gap-12 px-4 py-16 bg-[#f4e6d9] w-full min-h-screen">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className='text-black'>Bogey</span> Blaine
        </h1>
        <div className="flex flex-col items-center gap-2">
          <AuthShowcase />
        </div>
      </div>
  )
}

export default Layout

function Navbar() {
  return (
    <div className='flex justify-between w-full p-3 items-center bg-[#f4e6d9]'>
      <h1 className='font-bold'>Logo</h1>
      <button
        className="rounded-full bg-black px-6 py-1.5 font-semibold text-white no-underline transition hover:bg-black/80"
        onClick={() => void signOut()}
      >Sign out</button>
    </div>
  )
}


function Footer() {
  return (
    <div>Footer</div>
  )
}

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-black px-10 py-3 font-semibold text-white no-underline transition hover:bg-black/80"
        onClick={() => void signIn()}
      >Sign in</button>
    </div>
  );
};
