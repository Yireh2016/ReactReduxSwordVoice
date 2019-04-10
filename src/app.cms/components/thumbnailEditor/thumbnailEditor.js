import React, { Component } from "react";
import { SketchPicker } from "react-color";
import { connect } from "react-redux";
//components
import UploadImage from "../uploadImage/uploadImage";
import compressImage from "../../../services/compressImage";
import uploadFileService from "../../../services/uploadFileService";
import PostCard from "../../../app.client/pages/blog/postCard/PostCard";

class ThumbNailEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isImageUploaded: false,
      imagePreview: this.props.thumbnail
        ? `url(/uploads/${this.props.project.url}/${this.props.thumbnail.name})`
        : null,
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
    image.name = "thumb-" + image.name;

    this.props.onProjectChange();
    this.props.onThumbnailChange(image);

    this.setState(() => {
      return {
        imagePreview: `url(${URL.createObjectURL(image)})`,
        isImageUploaded: true,
        compressedImg: image
      };
    });
    alert("file Uploaded successfully");
  };

  uploadingToServerHandler = () => {
    const file = new File(
      [this.state.compressedImg],
      this.props.thumbnail.name
    );
    // const file = this.state.compressedImg;
    const dataToUploadFromFile = {
      file: file,
      name: this.props.thumbnail.name,
      url: this.props.project.url
    };
    const successUpload = (fileNamesArr, filename) => {
      fileNamesArr = fileNamesArr.filter(el => {
        return !el.match(/thumb-.*/g);
      });
      fileNamesArr.push(filename);

      this.props.onAddDeleteFile(fileNamesArr);
    };
    let fileNamesArr = this.props.fileNames;

    uploadFileService(dataToUploadFromFile, () => {
      successUpload(fileNamesArr, dataToUploadFromFile.name);
    });
  };

  originalImageSaver = image => {
    this.setState({ imageFile: image });
  };
  imgPropertiesHandler = e => {
    const {
      target: { name, value }
    } = e;

    this.setState({
      [name]: value
    });

    if (name === "imgQuality" && this.state.imageFile) {
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
    this.state.imageFile &&
      compressImage(
        this.state.imageFile,
        this.state.imgQuality,
        value,
        this.imageUpload,
        this.imageUploadErr
      );
  };
  colorHandler = (color, e) => {
    console.log("color", color);
    const { h, s, l, a } = color.hsl;
    this.props.onProjectChange();
    this.props.setThumbnailColor(`hsla(${h},${s * 100}%,${l * 100}%,${a})`);
    this.setState({ thumbnailColor: color });
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
        <React.Fragment>
          <div>
            <UploadImage
              imageUpload={this.imageUpload}
              imageUploadErr={this.imageUploadErr}
              imgPropertiesHandler={this.imgPropertiesHandler}
              imgWidthHandler={this.imgWidthHandler}
              originalImageSaver={this.originalImageSaver}
              uploadMessage={this.state.uploadMessage}
              imgQuality={this.state.imgQuality}
              imgW={this.state.imgW}
              compressedImg={this.state.compressedImg}
            />
            <SketchPicker
              color={this.state.thumbnailColor}
              onChangeComplete={this.colorHandler}
            />
          </div>
        </React.Fragment>

        <button
          className="cmsBtn"
          onClick={this.uploadingToServerHandler}
          type="button"
        >
          Upload Image
        </button>

        <PostCard
          title={this.props.seo.title}
          postH={300}
          postImg={this.state.imagePreview}
          postGradient={`linear-gradient(180.07deg, rgba(0, 0, 0, 0) 0.06%, ${
            this.props.thumbnail.color
          } 73.79%)`}
        />
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
    postCreation: state.postCreation,
    thumbnail: state.postCreation.thumbnail
  };
};
const mapDispachToProps = dispach => {
  return {
    onThumbnailChange: payload => {
      dispach({ type: "THUMBNAIL_CHANGE", payload: payload });
    },
    setThumbnailColor: color => {
      dispach({ type: "THUMBNAIL_COLOR", payload: color });
    },
    onAddDeleteFile: payload =>
      dispach({ type: "ADD_DELETE_FILE", payload: payload }),
    onProjectChange: () => dispach({ type: "CHANGE_PROJECT" })
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(ThumbNailEditor);
