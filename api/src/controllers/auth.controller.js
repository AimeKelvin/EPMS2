// controllers/authController.js
import db from "../config/db.js";

export const login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE Email = ? AND Password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Login error", error: err });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result[0];

    req.session.user = {
      id: user.UserId,
      fullName: user.FullName,
      email: user.Email,
    };

    res.status(200).json({
      message: "Login successful",
      user: req.session.user,
    });
  });
};

export const me = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.status(200).json(req.session.user);
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
};