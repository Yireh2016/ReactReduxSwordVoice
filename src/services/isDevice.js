const isDevice = () => {
  const winWidth = window.outerWidth;
  let device;

  if (winWidth <= 700) {
    device = "phone";
  } else if (winWidth > 700 && winWidth < 1050) {
    device = "tablet";
  } else {
    device = "pc";
  }
  return device;
};

export default isDevice;
