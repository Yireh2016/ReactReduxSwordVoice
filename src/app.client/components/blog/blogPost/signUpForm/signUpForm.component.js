//modules
import React, {Component} from 'react'
import axios from 'axios'
import 'simplebar' // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import {connect} from 'react-redux'
//services
import triggerDialog from '../../../../services/triggerDialog'

//css
import './signUpForm.css'
import UploadImage from './uploadImage'
import blobToBase64 from '../../../../../services/blobToBase64'
import UserManageForm from '../../../../layouts/UserManageForm'
//components
import Loading from '../../../loading/loading'
import MonthlyInput from '../../../../../common/components/monthlyInput/MonthlyInput'
//api calls

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // user state

      userAvatar: '',
      userFirstName: undefined,
      userFirstNameIsValid: ' ',
      userLastName: undefined,
      userLastNameIsValid: ' ',
      userEmail: undefined,
      userEmailIsValid: {valid: ' ', message: ''},
      userCountry: ' ',
      userBirthDate: undefined,
      userBirthDateIsValid: ' ',
      userGender: undefined,
      userGenderIsValid: ' ',
      userInterests: [],
      userOtherInterests: [],
      userOtherInterestsText: '',
      userOtherInterestsTextIsValid: ' ',
      userName: undefined,
      userNameIsValid: {valid: ' ', message: ''},
      userPassword: undefined,
      userPasswordIsValid: ' ',
      passwordConfirm: undefined,
      passwordConfirmIsValid: ' ',
      termAcepted: false,
      // view state
      userAvatarPreview: undefined,
      uploadMessage: 'Upload foto',
      animControl1: undefined,
      animControl2: undefined,
      animControl3: undefined,
      formPage: 1,
      layoutH: 0,
      isSubmitLoading: false
    }
    this.formLayoutRef = React.createRef()
  }

  imageUpload = image => {
    blobToBase64(image, base64 => {
      this.setState(() => {
        return {
          userAvatar: `${base64.url}`,
          userAvatarPreview: `url(${base64.url})`,
          uploadMessage: undefined
        }
      })
    })
  }

  imageUploadErr = err => {
    this.setState(() => {
      return {
        userAvatarPreview: undefined,
        uploadMessage: `${err}`
      }
    })
  }

  handleOnInterestClick = event => {
    const texto = event.target.innerText
    this.setState(prevState => {
      let array = prevState.userOtherInterests
      array = array.filter(item => item !== texto)
      return {
        userOtherInterests: array
      }
    })
  }

  setFinalDate = date => {
    this.setState({
      userBirthDateIsValid: true,
      userBirthDate: date
    })
  }

  handleFormInputChange = event => {
    const {
      target: {name, value}
    } = event

    this.setState({[name]: value})

    //validaciones
    switch (name) {
      case 'userOtherInterestsText': {
        if (value.match(/^[a-zA-Zñáéíóú0-9 ,]+$/g)) {
          this.setState({userOtherInterestsTextIsValid: true})
        } else {
          this.setState({userOtherInterestsTextIsValid: false})
        }
        if (value.match(/,/g)) {
          this.setState(prevState => {
            let interest = value.slice(0, value.length - 1)

            if (interest !== '') {
              let arrayInterest = prevState.userOtherInterests
              arrayInterest.push(`${interest.toLowerCase()}`)
              return {
                userOtherInterestsText: '',
                userOtherInterests: arrayInterest
              }
            }
            return {
              userOtherInterestsText: ''
            }
          })
        }
        if (value.match(/^$/)) {
          this.setState({userOtherInterestsTextIsValid: ' '})
        }
        break
      }
      case 'userFirstName': {
        if (value && value.match(/^[a-zA-Zñáéíóú]+$/g)) {
          this.setState({
            userFirstNameIsValid: true
          })
          return
        }

        if (value.match(/^$/)) {
          this.setState({userFirstNameIsValid: ' '})
          return
        }
        this.setState({
          userFirstNameIsValid: false
        })
        break
      }
      case 'userLastName': {
        if (value && value.match(/^$|^[a-zA-Zñáéíóú]+$/g)) {
          this.setState({
            userLastNameIsValid: true
          })

          return
        }

        if (value.match(/^$/)) {
          this.setState({userLastNameIsValid: ' '})
          return
        }
        this.setState({
          userLastNameIsValid: false
        })
        break
      }
      case 'userEmail': {
        if (value.match(/^$/)) {
          this.setState({
            userEmailIsValid: {
              valid: ' ',
              message: ``
            }
          })
          return
        }
        if (
          !value ||
          !value.match(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
          )
        ) {
          this.setState({
            userEmailIsValid: {
              valid: false,
              message: 'Please, insert a valid Email'
            }
          })
          return
        }
        //Verificando si el email esta en la DB y pertenece a otro usuario
        axios(`/api/searchEmail/${value}`)
          .then(res => {
            if (res.status === 200) {
              this.setState({
                userEmailIsValid: {
                  valid: false,
                  message: 'This Email address is already being used'
                }
              })
            }
          })
          .catch(err => {
            if (err) {
              if (JSON.stringify(err).match(/404/g)) {
                this.setState({
                  userEmailIsValid: {valid: true}
                })
                return
              }

              this.setState({
                userEmailIsValid: {
                  valid: ' ',
                  message: `there was an error ${err}`
                }
              })
            }
          })

        break
      }
      case 'userBirthDate': {
        if (value === ' ') {
          this.setState({
            userBirthDateIsValid: false
          })
          return
        }
        this.setState({
          userBirthDateIsValid: true
        })
        break
      }
      case 'userGender': {
        if (value === ' ') {
          this.setState({
            userGenderIsValid: false
          })
          return
        }
        this.setState({
          userGenderIsValid: true
        })
        break
      }
      case 'userName': {
        console.log(
          '🚀 ~ file: signUpForm.component.js:255 ~ SignUpForm ~ value:',
          value
        )
        if (value && value.match(/^(\w){1,20}$/g)) {
          //username has to be 1 to 20 chars long including hyphen and underscore

          axios(`/api/searchUser/${value}`)
            .then(res => {
              console.log(
                '🚀 ~ file: signUpForm.component.js:263 ~ SignUpForm ~ res:',
                res
              )
              if (res.status === 200) {
                this.setState({
                  userNameIsValid: {
                    valid: false,
                    message: 'This username already being used'
                  }
                })
                return
              }
            })
            .catch(err => {
              if (JSON.stringify(err).match(/404/g)) {
                this.setState({
                  userNameIsValid: {valid: true}
                })
              }
            })

          return
        }
        if (value.match(/^$/)) {
          this.setState({
            userNameIsValid: {
              valid: ' ',
              message: ''
            }
          })
          return
        }
        this.setState({
          userNameIsValid: {
            valid: false,
            message:
              'Please, insert username without spaces or special characters'
          }
        })

        break
      }

      case 'userPassword': {
        //it has to be 10 chars long with any special one and uppercase and lowercase chars
        if (
          value &&
          value.match(
            /^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g
          )
        ) {
          this.setState({
            userPasswordIsValid: true
          })
          return
        }

        if (value.match(/^$/)) {
          this.setState({
            userPasswordIsValid: ' '
          })
          return
        }
        this.setState({
          userPasswordIsValid: false
        })
        break
      }
      case 'passwordConfirm': {
        if (value.match(/^$/)) {
          this.setState({
            passwordConfirmIsValid: ' '
          })
          return
        }
        if (value !== this.state.userPassword) {
          this.setState({
            passwordConfirmIsValid: false
          })
          return
        }

        this.setState({
          passwordConfirmIsValid: true
        })
        break
      }

      default:
        break
    }
  }

  handleFormInterestChange = event => {
    const {
      target: {value}
    } = event
    this.setState(prevState => {
      return {
        userInterests: [...prevState.userInterests, value]
      }
    })
  }
  onNextClick = () => {
    const nextPage = this.state.formPage + 1
    if (nextPage === 2) {
      const {
        userEmailIsValid,
        userFirstNameIsValid,
        userLastNameIsValid,
        userCountry
      } = this.state

      if (
        userEmailIsValid.valid === true &&
        userFirstNameIsValid === true &&
        userLastNameIsValid === true &&
        userCountry !== ' '
      ) {
        this.setState({
          formPage: nextPage,
          animControl1: 'flyToLeft',
          animControl2: 'flyIn'
        })
        return
      }
    } else if (nextPage === 3) {
      const {
        userBirthDateIsValid,
        userGenderIsValid,
        userOtherInterestsTextIsValid,
        userOtherInterestsText
      } = this.state
      if (
        userBirthDateIsValid === true &&
        userGenderIsValid === true &&
        userOtherInterestsTextIsValid
      ) {
        if (userOtherInterestsText !== '') {
          const text = userOtherInterestsText
          const interests = userOtherInterests
          interests.push(text)
          this.setState({
            formPage: nextPage,
            animControl2: 'flyToLeft',
            animControl3: 'flyIn',
            userOtherInterests: interests
          })
          return
        }
        this.setState({
          formPage: nextPage,
          animControl2: 'flyToLeft',
          animControl3: 'flyIn'
        })
        return
      }
    }

    triggerDialog({
      title: 'Ups 😅',
      body: 'Please, fill all the required values'
    })
  }

  onBackClick = () => {
    this.setState(prevState => {
      let backPage = prevState.formPage - 1

      if (backPage === 2) {
        return {
          formPage: backPage,
          animControl3: 'flyToRight',
          animControl2: 'flyIn'
        }
      }

      return {
        formPage: backPage,
        animControl2: 'flyToRight',
        animControl1: 'flyIn'
      }
    })
  }
  handleErrors = res => {
    const {statusText} = res

    if (!statusText === 'OK') {
      throw Error(JSON.stringify(res))
    }
    return res
  }
  onSubmitClick = () => {
    // Al dar click en submit se almacena el estado en variables del mismo nombre, que representa las entradas ingresadas por el usuario
    const {
      termAcepted,
      passwordConfirmIsValid,
      userNameIsValid,
      userAvatar,
      userFirstName,
      userLastName,
      userEmail,
      userCountry,
      userBirthDate,
      userGender,
      userInterests,
      userOtherInterests,
      userName,
      userPassword
    } = this.state

    //se verifica que la ultima etapa del sign in form este llena y validada
    if (
      termAcepted &&
      passwordConfirmIsValid === true &&
      userNameIsValid.valid === true
    ) {
      //en caso de estar los datos validados, se envian las entradas a la DB para su almacenaje

      //luego se se crea un objeto "data" con las entradas
      let data = {
        userFirstName,
        userLastName,
        userEmail,
        userCountry,
        userBirthDate,
        userGender,
        userInterests,
        userOtherInterests,
        userName,
        userPassword,
        userAvatar
      }

      this.setState({
        isSubmitLoading: true
      })
      axios
        .post('/api/signup', data)
        .then(this.handleErrors) //en caso de error se emite con este handler para que el cacth lo tome
        .then(res => {
          if (res.status === 200) {
            this.setState({
              isSubmitLoading: false
            })
            triggerDialog(
              {
                title: 'Way to Go!! 😁',
                body: `We've sent you a validation email; Please, check your inbox or SPAM email folder. Did we mentioned you to check your SPAM folder already?... oh!!! sorry 😅`
              },
              () => {
                this.props.onCancelClick()
              }
            )

            //si la respuesta es positiva se verifica si el usuario subio imagen al browser y se procede a subirla

            // const userData = res.data;

            // console.log("userAvatar on signupform", userData.userAvatar);

            // this.props.onLogIn({
            //   //se modifica el STORE enviando los datos de autenticacion y se despacha la accion de login para desbloquear los sectores que solo un usuario autorizado puede visitar

            //   userName: userData.userName,
            //   userID: userData.id,
            //   userType: userData.userType,
            //   userAvatar: userData.userAvatar,
            //   userFullName: `${userFirstName} ${userLastName}`
            // });
            // triggerDialog(
            //   {
            //     title: "Way to Go!! 😁",
            //     body: `Welcome to our Comunity ${userName}`,
            //     auto: true
            //   },
            //   () => {
            //     this.props.onCancelClick();
            //   }
            // );
          } else {
            triggerDialog({
              title: 'Ups 😅',
              body: `We receive an invalid response from the server. Please try again later.`
            })
          }
          return
          // this.props.onCancelClick(); //se cierra el modal de signup
        })
        .catch(err => {
          let errorText
          if (!err.response) {
            errorText = 'Network Error'
          }
          errorText = err.response.data.message

          triggerDialog({
            title: 'Error 🤬',
            body: ` There was an error status:  ${errorText}`
          })
        })

      return
    }
    triggerDialog({
      title: 'Ups 😅',
      body: 'Please, fill all the required values'
    })
  }

  componentDidMount() {
    // window.addEventListener("scroll", function(e) {
    //   e.preventDefault();
    // });
    setTimeout(() => {
      this.setState(() => {
        return {
          animControl1: 'flyIn'
        }
      })
    }, 200)

    // console.log("this.formLayoutRef.current", this.formLayoutRef.current);
    // console.log(
    //   "this.formLayoutRef.current",
    //   this.formLayoutRef.current.clientHeight
    // );

    // this.setState({
    //   layoutH: this.formLayoutRef.current.clientHeight
    // });
  }
  // onScrollformLayout = e => {
  //   e.preventDefault();
  // };
  render() {
    let controlButtons
    switch (this.state.formPage) {
      default: {
        controlButtons = (
          <React.Fragment>
            <button
              onClick={this.onBackClick}
              className='cancelBtn'
              type='button'
            >
              Back
            </button>
            {this.state.formPage === 3 ? (
              <button
                className='logSignBtn'
                onClick={this.onSubmitClick}
                type='button'
              >
                {!this.state.isSubmitLoading ? 'Submit' : <Loading></Loading>}
              </button>
            ) : (
              <button
                className='logSignBtn'
                onClick={this.onNextClick}
                type='button'
              >
                Next
              </button>
            )}
          </React.Fragment>
        )
        break
      }

      case 1: {
        controlButtons = (
          <React.Fragment>
            <button
              onClick={this.props.onCancelClick}
              className='cancelBtn'
              type='button'
            >
              Cancel
            </button>
            <button
              className='logSignBtn'
              onClick={this.onNextClick}
              type='button'
            >
              Next
            </button>
          </React.Fragment>
        )

        break
      }
    }

    const interestArray = [
      'Graphic Design',
      'UX/UI',
      'Web Design',
      'Web Development',
      'Programming',
      'Ecommerce',
      'Digital Marketing',
      'Mobile Apps'
    ]
    // const otherInterests = <div className="otherInterests">test</div>;
    const otherInterests = this.state.userOtherInterests.map((value, index) => {
      return (
        <React.Fragment key={index}>
          <div className='otherInterests'>
            <div onClick={this.handleOnInterestClick}>{value}</div>
            <span>X</span>
          </div>
        </React.Fragment>
      )
    })
    const interests = interestArray.map((value, index) => {
      return (
        <React.Fragment key={index}>
          <div className='grid col-6 checkboxCont'>
            <input
              className=''
              type='checkbox'
              value={value}
              name={value}
              onChange={this.handleFormInterestChange}
            />
            <span className='smallSpan interestsSpan'>{value}</span>
          </div>
        </React.Fragment>
      )
    })
    return (
      <UserManageForm onClick={this.props.onCancelClick}>
        <div className='signUpPageCont'>
          {this.state.formPage === 1 && (
            <section
              id='signUpPage1'
              className={`fila signUpPage1 ${this.state.animControl1} `}
            >
              <form id='userSignUpForm' className='signUpForm'>
                <UploadImage
                  imageUpload={this.imageUpload}
                  imageUploadErr={this.imageUploadErr}
                  userAvatarPreview={this.state.userAvatarPreview}
                  uploadMessage={this.state.uploadMessage}
                />

                <label>
                  <span id='signUpUserFirstName'>Name</span> <br />
                  <input
                    type='text'
                    name='userFirstName'
                    htmlFor='userFirstName'
                    aria-label='userFirstName'
                    aria-labelledby='userSignUpForm signUpUserFirstName'
                    value={this.state.userFirstName}
                    onBlur={this.handleOnBlur}
                    onChange={this.handleFormInputChange}
                  />
                  <div
                    style={{
                      textAlign: 'center',
                      color: '#00171f',
                      background: '#f95f0b',
                      borderRadius: '15px',
                      width: '100%',
                      transition: 'all .4s',
                      height: '1.2rem',
                      lineHeight: '1.2rem',
                      fontSize: '0.6rem',
                      opacity: this.state.userFirstNameIsValid ? '0' : '1'
                    }}
                  >
                    Please, insert name without spaces or numbers
                  </div>
                </label>

                <label>
                  <span id='signUpuserLastName'>Last Name</span>
                  <br />
                  <input
                    type='text'
                    name='userLastName'
                    htmlFor='userLastName'
                    aria-label='userLastName'
                    aria-labelledby='userSignUpForm signUpuserLastName'
                    value={this.state.userLastName}
                    onBlur={this.handleOnBlur}
                    onChange={this.handleFormInputChange}
                  />
                  <div
                    style={{
                      textAlign: 'center',
                      color: '#00171f',
                      background: '#f95f0b',
                      borderRadius: '15px',
                      width: '100%',
                      transition: 'all .2s',
                      height: '1.2rem',
                      lineHeight: '1.2rem',
                      fontSize: '0.6rem',
                      opacity: this.state.userLastNameIsValid ? '0' : '1'
                    }}
                  >
                    Please, insert value without spaces or numbers
                  </div>
                </label>

                <label>
                  <span id='signUpuseruserEmail'>Email</span> <br />
                  <input
                    type='email'
                    name='userEmail'
                    htmlFor='userEmail'
                    aria-label='userEmail'
                    aria-labelledby='userSignUpForm signUpuseruserEmail'
                    value={this.state.userEmail}
                    onBlur={this.handleOnBlur}
                    onChange={this.handleFormInputChange}
                  />
                  <div
                    style={{
                      textAlign: 'center',
                      color: '#00171f',
                      background: '#f95f0b',
                      borderRadius: '15px',
                      width: '100%',
                      transition: 'all .2s',
                      height: '1.2rem',
                      lineHeight: '1.2rem',
                      fontSize: '0.6rem',
                      opacity:
                        this.state.userEmailIsValid.valid === ' ' ||
                        this.state.userEmailIsValid.valid === true
                          ? '0'
                          : '1'
                    }}
                  >
                    {this.state.userEmailIsValid.message}
                  </div>
                </label>
                <label>
                  <span id='signUpuseruserEmail'>Country</span> <br />
                  <select
                    value={this.state.userCountry}
                    name='userCountry'
                    htmlFor='userCountry'
                    aria-label='userCountry'
                    aria-labelledby='userSignUpForm signUpuseruserEmail'
                    onChange={this.handleFormInputChange}
                  >
                    <option value=' '>Please Select Country</option>
                    <option value='AFG'>Afghanistan</option>
                    <option value='ALA'>Åland Islands</option>
                    <option value='ALB'>Albania</option>
                    <option value='DZA'>Algeria</option>
                    <option value='ASM'>American Samoa</option>
                    <option value='AND'>Andorra</option>
                    <option value='AGO'>Angola</option>
                    <option value='AIA'>Anguilla</option>
                    <option value='ATA'>Antarctica</option>
                    <option value='ATG'>Antigua and Barbuda</option>
                    <option value='ARG'>Argentina</option>
                    <option value='ARM'>Armenia</option>
                    <option value='ABW'>Aruba</option>
                    <option value='AUS'>Australia</option>
                    <option value='AUT'>Austria</option>
                    <option value='AZE'>Azerbaijan</option>
                    <option value='BHS'>Bahamas</option>
                    <option value='BHR'>Bahrain</option>
                    <option value='BGD'>Bangladesh</option>
                    <option value='BRB'>Barbados</option>
                    <option value='BLR'>Belarus</option>
                    <option value='BEL'>Belgium</option>
                    <option value='BLZ'>Belize</option>
                    <option value='BEN'>Benin</option>
                    <option value='BMU'>Bermuda</option>
                    <option value='BTN'>Bhutan</option>
                    <option value='BOL'>Bolivia, Plurinational State of</option>
                    <option value='BES'>
                      Bonaire, Sint Eustatius and Saba
                    </option>
                    <option value='BIH'>Bosnia and Herzegovina</option>
                    <option value='BWA'>Botswana</option>
                    <option value='BVT'>Bouvet Island</option>
                    <option value='BRA'>Brazil</option>
                    <option value='IOT'>British Indian Ocean Territory</option>
                    <option value='BRN'>Brunei Darussalam</option>
                    <option value='BGR'>Bulgaria</option>
                    <option value='BFA'>Burkina Faso</option>
                    <option value='BDI'>Burundi</option>
                    <option value='KHM'>Cambodia</option>
                    <option value='CMR'>Cameroon</option>
                    <option value='CAN'>Canada</option>
                    <option value='CPV'>Cape Verde</option>
                    <option value='CYM'>Cayman Islands</option>
                    <option value='CAF'>Central African Republic</option>
                    <option value='TCD'>Chad</option>
                    <option value='CHL'>Chile</option>
                    <option value='CHN'>China</option>
                    <option value='CXR'>Christmas Island</option>
                    <option value='CCK'>Cocos (Keeling) Islands</option>
                    <option value='COL'>Colombia</option>
                    <option value='COM'>Comoros</option>
                    <option value='COG'>Congo</option>
                    <option value='COD'>
                      Congo, the Democratic Republic of the
                    </option>
                    <option value='COK'>Cook Islands</option>
                    <option value='CRI'>Costa Rica</option>
                    <option value='CIV'>Côte d'Ivoire</option>
                    <option value='HRV'>Croatia</option>
                    <option value='CUB'>Cuba</option>
                    <option value='CUW'>Curaçao</option>
                    <option value='CYP'>Cyprus</option>
                    <option value='CZE'>Czech Republic</option>
                    <option value='DNK'>Denmark</option>
                    <option value='DJI'>Djibouti</option>
                    <option value='DMA'>Dominica</option>
                    <option value='DOM'>Dominican Republic</option>
                    <option value='ECU'>Ecuador</option>
                    <option value='EGY'>Egypt</option>
                    <option value='SLV'>El Salvador</option>
                    <option value='GNQ'>Equatorial Guinea</option>
                    <option value='ERI'>Eritrea</option>
                    <option value='EST'>Estonia</option>
                    <option value='ETH'>Ethiopia</option>
                    <option value='FLK'>Falkland Islands (Malvinas)</option>
                    <option value='FRO'>Faroe Islands</option>
                    <option value='FJI'>Fiji</option>
                    <option value='FIN'>Finland</option>
                    <option value='FRA'>France</option>
                    <option value='GUF'>French Guiana</option>
                    <option value='PYF'>French Polynesia</option>
                    <option value='ATF'>French Southern Territories</option>
                    <option value='GAB'>Gabon</option>
                    <option value='GMB'>Gambia</option>
                    <option value='GEO'>Georgia</option>
                    <option value='DEU'>Germany</option>
                    <option value='GHA'>Ghana</option>
                    <option value='GIB'>Gibraltar</option>
                    <option value='GRC'>Greece</option>
                    <option value='GRL'>Greenland</option>
                    <option value='GRD'>Grenada</option>
                    <option value='GLP'>Guadeloupe</option>
                    <option value='GUM'>Guam</option>
                    <option value='GTM'>Guatemala</option>
                    <option value='GGY'>Guernsey</option>
                    <option value='GIN'>Guinea</option>
                    <option value='GNB'>Guinea-Bissau</option>
                    <option value='GUY'>Guyana</option>
                    <option value='HTI'>Haiti</option>
                    <option value='HMD'>
                      Heard Island and McDonald Islands
                    </option>
                    <option value='VAT'>Holy See (Vatican City State)</option>
                    <option value='HND'>Honduras</option>
                    <option value='HKG'>Hong Kong</option>
                    <option value='HUN'>Hungary</option>
                    <option value='ISL'>Iceland</option>
                    <option value='IND'>India</option>
                    <option value='IDN'>Indonesia</option>
                    <option value='IRN'>Iran, Islamic Republic of</option>
                    <option value='IRQ'>Iraq</option>
                    <option value='IRL'>Ireland</option>
                    <option value='IMN'>Isle of Man</option>
                    <option value='ISR'>Israel</option>
                    <option value='ITA'>Italy</option>
                    <option value='JAM'>Jamaica</option>
                    <option value='JPN'>Japan</option>
                    <option value='JEY'>Jersey</option>
                    <option value='JOR'>Jordan</option>
                    <option value='KAZ'>Kazakhstan</option>
                    <option value='KEN'>Kenya</option>
                    <option value='KIR'>Kiribati</option>
                    <option value='PRK'>
                      Korea, Democratic People's Republic of
                    </option>
                    <option value='KOR'>Korea, Republic of</option>
                    <option value='KWT'>Kuwait</option>
                    <option value='KGZ'>Kyrgyzstan</option>
                    <option value='LAO'>
                      Lao People's Democratic Republic
                    </option>
                    <option value='LVA'>Latvia</option>
                    <option value='LBN'>Lebanon</option>
                    <option value='LSO'>Lesotho</option>
                    <option value='LBR'>Liberia</option>
                    <option value='LBY'>Libya</option>
                    <option value='LIE'>Liechtenstein</option>
                    <option value='LTU'>Lithuania</option>
                    <option value='LUX'>Luxembourg</option>
                    <option value='MAC'>Macao</option>
                    <option value='MKD'>
                      Macedonia, the former Yugoslav Republic of
                    </option>
                    <option value='MDG'>Madagascar</option>
                    <option value='MWI'>Malawi</option>
                    <option value='MYS'>Malaysia</option>
                    <option value='MDV'>Maldives</option>
                    <option value='MLI'>Mali</option>
                    <option value='MLT'>Malta</option>
                    <option value='MHL'>Marshall Islands</option>
                    <option value='MTQ'>Martinique</option>
                    <option value='MRT'>Mauritania</option>
                    <option value='MUS'>Mauritius</option>
                    <option value='MYT'>Mayotte</option>
                    <option value='MEX'>Mexico</option>
                    <option value='FSM'>Micronesia, Federated States of</option>
                    <option value='MDA'>Moldova, Republic of</option>
                    <option value='MCO'>Monaco</option>
                    <option value='MNG'>Mongolia</option>
                    <option value='MNE'>Montenegro</option>
                    <option value='MSR'>Montserrat</option>
                    <option value='MAR'>Morocco</option>
                    <option value='MOZ'>Mozambique</option>
                    <option value='MMR'>Myanmar</option>
                    <option value='NAM'>Namibia</option>
                    <option value='NRU'>Nauru</option>
                    <option value='NPL'>Nepal</option>
                    <option value='NLD'>Netherlands</option>
                    <option value='NCL'>New Caledonia</option>
                    <option value='NZL'>New Zealand</option>
                    <option value='NIC'>Nicaragua</option>
                    <option value='NER'>Niger</option>
                    <option value='NGA'>Nigeria</option>
                    <option value='NIU'>Niue</option>
                    <option value='NFK'>Norfolk Island</option>
                    <option value='MNP'>Northern Mariana Islands</option>
                    <option value='NOR'>Norway</option>
                    <option value='OMN'>Oman</option>
                    <option value='PAK'>Pakistan</option>
                    <option value='PLW'>Palau</option>
                    <option value='PSE'>Palestinian Territory, Occupied</option>
                    <option value='PAN'>Panama</option>
                    <option value='PNG'>Papua New Guinea</option>
                    <option value='PRY'>Paraguay</option>
                    <option value='PER'>Peru</option>
                    <option value='PHL'>Philippines</option>
                    <option value='PCN'>Pitcairn</option>
                    <option value='POL'>Poland</option>
                    <option value='PRT'>Portugal</option>
                    <option value='PRI'>Puerto Rico</option>
                    <option value='QAT'>Qatar</option>
                    <option value='REU'>Réunion</option>
                    <option value='ROU'>Romania</option>
                    <option value='RUS'>Russian Federation</option>
                    <option value='RWA'>Rwanda</option>
                    <option value='BLM'>Saint Barthélemy</option>
                    <option value='SHN'>
                      Saint Helena, Ascension and Tristan da Cunha
                    </option>
                    <option value='KNA'>Saint Kitts and Nevis</option>
                    <option value='LCA'>Saint Lucia</option>
                    <option value='MAF'>Saint Martin (French part)</option>
                    <option value='SPM'>Saint Pierre and Miquelon</option>
                    <option value='VCT'>
                      Saint Vincent and the Grenadines
                    </option>
                    <option value='WSM'>Samoa</option>
                    <option value='SMR'>San Marino</option>
                    <option value='STP'>Sao Tome and Principe</option>
                    <option value='SAU'>Saudi Arabia</option>
                    <option value='SEN'>Senegal</option>
                    <option value='SRB'>Serbia</option>
                    <option value='SYC'>Seychelles</option>
                    <option value='SLE'>Sierra Leone</option>
                    <option value='SGP'>Signapore</option>
                    <option value='SXM'>Sint Maarten (Dutch part)</option>
                    <option value='SVK'>Slovakia</option>
                    <option value='SVN'>Slovenia</option>
                    <option value='SLB'>Solomon Islands</option>
                    <option value='SOM'>Somalia</option>
                    <option value='ZAF'>South Africa</option>
                    <option value='SGS'>
                      South Georgia and the South Sandwich Islands
                    </option>
                    <option value='SSD'>South Sudan</option>
                    <option value='ESP'>Spain</option>
                    <option value='LKA'>Sri Lanka</option>
                    <option value='SDN'>Sudan</option>
                    <option value='SUR'>Suriname</option>
                    <option value='SJM'>Svalbard and Jan Mayen</option>
                    <option value='SWZ'>Swaziland</option>
                    <option value='SWE'>Sweden</option>
                    <option value='CHE'>Switzerland</option>
                    <option value='SYR'>Syrian Arab Republic</option>
                    <option value='TWN'>Taiwan, Province of China</option>
                    <option value='TJK'>Tajikistan</option>
                    <option value='TZA'>Tanzania, United Republic of</option>
                    <option value='THA'>Thailand</option>
                    <option value='TLS'>Timor-Leste</option>
                    <option value='TGO'>Togo</option>
                    <option value='TKL'>Tokelau</option>
                    <option value='TON'>Tonga</option>
                    <option value='TTO'>Trinidad and Tobago</option>
                    <option value='TUN'>Tunisia</option>
                    <option value='TUR'>Turkey</option>
                    <option value='TKM'>Turkmenistan</option>
                    <option value='TCA'>Turks and Caicos Islands</option>
                    <option value='TUV'>Tuvalu</option>
                    <option value='UGA'>Uganda</option>
                    <option value='UKR'>Ukraine</option>
                    <option value='ARE'>United Arab Emirates</option>
                    <option value='GBR'>United Kingdom</option>
                    <option value='USA'>United States</option>
                    <option value='UMI'>
                      United States Minor Outlying Islands
                    </option>
                    <option value='URY'>Uruguay</option>
                    <option value='UZB'>Uzbekistan</option>
                    <option value='VUT'>Vanuatu</option>
                    <option value='VEN'>
                      Venezuela, Bolivarian Republic of
                    </option>
                    <option value='VNM'>Viet Nam</option>
                    <option value='VGB'>Virgin Islands, British</option>
                    <option value='VIR'>Virgin Islands, U.S.</option>
                    <option value='WLF'>Wallis and Futuna</option>
                    <option value='ESH'>Western Sahara</option>
                    <option value='YEM'>Yemen</option>
                    <option value='ZMB'>Zambia</option>
                    <option value='ZWE'>Zimbabwe</option>
                  </select>
                </label>
              </form>
            </section>
          )}
          {this.state.formPage === 2 && (
            <section
              id='signUpPage2'
              className={`fila signUpPage2 ${this.state.animControl2} `}
            >
              <div className=''>
                <form id='userSignUpForm2' className='signUpForm2'>
                  <div className='interestsCont'>
                    Interests <br />
                    <div className='interestsLay'>{interests}</div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <label>
                      <span id='signUpuserOtherInterestsText'>
                        Other Interests
                      </span>
                      <br />
                      <div className='smallSpan'>
                        (Optional and separeted by commas)
                      </div>
                      <div>
                        <input
                          type='text'
                          name='userOtherInterestsText'
                          htmlFor='userOtherInterestsText'
                          aria-label='userOtherInterestsText'
                          aria-labelledby='userSignUpForm2 signUpuserOtherInterestsText'
                          value={this.state.userOtherInterestsText}
                          onChange={this.handleFormInputChange}
                        />
                        <div
                          style={{
                            textAlign: 'center',
                            color: '#00171f',
                            background: '#f95f0b',
                            borderRadius: '15px',
                            width: '100%',
                            transition: 'all .4s',
                            height: '1.2rem',
                            lineHeight: '1.2rem',
                            fontSize: '0.6rem',
                            opacity: this.state.userOtherInterestsTextIsValid
                              ? '0'
                              : '1',
                            zIndex: this.state.userOtherInterestsTextIsValid
                              ? '-1'
                              : '1',
                            display: this.state.userOtherInterestsTextIsValid
                              ? 'none'
                              : 'block'
                          }}
                        >
                          Please, do not use special characters
                        </div>
                      </div>
                    </label>

                    <div className='otherInterestsCont '>
                      <div data-simplebar style={{maxHeight: '40px'}}>
                        {otherInterests}
                      </div>
                    </div>
                  </div>

                  <div className='personalData'>
                    {/* <label style={{ display: "none" }}>
                      <span id="signUpuseruserBirthDate">Birth Date</span>{" "}
                      <br />
                      <input
                        type="month"
                        name="userBirthDate"
                        htmlFor="userBirthDate"
                        aria-label="userBirthDate"
                        aria-labelledby="userSignUpForm2 signUpuseruserBirthDate"
                        value={this.state.userBirthDate}
                        onChange={this.handleFormInputChange}
                        onBlur={this.handleOnBlur}
                      />
                    </label> */}
                    <span id='signUpuseruserBirthDate'>Birth Date</span>
                    <MonthlyInput
                      setFinalDate={this.setFinalDate}
                    ></MonthlyInput>

                    <label>
                      <span id='signUpuseruserGender'>Gender</span> <br />
                      <select
                        value={this.state.userGender}
                        name='userGender'
                        htmlFor='userGender'
                        aria-label='userGender'
                        aria-labelledby='userSignUpForm2 signUpuseruserGender'
                        onChange={this.handleFormInputChange}
                        onBlur={this.handleOnBlur}
                      >
                        <option value=' '>Select one</option>
                        <option value='male'>😎 Male</option>
                        <option value='female'>😘 Female</option>
                        <option value='other'>😍 Other</option>
                      </select>
                    </label>
                  </div>
                </form>
              </div>
            </section>
          )}
          {this.state.formPage === 3 && (
            <section
              id='signUpPage3'
              className={`fila signUpPage2 ${this.state.animControl3} `}
            >
              <form id='userSignUpForm3' className='signUpForm3'>
                <UploadImage
                  imageUpload={this.imageUpload}
                  imageUploadErr={this.imageUploadErr}
                  userAvatarPreview={this.state.userAvatarPreview}
                  uploadMessage={this.state.uploadMessage}
                />
                <label>
                  <span id='signUpuseruserName'>User Name</span> <br />
                  <input
                    type='text'
                    name='userName'
                    htmlFor='userName'
                    aria-label='userName'
                    aria-labelledby='userSignUpForm3 signUpuseruserName'
                    value={this.state.userName}
                    onChange={this.handleFormInputChange}
                    onBlur={this.handleOnBlur}
                  />
                  <div
                    style={{
                      textAlign: 'center',
                      position: 'absolute',
                      color: '#00171f',
                      background: '#f95f0b',
                      borderRadius: '15px',
                      width: '100%',
                      transition: 'all .4s',
                      lineHeight: '1.2rem',
                      fontSize: '0.6rem',
                      opacity:
                        this.state.userNameIsValid === true ||
                        this.state.userNameIsValid === ' '
                          ? '0'
                          : '1'
                    }}
                  >
                    {this.state.userNameIsValid.message}
                  </div>
                </label>

                <label>
                  <span id='signUpuseruserPassword'>Password</span> <br />
                  <input
                    type='password'
                    name='userPassword'
                    htmlFor='userPassword'
                    aria-label='userPassword'
                    aria-labelledby='userSignUpForm3 signUpuseruserPassword'
                    value={this.state.userPassword}
                    onChange={this.handleFormInputChange}
                  />
                  <div
                    style={{
                      textAlign: 'center',
                      position: 'absolute',
                      color: '#00171f',
                      background: '#f95f0b',
                      borderRadius: '15px',
                      width: '100%',
                      transition: 'all .4s',
                      lineHeight: '1.2rem',
                      fontSize: '0.6rem',
                      display: this.state.userPasswordIsValid ? 'none' : 'block'
                    }}
                  >
                    Password must be at least 10 characters long and must
                    contain uppercase and lowercase letters, numbers and
                    specials characters
                  </div>
                </label>

                <label>
                  <span id='signUppasswordConfirm'>Confirm Password</span>{' '}
                  <br />
                  <input
                    type='password'
                    name='passwordConfirm'
                    htmlFor='passwordConfirm'
                    aria-label='passwordConfirm'
                    aria-labelledby='userSignUpForm3 signUppasswordConfirm'
                    value={this.state.passwordConfirm}
                    onChange={this.handleFormInputChange}
                  />
                  <div
                    style={{
                      textAlign: 'center',
                      position: 'absolute',
                      color: '#00171f',
                      background: '#f95f0b',
                      borderRadius: '15px',
                      width: '100%',
                      transition: 'all .4s',
                      lineHeight: '1.2rem',
                      fontSize: '0.6rem',
                      opacity: this.state.passwordConfirmIsValid ? '0' : '1',
                      visibility: this.state.passwordConfirmIsValid
                        ? 'hidden'
                        : 'visible'
                    }}
                  >
                    Confirmation password do not match yet
                  </div>
                </label>

                <div className=' checkboxCont'>
                  <input
                    type='checkbox'
                    style={{width: '18px'}}
                    value='true'
                    name='termAcepted'
                    onChange={this.handleFormInputChange}
                  />
                  <span
                    style={{
                      fontWeight: '300'
                    }}
                  >
                    I accept the{' '}
                    <a
                      aria-label='go and check the term of service'
                      href='#'
                      style={{
                        color: 'white',
                        fontWeight: '600',
                        textDecorationLine: 'none'
                      }}
                    >
                      Terms of service
                    </a>
                  </span>
                </div>
              </form>
            </section>
          )}
        </div>
        <div className='controlButtonLogin'>{controlButtons}</div>
      </UserManageForm>

      // <Layout //TODO: check in production
      //   ref={this.formLayoutRef}
      //   className="formLayout"
      //   onClick={this.props.onCancelClick}
      // >
      //   <FormCard
      //     layoutH={this.state.layoutH}
      //     className="formCard "
      //     onClick={e => {
      //       e.stopPropagation();
      //     }}
      //   >

      //   </FormCard>
      // </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedUserName: state.logInStatus.loggedUserName,
    isUserLoggedIn: state.logInStatus.isUserLoggedIn,
    loggedUserAvatar: state.logInStatus.loggedUserAvatar
  }
}
const mapDispachToProps = dispach => {
  return {
    //acciones
    onLogIn: payload => dispach({type: 'LOGGED_IN', payload: payload}),
    setDialog: dialogObj => dispach({type: 'SET_DIALOG', payload: dialogObj})
  }
}

export default connect(mapStateToProps, mapDispachToProps)(SignUpForm)

// export default SignUpForm;
