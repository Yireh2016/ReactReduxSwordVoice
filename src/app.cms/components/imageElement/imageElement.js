import React, { Component } from "react";
import Compressor from "compressorjs";
//services
import isBrowser from "../../../services/isBrowser";

//react map
/*

DashBoard
  CreatePost (container)
    PostElement (preview and control)
      Header (Header element)

*/

class ImageElement extends Component {
  constructor(props) {
    super(props);
    isBrowser;
    this.state = {
      quality: 0.8,
      image: []
    };
  }
  qualityHandler = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
  };
  imageUpload = image => {
    // this.setState(() => {
    //   return {
    //     userAvatar: image,
    //     userAvatarPreview: `url(${URL.createObjectURL(image)})`,
    //     uploadMessage: undefined
    //   };
    // });

    this.props.imgFileSet(image);
    alert("file Uploaded successfully");
  };

  handleImgUpload = files => {
    this.setState({ image: files });
  };

  compressImageHandler = () => {
    let Uploadfunction = this.imageUpload;
    const browser = isBrowser();
    const shouldCompress =
      browser === "ie" || browser === "edge" ? false : true;
    // const shouldCompress = false;

    if (shouldCompress) {
      new Compressor(this.state.image[0], {
        quality: this.state.quality,
        mimeType: "jpg",
        convertSize: 200000,
        success(result) {
          Uploadfunction(result);
        },
        error(err) {
          console.log("error", err);

          return;
        }
      });
    } else {
      Uploadfunction(this.state.image[0]);
    }
  };

  render() {
    const atributes = this.props.HTMLAtributesArr.map((atribute, i) => {
      return <li key={i}>{atribute}</li>;
    });

    const styles = this.props.HTMLStylesArr.map((style, i) => {
      return <li key={i}>{style}</li>;
    });
    const classes = this.props.HTMLClassesArr.map((clase, i) => {
      return <li key={i}>{clase}</li>;
    });
    return (
      <div>
        <div>
          {/* <input
          type="text"
          onChange={e => {
            this.props.inputTextHTMLHandler(e);
          }}
          name="HTMLElementContent"
          value={this.props.HTMLElementContent}
        /> */}
          <input
            type="file"
            name="image"
            onChange={e => {
              this.handleImgUpload(e.target.files);
            }}
            accept="image/*"
          />
        </div>
        <button onClick={this.compressImageHandler}>Process</button>
        <div>
          Quality:
          <input
            type="number"
            name="quality"
            min="0"
            max="1"
            step=".2"
            value={this.state.quality}
            onChange={this.qualityHandler}
          />
        </div>
        <div className="elementAtributes">
          Atributes
          <div>
            <input
              type="text"
              name="HTMLAtributes"
              value={this.props.HTMLAtributes}
              onChange={e => this.props.atributesHTMLHandler(e)}
            />
            <ul>{atributes}</ul>
          </div>
        </div>
        <div className="elementStyles">
          Styles
          <div>
            <input
              type="text"
              name="HTMLStyles"
              value={this.props.HTMLStyles}
              onChange={e => this.props.stylesHTMLHandler(e)}
            />
            <ul>{styles}</ul>
          </div>
        </div>
        <div className="elementClasses">
          Classes
          <div>
            <input
              type="text"
              name="HTMLClasses"
              value={this.props.HTMLClasses}
              onChange={e => this.props.classesHTMLHandler(e)}
            />
            <ul>{classes}</ul>
          </div>
        </div>

        <div className="elementClasses">
          Alt
          <div>
            <input
              type="text"
              name="imgAlt"
              value={this.props.imgAlt}
              onChange={e => this.props.atrImgHTMLHandler(e)}
            />
          </div>
        </div>

        <div className="elementClasses">
          FigCaption
          <div>
            <input
              type="text"
              name="imgFigcaption"
              value={this.props.imgFigcaption}
              onChange={e => this.props.atrImgHTMLHandler(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ImageElement;
