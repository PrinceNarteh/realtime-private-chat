'use client'

import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const ANIMALS = ["lion", "bear", "elephant", "giraffe", "penguin", "kangaroo", "dolphin", "zebra", "cheetah", "ostrich", "chimpanzee"];
const STORAGE_KEY = "chat_username"

const generateUsername = () => {
  const username = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]
  return `anonymous-${username}-${nanoid(5)}`
}

export default function Home() {
  const [username, setUsername] = useState("")


  useEffect(() => {
    const main = () => {
      const storedUsername = localStorage.getItem(STORAGE_KEY)
      if (storedUsername) {
        setUsername(storedUsername)
        return
      }

      const generatedUsername = generateUsername()
      localStorage.setItem(STORAGE_KEY, generatedUsername)
      setUsername(generatedUsername)
    }

    main()
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="" className="flex items-center text-zinc-500">Your Identity</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-zinc-950 border-zinc-800 p-3 text-sm text-zinc-400 font-mono">
                  {username}
                </div>
              </div>
            </div>
            <button className="w-full bg-zinc-100 text-black p-3 text-sm font-bold cursor-pointer hover:bg-zinc-50 hover:text-black transition-colors mt-2 disabled:opacity-50">
              CREATE SECURE ROOM
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
