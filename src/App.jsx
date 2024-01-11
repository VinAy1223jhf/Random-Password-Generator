import { useState, useCallback, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "poiuytrewqasdfghjklmnbvcxzPOIUYTREWQASDFGHJKLMNBVCXZ";

    if (numbersAllowed) {
      str += "0123456789"
    }
    if (charactersAllowed) {
      str += "!@#$%^&*"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass);

  }, [length, numbersAllowed, charactersAllowed, setPassword])

  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, charactersAllowed, passwordGenerator])



  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-500'>Password Generator
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
          />
          <button id='btn' onClick={() => { navigator.clipboard.writeText(password) }} className="bg-blue-500 text-white py-1 px-3 rounded-l-none rounded-r">COPY</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numbersAllowed}
              id='numberInput'
              onChange={() => setNumbersAllowed(!numbersAllowed)}
            />
            <label htmlFor="numberInput">Numbers</label>
            <input
              type='checkbox'
              defaultChecked={charactersAllowed}
              id='characterInput'
              onChange={() => setCharactersAllowed(!charactersAllowed)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
