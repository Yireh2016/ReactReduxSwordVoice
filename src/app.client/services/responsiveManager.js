const whichDevice = windowObjWidth => {
  if (windowObjWidth > 1050) {
    return 'pc'
    //pc
  } else if (windowObjWidth > 700) {
    //tablet
    return 'tablet'
  } else {
    //movil
    return 'movil'
  }
}

export default whichDevice
