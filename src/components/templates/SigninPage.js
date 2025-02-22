"use client"

import { sans } from "@/utils/fonts"
import Image from "next/image"
import logo from "../../../public/pics/logo.png"
import Link from "next/link"
import { useState } from "react"
import study from "../../../public/pics/study.png"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Loader from "../module/Loader"
import { PropagateLoader } from "react-spinners"
// import config from "@/constants/config"

function SigninPage() {
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    // setError("")

    try {
      setLoading(true)
      const res = await fetch(
        "https://stg-core.bpapp.net/api/Member/AdminLogin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
            rememberMe: true,
            confirmed: true,
          }),
        }
      )
      const data = await res.json()
      setLoading(false)

      console.log(res)

      if (!data.token) {
        setPassword("")
        setUsername("")
        throw new Error("no users found")
      }

      document.cookie = `token=${data.token}; path=/; Secure; HttpOnly; SameSite=Strict`

      toast.success("you logged in successfully")
      router.push("/dashboard")
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    }
  }

  return (
    <div className={sans.className}>
      <div className="flex min-h-screen justify-center items-center mt-10">
        <div className="md:flex sm:flex lg:w-auto md:w-auto w-full rounded-3xl shadow-lg bg-white">
          <Image
            src={study}
            alt="study"
            height={450}
            className="rounded-l-3xl hidden md:block sm:block lg:block"
          />
          <div className="p-3 md:w-96 mx-auto">
            <form
              onSubmit={handleLogin}
              className="flex flex-col justify-center"
            >
              <div className="flex justify-center">
                <Image src={logo} alt="logo" className="w-11 h-auto" />
              </div>
              <h3 className="font-bold mt-10 mb-5 text-center">
                welcome back!
              </h3>
              <div className="flex flex-col">
                <input
                  placeholder="phone or email"
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  value={username}
                  className="text-xs w-full text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-xl outline-ocean mb-2"
                  required
                />
                <div>
                  <input
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                    className="text-xs w-full text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-xl outline-ocean"
                    required
                  />
                </div>
              </div>
              <Link
                href={"/forgetPassword"}
                className="text-ocean mt-3 text-sm pl-1 mb-5"
              >
                Forgot password?
              </Link>

              <button
                type="submit"
                className="bg-ocean rounded-xl py-3 text-white mt-9 mb-3 text-sm"
              >
                {loading ? (
                  <p>
                    <PropagateLoader
                      color="white"
                      className="content-center -mt-2"
                    />
                  </p>
                ) : (
                  <p>sign in</p>
                )}
              </button>
              <div className="flex">
                <p className="text-sm">Don&apos;t you have an account?</p>
                <Link
                  href={"/signup"}
                  className="text-ocean underline text-sm pl-1"
                >
                  sign up
                </Link>
              </div>
            </form>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SigninPage
