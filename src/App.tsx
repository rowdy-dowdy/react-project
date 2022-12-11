import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import ThreeCanvas from './components/three'
import './index.css'

function App() {
  const [show, setShow] = useState(true)

  const handleClick = (e: React.MouseEvent) => {
    setShow(!show)
  }

  return (
    <div className="">
      { show ? 
        <ThreeCanvas /> 
      : null }
      <button onClick={handleClick}>{show ? 'Hide' : 'Show'}</button>
    </div>
  )
}

export default App
