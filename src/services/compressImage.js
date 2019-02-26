import Compressor from "compressorjs";
//services
import isBrowser from "./isBrowser";

const compressImage = (
  files,
  imgQuality,
  imgW,
  imageUploadCB,
  imageUploadErrCB
) => {
  let Uploadfunction = imageUploadCB;
  let imageUploadErr = imageUploadErrCB;
  const browser = isBrowser();
  const shouldCompress = browser === "ie" || browser === "edge" ? false : true;

  const image = files[0] ? files[0] : files;

  if (shouldCompress) {
    new Compressor(image, {
      quality: imgQuality,
      width: imgW,
      mimeType: "jpg",
      convertSize: 200000,
      success(result) {
        Uploadfunction(result);
      },
      error(err) {
        console.log("error", err);
        imageUploadErr(err);
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
    console.log("cargando imagen sin comprimir");
    Uploadfunction(files[0]);
  }
};

export default compressImage;
