//modules
import React from "react";
//components
import Summary from "../common/summary/summary.component";
import Post from "../post/post.component";
import LightShadow from "../../general/lightShadow/lightShadow.component";

class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.newPostSectionHeight = React.createRef();
    this.summaryCursorMove = React.createRef();
    this.state = {
      postHeight: 0,
      newPostTitleContStyle: {}
    };
  }

  componentDidMount() {
    // const newPostSectionH = this.newPostSectionHeight.current.clientHeight;
    // const newPostaddingTop = (newPostSectionH - this.state.postHeight) / 2;
    // console.log("newPostSectionH", newPostSectionH);
    // console.log("this.state.postHeight", this.state.postHeight);
    // console.log("newPostaddingTop", newPostaddingTop);
    // if (this.props.offset) {
    //   this.setState({
    //     newPostTitleContStyle: {
    //       paddingTop: `${newPostaddingTop}px`
    //     }
    //   });
    // }
  }

  changeHeight = height => {
    this.setState({ postHeight: height });
  };
  render() {
    const newPostJSX = this.props.newPost.map((newPostArrayContent, i) => {
      return (
        <Post
          postHeight={h => {
            this.changeHeight(h);
          }}
          key={i}
          postImage={newPostArrayContent.articleProps.image}
          postTitle={newPostArrayContent.articleProps.title}
          widthHeightRatio={newPostArrayContent.articleProps.widthHeightRatio}
        />
      );
    });

    const newPostSummaryJSX = this.props.newPost.map(
      (newPostArrayContent, i) => {
        return (
          <LightShadow key={i} factor={5}>
            <div ref={this.summaryCursorMove}>
              <Summary
                className="newPostSummarySection"
                key={i}
                widthHeightRatio="1.640107407407407"
                summary={newPostArrayContent.articleProps.summaryText}
                date={newPostArrayContent.articleProps.date}
                avatar={newPostArrayContent.articleProps.authorAvatar}
                author={newPostArrayContent.articleProps.author}
                categories={newPostArrayContent.articleProps.categories}
                summaryTextHeight={this.state.postHeight}
                summaryText="summaryTextBlogPost"
                hasReadMore={true}
              />
            </div>
          </LightShadow>
        );
      }
    );

    return (
      <div>
        <section
          ref={this.newPostSectionHeight}
          className="newPost grid col-8 col-12-md"
        >
          <div className="fila newPostTitleLayout">
            <div
              className="newPostTitleCont grid "
              style={this.state.newPostTitleContStyle}
            >
              {newPostJSX}
            </div>
            <div
              style={this.state.newPostTitleContStyle}
              className="newPostSummaryCont  grid"
            >
              {newPostSummaryJSX}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default NewPost;
