import {store} from '../cms.index'

const setDialog = obj => {
  store.dispatch({type: 'SET_DIALOG', payload: obj})
}

const triggerDialog = ({title, body, auto = false, time = 2000}, callback) => {
  setDialog({title, body, status: auto, show: true})

  if (auto) {
    setTimeout(() => {
      setDialog({title, body, show: false, status: false})
      callback && callback()
    }, time)
  } else {
    callback && callback()
  }
}

export default triggerDialog
