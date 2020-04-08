const React = require('react')
const useState = React.useState
const useEffect = React.useEffect
const SwordVoice = require('./SwordVoice.jsx')

require('./hello.css')

/* the main page for the index route of this app */
const HelloWorld = () => {
  const [showSwordVoice, setShowSwordVoice] = useState(true)
  const [signHeight, setSignHeight] = useState(null)

  useEffect(() => {
    setSignHeight(signRef.current.clientHeight)
  }, [signHeight])

  const signRef = React.createRef()

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        background: 'coral',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          color: 'white',
          textAlign: 'center'
        }}
      >
        <h1>Hello Auth0 Here Some SVG Animation!</h1>
        <h2>Contact me: Jainer.Calvetti@gmail.com</h2>
      </div>

      <button
        className='againBtn'
        style={{
          color: ' white',
          background: ' #4a4a7f',
          margin: ' 20px',
          border: ' none',
          padding: ' 10px 15px',
          borderRadius: ' 5px',
          fontSize: ' 24px'
        }}
        onClick={() => {
          setShowSwordVoice(false)
          setTimeout(() => {
            setShowSwordVoice(true)
          }, 500)
        }}
      >
        Again!
      </button>

      <div
        ref={signRef}
        style={{
          width: '80%',
          height: signHeight ? `${signHeight}px` : 'auto'
        }}
      >
        {showSwordVoice && <SwordVoice delay={1} />}
      </div>
    </div>
  )
}

module.exports = HelloWorld
