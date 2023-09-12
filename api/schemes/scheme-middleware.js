const Scheme = require("./scheme-model");

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const existing = await Scheme.findById();
    if (existing) {
      next();
    } else {
      next({
        status: 404,
        message: `scheme with scheme_id ${req.params.id} not found`,
      });
    }
  } catch (err) {
    next(err);
  }
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { schemeName } = req.body;
  if (!schemeName || schemeName.trim() === null) {
    res.status(400).json({ message: "invalid scheme name" });
  } else {
    next();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, stepNumber } = req.body;
  if (
    !instructions ||
    instructions.trim() === null ||
    typeof instructions !== "string" ||
    typeof stepNumber !== "number" ||
    stepNumber < 1
  ) {
    res.status(400).json({ message: "invalid step" });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
