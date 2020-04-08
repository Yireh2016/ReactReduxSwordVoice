import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'

//other Reducers
import login from './login'
import article from './article'
import blog from './blogReducer'
import responsiveDialog from './responsiveDialog'
import dialog from './dialogReducer'
import scroll from './scrollReducer'
import resize from './resizeReducer'

export default history =>
  combineReducers({
    router: connectRouter(history),
    logInStatus: login,
    article: article,
    blog: blog,
    responsiveDialog: responsiveDialog,
    dialog: dialog,
    resize: resize,
    scroll: scroll
  })
