import React, {Component} from 'react'
import Compressor from 'compressorjs'
import isBrowser from '../../../../../services/isBrowser'

class UploadImage extends Component {
  constructor(props) {
    super(props)

    this.inputFile = React.createRef()
  }

  handleImgUpload = files => {
    let Uploadfunction = this.props.imageUpload
    const browser = isBrowser()
    const shouldCompress = browser === 'ie' || browser === 'edge' ? false : true

    if (shouldCompress) {
      new Compressor(files[0], {
        quality: 0.6,
        mimeType: 'jpg',
        convertSize: 200000,
        success(result) {
          console.log('imageUpload', result)
          Uploadfunction(result)
        },
        error(err) {
          console.log('error', err)
          this.props.imageUploadErr(err)

          return
        }
      })
    } else {
      Uploadfunction(files[0])
    }
  }
  render() {
    return (
      <div className=' avatarContForm'>
        <input
          ref={this.inputFile}
          style={{
            display: 'none'
          }}
          type='file'
          name='avatar'
          id='avatar'
          accept='image/*'
          onChange={e => {
            this.handleImgUpload(e.target.files)
          }}
        />

        <div
          onClick={() => {
            this.inputFile.current.click()
          }}
          className='avatarLoad'
          style={{
            backgroundImage: this.props.userAvatarPreview,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        >
          <span>{this.props.uploadMessage}</span>
        </div>
      </div>
    )
  }
}

export default UploadImage
