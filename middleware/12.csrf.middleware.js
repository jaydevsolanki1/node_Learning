import csrf from "csurf";

// CSRF Middleware
const csrfProtection = csrf({
  cookie: false, // Store token in Session
});

export default csrfProtection;
