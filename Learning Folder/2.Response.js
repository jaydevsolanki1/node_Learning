//________REPONSE METHODS
app.get("/", (req, res) => {
  res.send("<h1>Response Methods: </h1><br  >");
});
//1. send methods return json,array,text,object,..
app.get("/SendMethods", (req, res) => {
  res.send({ name: "jaydev", age: 21 });
}); //return Object
app.get("/send2Methods", (req, res) => {
  res.send(["jaydev", "ram", "kalu"]);
}); //return Array
//2.json methods return only json
app.get("/jsonMethods", (req, res) => {
  res.json({ name: "jaydev", age: 21 });
}); //return json only
app.get("/jsonconstMethods", (req, res) => {
  const users = [
    { name: "jaydev", age: 21 },
    { name: "nikhil", age: 25 },
  ];
  res.json(users);
}); //return json in const methods
//3. jsonp but not more probably use in multiple domain use or api but not secure
//jsonp in as a function use like http://localhost:3000/jsonpMethods?callback=myFunction  //result is : /**/ typeof myFunction === 'function' && myFunction({"name":"jaydev","age":21});
app.get("/jsonpMethods", (req, res) => {
  res.jsonp({ name: "jaydev", age: 21 });
}); //return same as json only
//4.redirect methods return any page to direct              - when search : http://localhost:3000/redirectMethod   result is about page            others add to like www.google.com this time in google home page in
//other parameter use like:   this websites is parment show in this formate use parameter like :  app.get(('/redirectMethod'),(req,res)=>{res.redirect(301,'/About')})            & course in        redirect   (.. )  back any website previous time to open this show
//301 : parment       302 : temporary          303 : temporary like login page after another page       307 : not get methods in    308 : same as 307               main is 301,302,303
app.get("/redirectMethod", (req, res) => {
  res.redirect(301, "/About");
}); //return another website,anther file in direct only
// 5.render Methods         //return html page like index.html         but you install template engline  cmd is npm install egs
// NOTE: NAME IS SAME ALL PLACE. it's html menas ejs file show make this view folder in you show as right side.
app.set("view engine", "ejs");
app.get("/renderMethod", (req, res) => {
  res.render("renderMethod");
}); //return show html like renderMehtods.ejs  //engine templete use
// 6. download methods      //return as a pdf file downloaded               //2 parameter is show the use name is 'Document.pdf' not sample...  it's normal but real time in past in link    and one more this is relted path : './Files/sample-local-pdf.pdf','Document.pdf'
app.get("/downloadMethods", (req, res) => {
  res.download("./Files/sample-local-pdf.pdf", "Document.pdf");
}); //return pdf dowlend only
// 7. sendfileMethods   //download and sendfiles in mejor diffrent is download is direct downloas and  sendfiles is new tab is open
app.get("/sendFileMethods", (req, res) => {
  res.sendFile(__dirname + "/Files/sample-local-pdf.pdf");
}); // return new tab pdf file
// 8. endmethods        //retirm methods to end         //this is is only testing  : one more is this only simple using complex is after series
app.get("/endMethods", (req, res) => {
  res.write(
    "this is is only testing  : one more is this only simple using complex is after series"
  );
  res.end();
}); //return end the running server and message this is only sample
// 9. sendstatusmethods  // return status  like error show is not fouud
// app.get(('/sendtatusMethods'),(req,res)=>{res.sendStatus(404)})   //return pdf status only       404  'not 'found'              cheack in inspect in network show the status code
app.get("/sendstatusMethods", (req, res) => {
  res.sendStatus(200);
}); // retuen another stusa   like 200  'ok'                       cheak also         ||
// 9. statusmethods  // return status  like error show is ok        //same as but this is custimise status show too.
// show methods sytax this is between use .
app.get("/statusMethods", (req, res) => {
  res.status(200).send("Hello this is custmize error");
}); // retuen another stusa   like 200  'ok'                       cheak also         ||
// 10. headersent methods          // return response answer            //terminal in show is false and true when response anser is true
app.get("/hederSentMethods", (req, res) => {
  console.log(res.headersSent);
  res.send("hello").console.log(res.headersSent);
}); //return response
// 11. setmethods  & getmethods too       //return response           //first para. is varibels           //second is message parameter as a response
// show the message in terminal and console log and response as a message like header-sent in server
app.get("/setmethods&getmethods", (req, res) => {
  res.set(
    "custom-header",
    "hello demo as first is varible para. andsecond is message pass "
  );
  console.log(res.get("custom-header"));
  res.send("Hedaer-send");
});
