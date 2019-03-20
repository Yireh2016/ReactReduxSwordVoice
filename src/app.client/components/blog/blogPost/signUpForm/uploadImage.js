import React, { Component } from "react";
import Compressor from "compressorjs";
import isBrowser from "../../../../../services/isBrowser";

class UploadImage extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   uploadMessage: "Upload foto",
    //   userAvatar: "",
    //   userAvatarPreview: undefined
    // };
    this.inputFile = React.createRef();
  }

  // imageUpload = image => {
  //   console.log("imgupload ", image);
  //   this.setState(() => {
  //     return {
  //       userAvatar: image,
  //       userAvatarPreview: `url(${URL.createObjectURL(image)})`,
  //       uploadMessage: undefined
  //     };
  //   });
  //   alert("file Uploaded successfully");
  // };

  handleImgUpload = files => {
    let Uploadfunction = this.props.imageUpload;
    const browser = isBrowser();
    const shouldCompress =
      browser === "ie" || browser === "edge" ? false : true;

    if (shouldCompress) {
      new Compressor(files[0], {
        quality: 0.6,
        width: 200,
        mimeType: "jpg",
        convertSize: 200000,
        success(result) {
          Uploadfunction(result);
        },
        error(err) {
          console.log("error", err);
          this.props.imageUploadErr(err);
          // this.setState(() => {
          //   return {
          //     userAvatarPreview: undefined,
          //     uploadMessage: `${err}`
          //   };
          // });
          return;
        }
      });
    } else {
      Uploadfunction(files[0]);
    }
  };
  render() {
    return (
      <div className=" avatarContForm">
        <input
          ref={this.inputFile}
          style={{
            display: "none"
          }}
          type="file"
          name="avatar"
          id="avatar"
          accept="image/*"
          onChange={e => {
            this.handleImgUpload(e.target.files);
          }}
        />

        <div
          onClick={() => {
            this.inputFile.current.click();
          }}
          className="avatarLoad"
          style={{
            backgroundImage: this.props.userAvatarPreview,
            backgroundSize: "cover"
          }}
        >
          <span>{this.props.uploadMessage}</span>
        </div>
      </div>
    );
  }
}

export default UploadImage;
