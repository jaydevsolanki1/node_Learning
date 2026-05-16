//____________________express request property & methods
//json data                                                     //return body means json
app.use(express.json()); // it's call middleware

app.post("/jsonData", (req, res) => {
  res.send(req.body);
});

//form data
app.use(express.urlencoded({ extended: false })); // middleware is the use of server accepted the urlcode type code

app.post("/formDataBody", (req, res) => {
  res.send(req.body); //return body means json
});
app.get("/formDatahostname", (req, res) => {
  res.send(req.hostname); //return hostname means serer name like local host          it's get not a post
});
app.get("/formDataip", (req, res) => {
  res.send(req.ip); //return ip means ip address like ::1                             it's get not a post
});
app.get("/formDataips", (req, res) => {
  res.send(req.ips); //return ips means ips empty array []                            it's get not a post
});
app.get("/formDatamethods", (req, res) => {
  res.send(req.method); //return methods means methods like get,post                  it's get not a post
});
app.get("/formDataorignalurl", (req, res) => {
  res.send(req.originalUrl); //return url means get after url like /about..           it's get not a post
});
app.get("/formDatapath", (req, res) => {
  res.send(req.path); //return path means only rout like /about after any methods or value pass not show but original url is show all         it's get not a post
});
app.get("/formDataprotocol", (req, res) => {
  res.send(req.protocol); //return protocol means like http ...
});
app.get("/formDatasecure", (req, res) => {
  res.send(req.secure); //return secure means like false  ... when false it's means unsecure protocol when true it's means secure protocol
});
app.get("/formDatamethodsreturn", (req, res) => {
  if (req.accepts("html")) {
    res.send("<h1>Hello html</h1>");
  } else if (req.accepts("json")) {
    res.send({ message: "Hello json" });
  } else if (req.accepts("xml")) {
    res.send("<message>Hello xml</message>");
  } else {
    req.send("content type is not support");
  } //return a what formate data server accept when this is cmd is enter in server return html
});
app.get("/formDataheader", (req, res) => {
  res.send(req.headers); //return  server information using headersmethods
});
app.get("/formDatagetM", (req, res) => {
  res.send(req.get("Host")); //return  server information using get methods     // in this key compulsory
});
app.post("/formDatais", (req, res) => {
  if (req.is("application/json")) {
    res.send("valid json data");
  } else if (req.is("text/html")) {
    res.send("html data");
  } else {
    res.status(400).send("Unsupport content-type");
  } //check data is which format if not any data to return message (customise message or error message)when use get server in show and use post postman software in use
  //and when postman selected json format output is valid json data
});
