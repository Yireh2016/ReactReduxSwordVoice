const blobToBase64 = (blob, callback) => {
  let reader = new FileReader();
  reader.onloadend = () => {
    const base64 = reader.result;
    const base64Obj = {
      url: base64
    };
    callback(base64Obj);
  };
  reader.readAsDataURL(blob);
};

export default blobToBase64;
