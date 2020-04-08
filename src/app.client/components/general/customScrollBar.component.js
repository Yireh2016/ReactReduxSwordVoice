import React from 'react'
import {Scrollbars} from 'react-custom-scrollbars'

export default class CustomScrollBar extends React.Component {
  render() {
    return (
      <Scrollbars
        className={this.props.className}
        style={this.props.style}
        onScroll={this.props.onScroll}
        renderView={props => <div {...props} />}
      >
        {this.props.children}
      </Scrollbars>
    )
  }
}
