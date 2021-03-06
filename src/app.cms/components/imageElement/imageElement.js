import React, {Component} from 'react'
// import Compressor from "compressorjs";
import {connect} from 'react-redux'
//components
import ElementCustomEdit from '../elementCustomEdit/elementCustomEdit'
import UploadImage from '../uploadImage/uploadImage'

//services
import isBrowser from '../../../services/isBrowser'
import compressImage from '../../../services/compressImage'
import blobToBase64 from '../../../services/blobToBase64'

//react map
/*

DashBoard
  CreatePost (container)
    PostElement (preview and control)
      Header (Header element)

*/

class ImageElement extends Component {
  constructor(props) {
    super(props)
    isBrowser
    this.state = {
      uploadMessage: 'Upload Image',
      imgW: 200,
      imgQuality: 0.6,
      imageFile: null,
      compressedImg: null,
      oldFilename: this.props.imgFile && this.props.imgFile.filename
    }
  }
  imgWidthHandler = e => {
    const value = e.target.value
    this.state.imageFile &&
      compressImage(
        this.state.imageFile,
        this.state.imgQuality,
        value,
        this.imageUpload,
        this.imageUploadErr
      )
  }
  qualityHandler = e => {
    this.props.onProjectChange()

    const {
      target: {name, value}
    } = e
    this.setState({[name]: value})
  }

  // handleImgUpload = files => {
  //   this.props.onProjectChange();
  //   this.setState({ image: files });
  // };
  imageUploadErr = err => {
    this.setState(() => {
      return {
        uploadMessage: `${err}`
      }
    })
  }

  imageUpload = image => {
    blobToBase64(image, base64Obj => {
      const file = new File([image], image.name)
      // this.props.onProjectChange();
      this.props.imgFileSet(
        `${URL.createObjectURL(image)}`,
        `${process.env.CDN_URL}/articles/${this.props.project.url}/${image.name}`,
        base64Obj.url
      )
      this.setState({
        // uploadMessage: undefined,
        isImageUploaded: true,
        compressedImg: file
      })
      alert('file Uploaded successfully')
    })
  }

  originalImageSaver = image => {
    this.setState({imageFile: image})
  }
  imgPropertiesHandler = e => {
    const {
      target: {name, value}
    } = e

    this.setState({
      [name]: value
    })

    if (name === 'imgQuality') {
      this.state.imageFile &&
        compressImage(
          this.state.imageFile,
          value,
          this.state.imgW,
          this.imageUpload,
          this.imageUploadErr
        )
    }
  }
  imgWidthHandler = e => {
    const value = e.target.value
    this.state.imageFile &&
      compressImage(
        this.state.imageFile,
        this.state.imgQuality,
        value,
        this.imageUpload,
        this.imageUploadErr
      )
  }

  uploadingToServerHandler = () => {
    if (this.state.compressedImg) {
      const file = [this.state.compressedImg]
      const e = {target: {files: file}}
      if (this.state.oldFilename) {
        //se esta editando la imagen por ende se debe borrar el archivo de la lista de archivos
        let oldFilename = this.state.oldFilename.match(/[\w\s-]+\.\w*/g)
        this.props.uploadFileHandler(e, oldFilename[0])
      } else {
        this.props.uploadFileHandler(e) //add to la lista de files disponibles y subo file al server
      }
    }

    this.props.editionBtnHandler()
  }
  render() {
    return (
      <div>
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

          <div className='elementContentLayout'>
            <ElementCustomEdit
              HTMLAtributes={this.props.HTMLAtributes}
              HTMLAtributesArr={this.props.HTMLAtributesArr}
              HTMLAtributesArrRemove={this.props.HTMLAtributesArrRemove}
              HTMLStyles={this.props.HTMLStyles}
              HTMLStylesArr={this.props.HTMLStylesArr}
              HTMLStylesArrRemove={this.props.HTMLStylesArrRemove}
              HTMLClasses={this.props.HTMLClasses}
              HTMLClassesArr={this.props.HTMLClassesArr}
              HTMLClassesArrRemove={this.props.HTMLClassesArrRemove}
              imageElement={true}
              imgAlt={this.props.imgAlt}
              atrImgHTMLHandler={this.props.atrImgHTMLHandler}
              imgFigcaption={this.props.imgFigcaption}
              atrImgHTMLHandler={this.props.atrImgHTMLHandler}
              stylesHTMLHandler={this.props.stylesHTMLHandler}
              atributesHTMLHandler={this.props.atributesHTMLHandler}
              classesHTMLHandler={this.props.classesHTMLHandler}
            />
            {/* <div className="elementClasses">
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
          */}
          </div>
          {this.state.compressedImg && (
            <div>
              <button
                className='cmsBtn'
                onClick={this.uploadingToServerHandler}
                type='button'
              >
                Upload Image
              </button>
            </div>
          )}
        </div>
      </div>
    )
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
  }
}

const mapDispachToProps = dispach => {
  return {
    //acciones

    onProjectChange: () => dispach({type: 'CHANGE_PROJECT'})
  }
}

export default connect(mapStateToProps, mapDispachToProps)(ImageElement)
