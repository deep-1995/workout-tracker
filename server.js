const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3006;
const db = require("./models");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

require("./routes/html-routes.js")(app);

// API routes needed

/*
"/api/workouts/range" {GET}
*/

app.get("/api/workouts", (req, res) => {
  db.Workout.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

app.post("/api/workouts", ({ body }, res) => {
  console.log(body);
  db.Workout.create({}).then((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .sort({ _id: 1 })
    .limit(7)
    .then((err, data) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(data);
      }
    });
});

app.put("/api/workouts/:id", (req, res) => {
  db.Workout.update(
    {
      _id: mongoose.ObjectId(req.params.id),
    },
    {
      $set: {
        header: req.body.headerData,
        modified: Date.now(),
      },
    },
    (err, data) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(data);
      }
    }
  );
});

app.delete("/api/workouts/:id", (req, res) => {
  db.Workout.remove(
    {
      _id: mongoose.ObjectId(req.params.id),
    },
    (err, data) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(data);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
