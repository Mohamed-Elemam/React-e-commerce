export const errorHandling = (api) => {
  return (req, res, next) => {
    api(req, res, next).catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "failed", err });
    });
  };
};
