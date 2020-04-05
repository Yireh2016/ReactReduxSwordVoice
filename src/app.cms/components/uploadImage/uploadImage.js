import React, { Component } from "react";
// import Compressor from "compressorjs";
import isBrowser from "../../../services/isBrowser";
//css
import "./uploadImage.css";
import compressImage from "../../../services/compressImage";

//Component Tree
// thumbnail editor
//  uploadImage
class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUploadBtn: false,
    };
    this.inputFile = React.createRef();
    this.options = [0.5, 0.6, 0.7, 0.8, 0.9, 1];
  }

  handleImgUpload = (files) => {
    this.setState({ showUploadBtn: true });
    this.props.originalImageSaver(files[0]);
    compressImage(
      files,
      this.props.imgQuality,
      this.props.imgW,
      this.props.imageUpload,
      this.props.imageUploadErr
    );
  };

  onSelectFile = (e) => {
    this.inputFile.current.click();
  };

  render() {
    const options = this.options.map((opt, i) => {
      return <option key={i} value={opt}>{`${opt}`}</option>;
    });

    const uploadBtn = this.state.showUploadBtn ? (
      <button
        className="cmsBtn"
        onClick={this.props.uploadingToServerHandler}
        type="button"
        style={{ "margin-left": "15px" }}
      >
        Upload Image
      </button>
    ) : null;
    return (
      <div>
        <input
          ref={this.inputFile}
          style={{
            display: "none",
          }}
          type="file"
          name="avatar"
          id="avatar"
          accept="image/*"
          onChange={(e) => {
            this.handleImgUpload(e.target.files);
          }}
        />

        <div style={{ display: "flex", margin: "15px" }}>
          <button onClick={this.onSelectFile} className="cmsBtn ">
            Select file
          </button>
          {uploadBtn}
        </div>

        {isBrowser() !== "edge" && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <label className="padding--small">
              Image Quality
              <select
                value={this.props.imgQuality}
                name="imgQuality"
                onChange={this.props.imgPropertiesHandler}
              >
                <option value=" ">Please Select quality</option>
                {options}
              </select>
            </label>

            <label
              className="padding--small"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Image Width
              <input
                type="range"
                name="imgW"
                min="200"
                max="2000"
                step="50"
                value={this.props.imgW}
                onMouseUp={this.props.imgWidthHandler}
                onChange={this.props.imgPropertiesHandler}
              />
              <span> {this.props.imgW + " px"}</span>
            </label>
            <div className="padding--small">
              {this.props.compressedImg &&
                "File Size: " + this.props.compressedImg.size}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UploadImage;
