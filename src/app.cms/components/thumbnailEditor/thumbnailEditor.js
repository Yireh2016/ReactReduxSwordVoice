import React, { Component } from "react";
import Post from "../post/post.component";
import { connect } from "react-redux";
//components
import UploadImage from "../uploadImage/uploadImage";
import compressImage from "../../../services/compressImage";

class ThumbNailEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isImageUploaded: false,
      imagePreview: undefined,
      uploadMessage: "Upload Thunbnail",
      imgW: 200,
      imgQuality: 0.6,
      imageFile: null,
      compressedImg: null
    };
  }

  imageUploadErr = err => {
    this.setState(() => {
      return {
        imagePreview: undefined,
        uploadMessage: `${err}`
      };
    });
  };

  imageUpload = image => {
    console.log("imgupload ", image);
    this.setState(() => {
      return {
        imagePreview: `url(${URL.createObjectURL(image)})`,
        uploadMessage: undefined,
        isImageUploaded: true,
        compressedImg: image
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
    compressImage(
      this.state.imageFile,
      this.state.imgQuality,
      value,
      this.imageUpload,
      this.imageUploadErr
    );
  };
  render() {
    return (
      <div
        className="style-7"
        style={{
          width: "60%",
          overflowY: "scroll",
          padding: "20px",
          boxSizing: "border-box"
        }}
      >
        {true && (
          <React.Fragment>
            <div>
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
              >
                {/* <div>
                  {this.state.compressedImg &&
                    "File Size: " + this.state.compressedImg.size}
                </div> */}
              </UploadImage>
            </div>
          </React.Fragment>
        )}

        {true && (
          <Post
            postTitle={this.props.seo.title}
            widthHeightRatio={1.07}
            hasBorder={true}
            hasThreeDots={false}
            postImage={this.state.imagePreview}
          />
        )}
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
    // onCreateElement: id => dispach({ type: "CREATE_ELEMENT", id: id }),
    // onAddElement: payload => dispach({ type: "ADD_ELEMENT", payload: payload }),
    // onEditElement: payload =>
    //   dispach({ type: "EDIT_ELEMENT", payload: payload }),
    // onDelElement: payload => dispach({ type: "DEL_ELEMENT", payload: payload }),
    // onSummaryEdition: payload =>
    //   dispach({ type: "SUMMARY_EDITION", payload: payload }),
    // onAddDeleteFile: payload =>
    //   dispach({ type: "ADD_DELETE_FILE", payload: payload }),
    // onDateEdition: payload =>
    //   dispach({ type: "DATE_EDITION", payload: payload }),
    // onSave: () => dispach({ type: "SAVE_POST" }),
    // onProjectChange: () => dispach({ type: "CHANGE_PROJECT" })
  };
};

// const CreatePost2 = withRouter(CreatePost);

export default connect(
  mapStateToProps,
  mapDispachToProps
)(ThumbNailEditor);
