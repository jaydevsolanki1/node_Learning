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
    const contacts = await Contact.find();

    res.render("contacts", {
      layout: "layout",
      title: "All Contacts",
      contacts,
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
      name: "Web Development",
      description: "Responsive and modern websites",
    },
    {
      name: "Mobile Apps",
      description: "iOS and Android applications",
    },
    {
      name: "SEO Optimization",
      description: "Boost your search rankings",
    },
    {
      name: "UI/UX Design",
      description: "Beautiful and user-friendly designs",
    },
    {
      name: "Video Editing",
      description: "Capture motion professionally",
    },
    {
      name: "Graphic Design",
      description: "Creative visual designs",
    },
  ];

  res.render("Link_nav/services", {
    layout: "layout",
    title: "Services",
    services,
  });
};
// router.get("/show_contact", (req, res) => {
//   render404(res, "Please provide Contact ID");
// });

// router.get("/edit_contact", (req, res) => {
//   render404(res, "Please provide Contact ID");
// });

// router.get("/update_contact", (req, res) => {
//   render404(res, "Please provide Contact ID");
// });

// router.get("/delete_contact", (req, res) => {
//   render404(res, "Please provide Contact ID");
// });

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
