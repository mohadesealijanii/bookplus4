"use client"

import React, { useRef, useState } from "react"

export default function ForgetPage() {
  const [otp, setOtp] = useState(Array(4).fill("")) // Array with 6 empty strings
  const inputRefs = useRef([]) // Array of refs for each input field

  const handleKeyDown = (e) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault()
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputRefs.current.indexOf(e.target)
      if (index > 0) {
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index - 1),
          "",
          ...prevOtp.slice(index),
        ])
        inputRefs.current[index - 1].focus()
      }
    }
  }

  const handleOtp = () => {}

  const handleInput = (e) => {
    const { target } = e
    const index = inputRefs.current.indexOf(target)
    if (target.value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ])
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus()
      }
    }
  }

  const handleFocus = (e) => {
    e.target.select()
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text")
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return
    }
    const digits = text.split("")
    setOtp(digits)
  }

  return (


return (
    <div className={sans.className}>
      <div className="flex min-h-screen justify-center items-center mt-10">
        <div className="md:flex sm:flex lg:w-auto md:w-auto w-full rounded-3xl shadow-lg bg-white">
          <div className="p-3 md:w-96 mx-auto">
            <form
              onSubmit={handleOtp}
              className="flex flex-col justify-center"
            >
              <div className="flex justify-center">
                <Image src={logo} alt="logo" className="w-11 h-auto" />
              </div>
              <h3 className="font-bold mt-10 mb-5 text-center">
                welcome back!
              </h3>
              <div className="flex flex-col">

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





    <section className="bg-white py-10 dark:bg-dark">
      <div className="container">
        <form id="otp-form" className="flex gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onPaste={handlePaste}
              ref={(el) => (inputRefs.current[index] = el)}
              className="shadow-xs flex w-[64px] items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl dark:border-dark-3 dark:bg-white/5"
            />
          ))}
          {/* You can conditionally render a submit button here based on otp length */}
        </form>
      </div>
    </section>
  )
}
