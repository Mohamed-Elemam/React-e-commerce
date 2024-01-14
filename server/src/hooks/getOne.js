import { errorHandling } from "../../utils/errorHandling.js";


export const getOne = (model , name) => {
    
 return   errorHandling( async (req, res, next) => {
        const { _id } = req.params;
      
        const document = await model.findById(_id)
          !document&&next(new Error(` ${name} not found`,{statusCode:404}))
          let filter = {}
          if(document){
              filter[name]=document
          }
        document&& res.status(201).json({ message:'done', ...filter});
      
      
      })
}