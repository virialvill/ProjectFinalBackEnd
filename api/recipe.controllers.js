const mongoose = require("mongoose");
const Recipe = mongoose.model("Recipe");

exports.findAll = function (req, res) {
  Recipe.find({}, function (err, results) {
    return res.send(results);
  });
};

exports.findById = (req, res) => {
  const id = req.params.id;
  Recipe.findOne({ _id: id }, (err, json) => {
    if (err) return console.log(err);
    return res.send(json);
  });
};

exports.add = function (req, res) {
  Recipe.create(req.body, function (err, recipe) {
    if (err) return console.log(err);
    return res.send(recipe);
  });
};

exports.update = function (req, res) {
  console.log(req.body);
  const id = req.params.id;
  Recipe.findByIdAndUpdate(id, req.body, { new: true }, (err, response) => {
    if (err) return console.log(err);
    res.send(response);
  });
};

exports.delete = function (req, res) {
  let id = req.params.id;
  Recipe.deleteOne({ _id: id }, () => {
    return res.sendStatus(202);
  });
};

exports.upload = function (req, res) {
  console.log(req.files);
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let file = req.files.file;
  file.mv(`./public/img/${req.body.filename}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ file: `public/img/${req.body.filename}` });
    console.log(" res.json", res.json);
  });
};

exports.import = function (req, res) {
  Recipe.create(
    {
      title: "MOMA Museum",
      description:
        "It plays a major role in developing and collecting modern art, and is often identified as one of the largest and most influential museums of modern art in the world.",
      adress: "11 W 53rd St, New York, NY 10019",
      phone: "(212)570-3600",
      image: "moma.jpg",
      year: "2015",
    },
    {
      title: "MET Museum",
      description:
        'The Metropolitan Museum of Art of New York City, colloquially "the Met",[a] is the largest art museum in the United States. Its permanent collection contains over two million works,divided among 17 curatorial departments.',
      adress: "1000 5th Ave, New York, NY 10028",
      phone: "(212)535-7710",
      image: "metp.jpg",
      year: "2016",
    },

    {
      title: "Frick Collection",
      description:
        "The Frick Collection is an art museum in New York City. Its permanent collection features Old Master paintings and European fine and decorative arts, including works by Bellini, Fragonard, Goya, Rembrandt, Turner, Velázquez, Vermeer, and many others.",
      adress: "1 E 70th St, New York, NY 10021",
      phone: "(212)288-0700",
      image: "frickC.jpg",
      year: "2017",
    },

    {
      title: "Whitney Museum",
      description:
        "The Whitney Museum of American Art, known informally as The Whitney, is an art museum in the Meatpacking District and West Village neighborhoods of Manhattan in New York City.",
      adress: "99 Gansevoort St, New York, NY 10014",
      phone: "(212)570-3600",
      image: "whitney.jpg",
      year: "2018",
    },
    function (err) {
      if (err) return console.log(err);
      return res.sendStatus(201);
    }
  );
};

exports.killall = function (req, res) {
  Recipe.deleteMany({}, (err) => {
    if (err) return console.log(err);
    return res.sendStatus(202);
  });
};
