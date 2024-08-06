const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  getQuestion,
  validateAnswer,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
router.get("/question",getQuestion);
router.post("/validate-answer", validateAnswer);

module.exports = router;
