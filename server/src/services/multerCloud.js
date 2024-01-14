
import multer from "multer";


export const allowedExtensions ={
 Image : ['image/jpeg','image/jpg', 'image/gif' ,'image/png'],
 files:['application/pdf'],
 videos:['video/mp4','video/mkv']
}
export const multerFunction = (allowedExtensionsArr) => {
  const storage = multer.diskStorage({  });


  //file filter
 const fileFilter = (req, file, cb) => {
  if (allowedExtensionsArr.includes( file.mimetype)) {
    return cb(null, true);
  } else {
    cb(new Error("invalid extension"), false);
  }
};


  const fileUpload = multer({ fileFilter, storage });

  return fileUpload;
};


