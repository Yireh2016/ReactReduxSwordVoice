//modules
import React from 'react'
//components
import Summary2 from '../common/summary/summary2.component'
import Post from '../post/post.component'

class NewPost extends React.Component {
  constructor(props) {
    super(props)

    this.newPostSectionHeight = React.createRef()
    this.summaryCursorMove = React.createRef()
    this.state = {
      postHeight: 0,
      newPostTitleContStyle: {},
      device: ''
    }
  }
  componentDidMount() {
    if (window.innerWidth > 1050) {
      //PC
      this.setState({device: 'pc'})
      return
    }

    if (window.innerWidth > 750) {
      //tablet
      this.setState({
        device: 'tablet',
        summaryW: window.innerWidth,
        summaryH: window.innerWidth * 0.6
      })
      return
    }
    //movil
    this.setState({
      device: 'movil',
      summaryW: window.innerWidth,
      summaryH: window.innerWidth * 0.888
    })
  }

  changeHeight = height => {
    this.setState({postHeight: height})
  }
  render() {
    const newPostJSX = this.props.newPost.map((newPostArrayContent, i) => {
      return (
        <Post
          hasThreeDots={false}
          postHeight={h => {
            this.changeHeight(h)
          }}
          key={i}
          postImage={newPostArrayContent.articleProps.image}
          postTitle={newPostArrayContent.articleProps.title}
          widthHeightRatio={0.8}
        />
      )
    })

    const newPostSummaryJSX = this.props.newPost.map(
      (newPostArrayContent, i) => {
        if (this.state.device === 'pc') {
          return (
            <div ref={this.summaryCursorMove} key={i}>
              <Summary2
                textHTML={newPostArrayContent.articleProps.summaryText}
                date={newPostArrayContent.articleProps.date}
                avatar={newPostArrayContent.articleProps.authorAvatar}
                author={newPostArrayContent.articleProps.author}
                url={newPostArrayContent.articleProps.url}
                keywords={newPostArrayContent.articleProps.categories}
                width={this.state.postHeight * 0.66}
                height={this.state.postHeight}
              />
            </div>
            // </LightShadow>
          )
        } else {
          return (
            <Summary2
              key={i}
              textHTML={newPostArrayContent.articleProps.summaryText}
              date={newPostArrayContent.articleProps.date}
              avatar={newPostArrayContent.articleProps.authorAvatar}
              author={newPostArrayContent.articleProps.author}
              url={newPostArrayContent.articleProps.url}
              keywords={newPostArrayContent.articleProps.categories}
              width={this.state.summaryW}
              height={this.state.summaryH}
            />
          )
        }
      }
    )

    return (
      <div>
        <section
          ref={this.newPostSectionHeight}
          className='newPost grid col-8 col-12-md'
        >
          <div className='fila newPostTitleLayout'>
            <div
              className='newPostTitleCont grid '
              style={this.state.newPostTitleContStyle}
            >
              {newPostJSX}
            </div>
            {/* <LightShadow factor={5}> */}
            <div
              style={this.state.newPostTitleContStyle}
              className='newPostSummaryCont  grid'
            >
              {newPostSummaryJSX}
            </div>
            {/* </LightShadow> */}
          </div>
        </section>
      </div>
    )
  }
}

export default NewPost
