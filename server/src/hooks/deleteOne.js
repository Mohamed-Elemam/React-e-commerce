import { errorHandling } from "../../utils/errorHandling.js";

export const deleteOne = (model, name) => {
  return errorHandling(async (req, res, next) => {
    const { _id } = req.params;

    const document = await model.findByIdAndDelete(_id);
    !document && res.status(404).json({ message: `${name} not found` });
    document &&
      res.status(201).json({ message: `${name} deleted successfully` });
  });
};
