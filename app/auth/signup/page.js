import Link from "next/link";

export default function Signup() {
  return (
    <div className="flex flex-col space-y-6 px-8 py-24 max-w-sm mx-auto w-full">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <form class="flex flex-col space-y-5">
        <label className="text-sm font-medium">
          Username
          <input name="username" type="text" className="p-2 rounded-md block mt-1.5 font-normal w-full text-base" placeholder="homeless.dev" required />
        </label>
        <label className="text-sm font-medium">
          Password
          <input name="password" type="password" className="p-2 rounded-md block mt-1.5 font-normal w-full text-base" placeholder="complicated-passphrase" required />
        </label>
        <button className="p-2 bg-indigo-600 text-white font-medium rounded-md">
          Create account
        </button>
      </form>
      <p>Already have an account? <Link href="/auth/login" className="text-indigo-600 font-medium">Login</Link></p>
    </div>
  )
}
