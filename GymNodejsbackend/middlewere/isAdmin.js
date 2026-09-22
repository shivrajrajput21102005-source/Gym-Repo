export const isadmin = (roles) => {
  return (req, res, next) => {
    const { reqbody } = req.body;
    const ishavrole = roles.some((role) => req.user.role.includes(role));

    if (!ishavrole) {
      return res.status(400).json({ code: "you are not admin lavde ke bal" });
    }

    next();
  };
};
