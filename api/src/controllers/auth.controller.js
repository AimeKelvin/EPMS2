import db from "../config/db.js";

export function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE Email = ? AND Password = ?";

  db.query(sql, [email, password], (err, rows) => {
    if (err) return res.status(500).json({ message: "Login failed", error: err });

    if (rows.length === 0) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    const user = rows[0];
    req.session.user = {
      id: user.UserId,
      name: user.FullName,
      email: user.Email
    };

    res.json({ message: "Login successful", user: req.session.user });
  });
}

export function me(req, res) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }
  res.json(req.session.user);
}

export function logout(req, res) {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
}
