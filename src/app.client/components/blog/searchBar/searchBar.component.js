import React from 'react'
import styled from 'styled-components'
//css
import './searchBar.css'
import {connect} from 'react-redux'

const SearchBarCont = styled.div`
  border: ${props =>
    props.isFocus ? '1px #0387b7 solid' : '1px transparent solid'};
  @media (max-width: 700px) {
    border: 1px #0387b7 solid;
  }
  border-radius: 10px;
  padding: 0px 5px;
  overflow: hidden;
`

const Bar = styled.div`
  transform: ${props =>
    !props.isFocus ? 'translateX(70%)' : 'translateX(0%)'};
  @media (max-width: 700px) {
    transform: translateX(0%);
  }
`

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocus: false
    }
  }

  searchHandler = e => {
    const {value} = e.target
    this.props.setSearchValue(value)
    if (value === '') {
      this.props.onReset()
    }
  }

  keyCapture = e => {
    //enter
    const {keyCode} = e

    if (keyCode === 13) {
      this.props.onSearch(this.props.blog.searchValue)
      return
    }
    if (keyCode === 8 && this.props.blog.searchValue === '') {
      //backspace
      console.log('reset ')
      this.props.onReset()
    }
  }

  onFocus = () => {
    if (this.props.blog.searchValue) {
      this.setState({isFocus: true})
      return
    }
    this.setState(prevState => {
      return {isFocus: !prevState.isFocus}
    })
  }

  render() {
    return (
      <SearchBarCont
        onFocus={this.onFocus}
        onBlur={this.onFocus}
        onKeyUp={this.keyCapture}
        className={this.props.className}
        isFocus={this.state.isFocus}
      >
        <Bar className='searchBar' isFocus={this.state.isFocus}>
          <svg viewBox='0 0 37 36' fill='none'>
            <line
              x1='24.6833'
              y1='22.5301'
              x2='34.627'
              y2='32.4738'
              stroke='#6abad7'
              strokeWidth='5'
            />
            <circle
              cx='18.6066'
              cy='18'
              r='10'
              transform='rotate(-45 18.6066 18)'
              stroke='#6abad7'
              strokeWidth='5'
            />
          </svg>
          <input
            type='search'
            placeholder='Search'
            value={this.props.blog.searchValue}
            onChange={this.searchHandler}
          />
          <span onClick={this.props.onAdvancedClick}>Advanced</span>
        </Bar>
      </SearchBarCont>
    )
  }
}

const mapActionsToProps = dispatch => {
  return {
    setSearchValue: value =>
      dispatch({type: 'SET_SEARCH_VALUE', payload: value})
  }
}

const mapStateToProps = state => {
  return {
    blog: state.blog
  }
}

export default connect(mapStateToProps, mapActionsToProps)(SearchBar)
