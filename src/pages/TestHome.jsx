import React from 'react'

function TestHome() {
  return (
    <div style={{
      backgroundColor: 'red',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <h1 style={{
        color: 'white',
        fontSize: '3rem',
        fontWeight: 'bold'
      }}>
        TEST - If you see this, React is working!
      </h1>
    </div>
  )
}

export default TestHome
