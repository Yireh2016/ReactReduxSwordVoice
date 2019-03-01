import React, { Component } from "react";
// import Compressor from "compressorjs";
import { connect } from "react-redux";
//components
import ElementCustomEdit from "../elementCustomEdit/elementCustomEdit";
//services
import isBrowser from "../../../services/isBrowser";
import UploadImage from "../uploadImage/uploadImage";
import compressImage from "../../../services/compressImage";

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
      imagePreview: undefined,
      uploadMessage: "Upload Image",
      imgW: 200,
      imgQuality: 0.6,
      imageFile: null,
      compressedImg: null
    };
  }
  imgWidthHandler = e => {
    const value = e.target.value;
    compressImage(
      this.state.imageFile,
      this.state.imgQuality,
      value,
      this.imageUpload,
      this.imageUploadErr
    );
  };
  qualityHandler = e => {
    this.props.onProjectChange();

    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
  };

  handleImgUpload = files => {
    this.props.onProjectChange();
    this.setState({ image: files });
  };
  imageUploadErr = err => {
    this.setState(() => {
      return {
        imagePreview: undefined,
        uploadMessage: `${err}`
      };
    });
  };

  imageUpload = image => {
    console.log("image on upload or compressed", image);
    const file = new File([image], image.name);
    this.props.onProjectChange();
    this.setState(() => {
      return {
        imagePreview: `url(${URL.createObjectURL(image)})`,
        uploadMessage: undefined,
        isImageUploaded: true,
        compressedImg: file
      };
    });
    alert("file Uploaded successfully");
  };

  originalImageSaver = image => {
    console.log("originalImageSaver", image);
    this.setState({ imageFile: image });
  };
  imgPropertiesHandler = e => {
    const {
      target: { name, value }
    } = e;

    this.setState({
      [name]: value
    });

    if (name === "imgQuality") {
      compressImage(
        this.state.imageFile,
        value,
        this.state.imgW,
        this.imageUpload,
        this.imageUploadErr
      );
    }
  };
  imgWidthHandler = e => {
    const value = e.target.value;
    console.log("imgWidthHandler", value);
    console.log("imgWidthHandler2", e.target.value);
    compressImage(
      this.state.imageFile,
      this.state.imgQuality,
      value,
      this.imageUpload,
      this.imageUploadErr
    );
  };

  uploadingToServerHandler = () => {
    console.log("this.state.compressedImg");
    if (this.state.compressedImg) {
      const file = [this.state.compressedImg];
      const e = { target: { files: file } };
      this.props.uploadFileHandler(e);
      console.log("this.props.project.name", this.props.project.name);
      console.log("file.name", file[0].name);
      this.props.imgFileSet(
        `uploads/${this.props.project.url}/${file[0].name}`
      );
    }
  };
  render() {
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
          <UploadImage
            imageUpload={this.imageUpload}
            imageUploadErr={this.imageUploadErr}
            imgPropertiesHandler={this.imgPropertiesHandler}
            imgWidthHandler={this.imgWidthHandler}
            originalImageSaver={this.originalImageSaver}
            imagePreview={this.state.imagePreview}
            uploadMessage={this.state.uploadMessage}
            imgQuality={this.state.imgQuality}
            imgW={this.state.imgW}
            compressedImg={this.state.compressedImg}
          />

          <div>
            <ElementCustomEdit
              HTMLAtributes={props.HTMLAtributes}
              HTMLAtributesArr={props.HTMLAtributesArr}
              HTMLAtributesArrRemove={props.HTMLAtributesArrRemove}
              HTMLStyles={props.HTMLStyles}
              HTMLStylesArr={props.HTMLStylesArr}
              HTMLStylesArrRemove={props.HTMLStylesArrRemove}
              HTMLClasses={props.HTMLClasses}
              HTMLClassesArr={props.HTMLClassesArr}
              HTMLClassesArrRemove={props.HTMLClassesArrRemove}
              stylesHTMLHandler={props.stylesHTMLHandler}
              atributesHTMLHandler={props.atributesHTMLHandler}
              classesHTMLHandler={props.classesHTMLHandler}
            />
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
          <div>
            <button onClick={this.uploadingToServerHandler} type="button">
              Upload Image
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    elements: state.postCreation.elements,
    seo: state.postCreation.seo,
    summary: state.postCreation.summary,
    login: state.login,
    project: state.postCreation.project,
    fileNames: state.postCreation.files,
    date: state.postCreation.date,
    postCreation: state.postCreation
  };
};

const mapDispachToProps = dispach => {
  return {
    //acciones

    onProjectChange: () => dispach({ type: "CHANGE_PROJECT" })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(ImageElement);
