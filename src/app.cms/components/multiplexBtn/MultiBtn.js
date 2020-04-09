import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: inline-block;
`

const Container = styled.div`
  min-width: 90px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.8rem;
  box-sizing: border-box;
  background: #00171f;
  border: 1px solid coral;
  color: #fff;
  transition: all ease 300ms;

  :hover {
    background: #fff;
    color: #00171f;
  }

  :hover #arrow {
    border-top: 10px solid #00171f;
  }

  /* justify-content: center; */
`
const DropDown = styled.div`
  top: 37px;
  left: 0;

  border-radius: 8px;

  box-sizing: border-box;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;

  span {
    margin-top: 5px;
  }
  span:hover {
    color: coral;
  }
`

const Layout = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
`
const Selector = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
  flex-grow: 10;
`
const Button = styled.div`
  position: relative;
  padding: 5px 10px;
  text-align: center;
  flex-grow: 90;
`
const Arrow = styled.div`
  transition: all ease 300ms;
  border-top: 10px solid white;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
`

const MapOption = styled.span`
  border: 1px solid coral;
  border-radius: 8px;
  padding: 10px 15px;
  box-sizing: border-box;
  font-size: 0.8rem;
  font-weight: bold;
  width: 100%;

  :hover {
    cursor: pointer;
  }
`

const MultiBtn = ({options, clickHandler}) => {
  //state declaration
  const [option, setOption] = useState(options[0])
  const [showDropDown, setShowDropDown] = useState(false)

  useEffect(() => {
    setShowDropDown(false)
    setOption(options[0])
  }, [options])

  //handlers

  const dropOtionHandler = value => {
    clickHandler(value)
    setOption(value)
    setShowDropDown(false)
  }

  //maps
  const mapOptions = options.map(optionEl => {
    return (
      <MapOption
        key={optionEl}
        onClick={() => {
          dropOtionHandler(optionEl)
        }}
      >
        {optionEl}
      </MapOption>
    )
  })

  //render
  return (
    <Wrapper>
      <Container id='Container'>
        <Layout id='Layout' className='btn'>
          <Button
            id='Button'
            onClick={() => {
              clickHandler(option)
            }}
          >
            {option}
          </Button>
          <Selector id='Selector'>
            <Arrow
              id='arrow'
              onClick={() => {
                setShowDropDown(!showDropDown)
              }}
            />
          </Selector>
        </Layout>
      </Container>

      {showDropDown && <DropDown id='dropDown'>{mapOptions}</DropDown>}
    </Wrapper>
  )
}

export default MultiBtn
