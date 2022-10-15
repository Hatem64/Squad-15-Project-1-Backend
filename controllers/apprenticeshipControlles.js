import Apprenticeship from "../model/Apprenticeship.js";

const createApprenticeship = async (req, res) => {
  try {
    const apprenticeship = await Apprenticeship.create(req.body);
    res.status(201).json(apprenticeship);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export { createApprenticeship };
