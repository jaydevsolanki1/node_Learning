const validationForm = (req, res) => {
  res.render("validation");
};
const validationSubmit = (req, res) => {
  res.send(req.body);
  console.log("✅ Form Submitted Successfully");
};

export { validationForm, validationSubmit };
