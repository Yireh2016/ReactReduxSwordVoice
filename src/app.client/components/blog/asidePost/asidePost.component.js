//modules
import React from 'react'
import 'simplebar' // or "import SimpleBar from 'simplebar';" if you want to use it manually.

//css
import './asidePost.css'

const AsidePost = props => {
  return (
    <aside className='popPostSection'>
      <h2>{props.asideTitle}</h2>
      <div className='popPostLayoutCont' onScroll={props.onScroll}>
        <div
          className='popPostContainer'
          style={{
            height:
              props.device === 'pc'
                ? 'calc(' + props.postSectionHeight + ' - 80px)'
                : '',
            width: props.device === 'pc' ? 'inherit' : props.postContWidth
          }}
        >
          <div data-simplebar>
            <div className='popPostScroll' onScroll={props.onScroll}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default AsidePost
