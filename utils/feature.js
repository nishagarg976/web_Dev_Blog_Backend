import jwt from 'jsonwebtoken';

export const generateCookie = (user, res, statusCode = 200, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET )
  // const token = jwt.sign({ _id: user._id }, '!@#$%^&*()')

  console.log(token);

  res.status(201).cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 10, //expires in 10 min
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",  //agar develpoment mode me h to cookie mil jayegi
    secure: process.env.NODE_ENV === "Development" ? false : true
  }).json({
    success: true,
    "message": message,
  })
}
