import Contact from "../models/contact.models.js";
import mongoose from "mongoose";

// ==========================================
// Error Helpers
// ==========================================

const render404 = (res, message = "Page Not Found") => {
  return res.status(404).render("error/404", {
    layout: "layout",
    title: "404 Error",
    message,
  });
};

const render500 = (res, error) => {
  console.error(error);

  return res.status(500).render("error/500", {
    layout: "layout",
    title: "500 Error",
    message: error.message || "Internal Server Error",
  });
};

// ==========================================
// Common Contact Checker
// ==========================================

const findContact = async (id, res) => {
  // Error 1
  if (!mongoose.Types.ObjectId.isValid(id)) {
    render404(res, "Invalid Contact ID");
    return null;
  }

  const contact = await Contact.findById(id);

  // Error 2
  if (!contact) {
    render404(res, "Contact Not Found");
    return null;
  }

  return contact;
};

// ==========================================
// Home Page
// ==========================================

const getRouter = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const options = {
      // page:1,
      page: parseInt(page),
      // limit:5
      limit: parseInt(limit),
    };

    // const contacts = await Contact.find();
    const resultC = await Contact.paginate({}, options); //__________paginate is work as plug in from npm for pagination

    // res.send(resultC);___________________check this page how result show like console

    res.render("contacts", {
      layout: "layout",
      title: "All Contacts",
      // contacts,__________________this line is comment because same line as it is in the last line so comment out to...
      // totalDocs: 10,
      totalDocs: resultC.totalDocs,
      // limit: 5,
      limit: resultC.limit,
      // totalPages: 2,
      totalPages: resultC.totalPages,
      // page: 1,
      page: resultC.page,
      // pagingCounter: 1,
      pagingCounter: resultC.pagingCounter,
      // hasPrevPage: false,
      hasPrevPage: resultC.hasPrevPage,
      // hasNextPage: true,
      hasNextPage: resultC.hasNextPage,
      // prevPage: null,
      prevPage: resultC.prevPage,
      // nextPage: 2,
      nextPage: resultC.nextPage,
      contacts: resultC.docs,
    });
  } catch (error) {
    render500(res, error);
  }
};

// ==========================================
// Add Contact Page
// ==========================================

const getContact = (req, res) => {
  res.render("Components/add_contact", {
    layout: "layout",
    title: "Add Contact",
  });
};

// ==========================================
// Create Contact
// ==========================================

const postContact = async (req, res) => {
  try {
    await Contact.create(req.body);
    res.redirect("/");
  } catch (error) {
    render500(res, error);
  }
};

// ==========================================
// Show Contact
// ==========================================
const showContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return render404(res, "Please provide Contact ID");
    }

    const contact = await findContact(id, res);

    if (!contact) return;

    res.render("Components/show_contact", {
      layout: "layout",
      title: "Contact Details",
      contact,
    });
  } catch (error) {
    render500(res, error);
  }
};
// ==========================================
// Edit Contact
// ==========================================

const editContact = async (req, res) => {
  try {
    const contact = await findContact(req.params.id, res);

    if (!contact) return;

    res.render("edit_contact", {
      layout: "layout",
      title: "Edit Contact",
      contact,
    });
  } catch (error) {
    render500(res, error);
  }
};

// ==========================================
// Update Contact Form
// ==========================================

const updateContact = async (req, res) => {
  try {
    const contact = await findContact(req.params.id, res);

    if (!contact) return;

    res.render("Components/update_contact", {
      layout: "layout",
      title: "Update Contact",
      contact,
    });
  } catch (error) {
    render500(res, error);
  }
};

// ==========================================
// Save Updated Contact
// ==========================================

const postupdateContact = async (req, res) => {
  try {
    const contact = await findContact(req.params.id, res);

    if (!contact) return;

    await Contact.findByIdAndUpdate(
      req.params.id,
      {
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.redirect("/");
  } catch (error) {
    render500(res, error);
  }
};

// ==========================================
// Delete Contact
// ==========================================

const deleteContact = async (req, res) => {
  try {
    const contact = await findContact(req.params.id, res);

    if (!contact) return;

    await Contact.findByIdAndDelete(req.params.id);

    res.redirect("/");
  } catch (error) {
    render500(res, error);
  }
};

// ==========================================
// About Page
// ==========================================

const aboutBar = (req, res) => {
  res.render("Link_nav/about", {
    layout: "layout",
    title: "About",
    team: [
      {
        name: "Ace",
        role: "CEO",
        bio: "Leader and visionary",
        photo: "/images/alice.jpg",
      },
      {
        name: "Zoro",
        role: "CTO",
        bio: "Tech guru",
        photo: "/images/bob.jpg",
      },
    ],
  });
};

// ==========================================
// NodeJS Page
// ==========================================

const nodejsBar = (req, res) => {
  res.render("Link_nav/nodejs", {
    layout: "layout",
    title: "NodeJS",
  });
};

// ==========================================
// Contact Page
// ==========================================
const MaincontactRouter = (req, res) => {
  res.render("Link_nav/contact", {
    layout: "layout",
    title: "Contact",

    name: "",
    email: "",
    message: "",

    success: null,
  });
};

const submitContact = (req, res) => {
  const { name, email, message } = req.body;

  res.render("Link_nav/contact", {
    layout: "layout",
    title: "Contact",
    name,
    email,
    message,
    success: `Hello ${name}, your form has been submitted successfully!`,
  });
};

// ==========================================
// Services Page
// ==========================================

const serachServices = (req, res) => {
  const services = [
    {
      name: "Frontend Development",
      description:
        "Responsive websites using HTML, CSS, JavaScript, Bootstrap and React.",
    },
    {
      name: "Backend Development",
      description: "REST APIs with Node.js, Express.js and MongoDB.",
    },
    {
      name: "Full Stack MERN",
      description:
        "Complete MERN Stack applications with authentication and database integration.",
    },
    {
      name: "Portfolio Website",
      description: "Modern personal portfolios for students and professionals.",
    },
    {
      name: "UI/UX Design",
      description: "Clean, responsive and user-friendly interfaces.",
    },
    {
      name: "Bug Fixing",
      description: "Debugging, optimization and performance improvements.",
    },
  ];

  res.render("Link_nav/services", {
    layout: "layout",
    title: "Services",
    services,
  });
};

export {
  getRouter,
  getContact,
  postContact,
  showContact,
  editContact,
  updateContact,
  postupdateContact,
  deleteContact,
  aboutBar,
  nodejsBar,
  MaincontactRouter,
  submitContact,
  serachServices,
};

// --------------------------------------------------------------------------------
//& ANOTHER WAY TO CODE WRITE AND ABOVE IS UPDATED CODE
// --------------------------------------------------------------------------------

// const updateContact = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Error 1: Invalid ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).render("error/404", {
//         layout: "layout",
//         title: "404 Error",
//         message: "Invalid Contact ID",
//       });
//     }

//     const contact = await Contact.findById(id);

//     // Error 2: Contact Not Found
//     if (!contact) {
//       return res.status(404).render("error/404", {
//         layout: "layout",
//         title: "404 Error",
//         message: "Contact Not Found",
//       });
//     }

//     // Success
//     res.render("Components/update_contact", {
//       layout: "layout",
//       title: "Update Contact",
//       contact,
//     });
//   } catch (error) {
//     // Error 3: Server Error
//     return res.status(500).render("error/500", {
//       layout: "layout",
//       title: "500 Error",
//       message: error.message,
//     });
//   }
// };
