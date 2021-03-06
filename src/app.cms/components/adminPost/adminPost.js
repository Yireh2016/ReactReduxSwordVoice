import React, {Component} from 'react'
import ReactTable from 'react-table'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
//css
import 'react-table/react-table.css'
import './adminPost.css'
//components
import Loading from '../loading/loading'
import Modal from '../../common/components/modal/modal'
//assets
import edit from '../../assets/createPost/edit.svg'
import del from '../../assets/createPost/delete.svg'
//services
import keywordsToArr from '../../../services/keywordsToArr'
import dbDateToNormalDate from '../../../services/dbDateToNormalDate'
import dbDateToDatetime from '../../../services/dbDateToDatetime'

class AdminPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDataFetched: false,
      posts: {},
      showDeleteModal: false,
      deletionProjectName: ''
    }
  }
  dataFetched = posts => {
    this.setState({isDataFetched: true, posts: posts})
  }
  getPostsFromDb = () => {
    const dataFetchedFunction = this.dataFetched

    axios('/api/getPosts/')
      .then(res => {
        if (res.status === 200) {
          dataFetchedFunction(res.data)
        }
      })
      .catch(err => {
        console.log('error ', err)
      })
  }
  componentDidMount() {
    this.getPostsFromDb()
  }

  updateReduxState = data => {
    let arr = keywordsToArr(data.keywords)
    const reduxStateFromDB = {
      author: data.author,
      elements: data.elements,
      seo: {
        keywords: data.keywords,
        keywordsList: arr,
        description: data.description,
        title: data.title
      },
      summary: data.description,
      project: {
        name: data.projectName,
        url: data.url
      },
      files: data.files,
      thumbnail: data.thumbnail,
      isPublished: data.isPublished
    }

    this.props.onPostFetch(reduxStateFromDB)
    this.props.history.push('/cms/createPost')
  }
  projectNameClickHandler = (e, props) => {
    const updateReduxState = this.updateReduxState
    const changeMenu = this.props.onMenuChange
    this.setState({isDataFetched: false})

    axios(`/api/getPosts/${props.original.projectName}`)
      .then(res => {
        if (res.status === 200) {
          updateReduxState(res.data)
          changeMenu({
            main: false,
            create: true,
            exitBtn: ['Exit', 'Blog', 'Home', 'Log Out']
          })
        }
      })
      .catch(err => {
        console.log('error ', err)
      })
  }
  deletePostConfirmation = name => {
    console.log('name from deletePostConfirmation', name)

    const getPostsFromDb = this.getPostsFromDb
    this.setState({isDataFetched: false})
    axios
      .delete(`/api/deletePost/${name}`)
      .then(res => {
        console.log('res from deletePostConfirmation', res)
        if (res.status === 204) {
          getPostsFromDb()
        }
      })
      .catch(err => {
        console.log('error ', err)
      })
  }
  onDeleteClick = (e, props) => {
    this.setState({
      showDeleteModal: true,
      deletionProjectName: props.original.projectName
    })
  }

  onEditClick = (e, props) => {
    this.projectNameClickHandler(e, props)
  }
  modalHandler = () => {
    this.setState(prevState => {
      return {showDeleteModal: !prevState.showDeleteModal}
    })
  }
  deleteAndCancel = deletePost => {
    if (deletePost) {
      console.log(
        'from deleteAndCancel  this.state.deletionProjectName',
        this.state.deletionProjectName
      )
      this.deletePostConfirmation(this.state.deletionProjectName)
    }

    this.setState({showDeleteModal: false})
  }
  render() {
    const articleData = this.state.posts
    const DeleteAndCancelBtn = () => {
      return (
        <React.Fragment>
          <button onClick={() => this.deleteAndCancel(true)} type='button'>
            Delete Post
          </button>
          <button onClick={() => this.deleteAndCancel(false)} type='button'>
            Cancel
          </button>
        </React.Fragment>
      )
    }
    const columns = [
      {
        Header: 'Title',
        accessor: 'title',
        maxWidth: 300,
        Cell: props => {
          return (
            <div
              onClick={e => {
                this.projectNameClickHandler(e, props)
              }}
              className='talbeColumnElement tableNameElement'
              title={props.value}
            >
              {props.value}
            </div>
          )
        } // Custom cell components
      },
      {
        Header: 'Is Published?',
        accessor: 'isPublished',
        maxWidth: 400,
        Cell: props => {
          return (
            <div className='tableColumnElement'>
              {props.value && `${props.value}`}
            </div>
          )
        } // Custom cell components!
      },
      {
        Header: 'Summary',
        accessor: 'description',
        maxWidth: 600,
        Cell: props => {
          return (
            <div className='talbeColumnElement' title={props.value}>
              {props.value}
            </div>
          )
        } // Custom cell components
      },
      {
        Header: 'Author',
        accessor: 'author',
        maxWidth: 300,
        Cell: props => {
          return (
            <div className='talbeColumnElement' title={props.value}>
              {props.value}
            </div>
          )
        }
      },
      {
        Header: 'Last Edition By',
        accessor: 'editionHistory',
        maxWidth: 300,
        Cell: props => {
          const len = props.value.length
          return (
            <div
              className='talbeColumnElement'
              title={props.value[len - 1] && props.value[len - 1].editor}
            >
              {props.value[len - 1] && props.value[len - 1].editor}
            </div>
          )
        }
      },
      {
        Header: 'Date',
        accessor: 'date',
        maxWidth: 1000,
        Cell: props => {
          const date = props.value
            ? `${dbDateToNormalDate(props.value)} ${dbDateToDatetime(
                props.value
              )}`
            : ''

          return (
            <div className='talbeColumnElement' title={date}>
              {date}
            </div>
          )
        } // Custom cell components
      },
      {
        Header: 'Last Edition on',
        accessor: 'editionHistory',
        maxWidth: 1000,
        Cell: props => {
          const len = props.value.length
          const date = props.value[len - 1]
            ? `${dbDateToNormalDate(
                props.value[len - 1].date
              )} ${dbDateToDatetime(props.value[len - 1].date)}`
            : ''

          return (
            <div className='talbeColumnElement' title={date}>
              {date}
            </div>
          )
        } // Custom cell components
      },
      {
        Header: 'Program Date',
        accessor: 'programDate',
        maxWidth: 1000,
        Cell: props => {
          const date = props.value
            ? `${dbDateToNormalDate(props.value)} ${dbDateToDatetime(
                props.value
              )}`
            : '' //datetime OJO
          return (
            <div className='talbeColumnElement' title={date}>
              {date}
            </div>
          )
        } // Custom cell components
      },
      {
        Header: 'Control',
        maxWidth: 300,
        Cell: props => {
          return (
            <div className='tableControlBtnLay'>
              <span
                className='tableControlBtnAction'
                onClick={e => {
                  this.onEditClick(e, props)
                }}
              >
                <img className='tableControlBtn' src={edit} alt='Edit Post' />
              </span>
              <span
                className='tableControlBtnAction'
                onClick={e => {
                  this.onDeleteClick(e, props)
                }}
              >
                <img className='tableControlBtn' src={del} alt='Delete Post' />
              </span>
            </div>
          )
        } // Custom cell components
      }
    ]
    if (this.state.isDataFetched)
      return (
        <div className='reactTableLay'>
          <ReactTable
            style={
              this.props.device === 'phone'
                ? {padding: '3vmin'}
                : {padding: '10vmin'}
            }
            data={articleData}
            columns={columns}
            className='-striped -highlight'
            defaultPageSize={10}
          />
          {this.state.showDeleteModal && (
            <Modal
              title='Warning'
              body='Are you sure you want to delete the post?'
              isVisible={this.state.deleteMode}
              modalHandler={this.modalHandler}
            >
              <DeleteAndCancelBtn />
            </Modal>
          )}
        </div>
      )

    return <Loading fullscreen={true} />
  }
}

const mapStateToProps = state => {
  return {
    elements: state.postCreation.elements,
    seo: state.postCreation.seo,
    summary: state.postCreation.summary,
    login: state.login,
    project: state.postCreation.project,
    files: state.postCreation.files,
    device: state.resize.device
  }
}
const mapDispachToProps = dispach => {
  return {
    //acciones
    onPostFetch: payload => dispach({type: 'FETCH_POST', payload: payload}),
    onMenuChange: payload => dispach({type: 'CHANGE_MENU', payload: payload})

    // onProjectNameEdition: payload =>
    //   dispach({ type: "PROJECT_NAME_EDITION", payload: payload }),
    // onProjectURLEdition: payload =>
    //   dispach({ type: "PROJECT_URL_EDITION", payload: payload })
  }
}

const AdminPost2 = connect(mapStateToProps, mapDispachToProps)(AdminPost)
export default withRouter(AdminPost2)
