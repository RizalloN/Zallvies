/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import Input from "@/components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  useEffect(() => {
    const handleContextMenu = (event: Event) => {
      event.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
    }, []);
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);
  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div
      className="relative h-full w-full bg-[url('/images/hero.jpg')]
    bg-no-repeat bg-center bg-fixed bg-cover"
    >
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div
            className="bg-black bg-opacity-70 px-16 py-16 self-center
          mt-2 lg:w-2/5 lg:max-w-md rounded-lg w-full"
          >
            <h2 className="text-white text-3xl font-semibold">
              <div className="flex items-center justify-center mb-2">
              {variant === "login" ? "Sign in" : "Register"}
              </div>
              <div className="flex flex-col gap-4 mt-3">
                {variant === "register" && (
                  <Input
                    label="Username"
                    onChange={(ev: any) => setName(ev.target.value)}
                    id="name"
                    type="text"
                    value={name}
                  />
                )}
                <Input
                  label="Email"
                  onChange={(ev: any) => setEmail(ev.target.value)}
                  id="email"
                  type="email"
                  value={email}
                />
                <Input
                  label="Password"
                  onChange={(ev: any) => setPassword(ev.target.value)}
                  id="password"
                  type="password"
                  value={password}
                />
              </div>
              <button
                onClick={variant === "login" ? login : register}
                className="bg-red-600 py-3 text-white rounded-md w-full mt-5 hover:bg-red-700 transition"
              >
                {variant === "login" ? "Login" : "Sign up"}
              </button>
              <div className="flex flex-row items-center gap-4 mt-4 justify-center">
                <div
                  onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                  className="
                w-10
                h-10
                bg-white
                rounded-full
                flex
                items-center
                justify center
                cursor-pointer
                hover:opacity-80
                transition"
                >
                  <FcGoogle className="ml-1" size={30} />
                </div>
                <div
                  onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                  className="
                w-10
                h-10
                bg-black
                rounded-full
                flex
                items-center
                justify center
                cursor-pointer
                hover:opacity-80
                transition"
                >
                  <FaGithub className="ml-1" size={30} />
                </div>
              </div>
              <p className="text-neutral-500 mt-6 text-sm">
                {variant === "login"
                  ? "First time using Zallvies?"
                  : "Already Have an account?"}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant === "login" ? " Create an Account" : " Login"}
                </span>
              </p>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
