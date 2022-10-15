import User from "../model/User.js";

export const login = async (req, res, next) => {
  // GET EMAIL AND PASSWORD FROM REQUEST
  const { email, password } = req.body;
  try {
    // CHECK EMAIL AND PASSWORD EXISTS
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }
    // FIND USER BY EMAIL
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("No such user");
    // CHECK IF ACCOUNT IS VERIFIED
    if (!user.verified) {
      return CreateAndSendEmailVerification(user, req, res);
    }

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("Invalid email or password");
    }
    // CREATE AND SEND NEW JWT TOKEN
    createSendToken(user, 200, res, req);
  } catch (error) {
    res.status(400).json(fail(error.message));
  }
};
