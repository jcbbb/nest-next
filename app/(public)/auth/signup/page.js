"use client";
import Link from "next/link";
import { gql, useMutation } from "@apollo/client"
import { useRouter } from "next/navigation";

const SIGNUP = gql`mutation Signup($username: String!, $password: String!) {
  signup(authInput: {
      username: $username,
      password: $password
    }
  ) {
    access_token
  }
}`

export default function Signup() {
  const [signup, { error, loading }] = useMutation(SIGNUP);
  const router = useRouter();

  function onSignup(e) {
    e.preventDefault();
    const variables = Object.fromEntries(new FormData(e.target))
    signup({
      variables, onCompleted: ({ signup }) => {
        localStorage.setItem("access_token", signup.access_token);
        router.push("/")
      }
    });
  }

  return (
    <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className="text-2xl font-semibold text-gray-900 leading-6">Create account</h1>
      {error ? (
        <ul class="mt-10">
          {error.graphQLErrors.map(({ message }, i) => (
            <li key={i} className="inline-flex items-center rounded-md bg-red-50 p-2 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/10 w-full">{message}</li>
          ))}
        </ul>
      ) : null}
      <form onSubmit={onSignup} className="space-y-6 mt-10" action="#" method="POST">
        <div>
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div className="mt-2">
            <input disabled={loading} id="username" name="username" placeholder="homeless.dev" type="text" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="mt-2">
            <input disabled={loading} id="password" name="password" placeholder="complicated-passphrase" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
          </div>
        </div>

        <div>
          <button disabled={loading} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group disabled:opacity-70 disabled:pointer-events-none">
            <span className="group-disabled:hidden">
              Create account
            </span>
            <span className="hidden group-disabled:inline">
              Creating account...
            </span>
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already have an account? <Link href="/auth/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</Link>
      </p>
    </div>
  )
}
