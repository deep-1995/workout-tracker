const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  date: {
    type: Date,
    default: () => new Date(),
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "please enter your workout type",
      },
      name: {
        type: String,
        trim: true,
        required: "please enter your workout name",
      },
      distance: Number,
      duration: Number,
      weight: Number,
      sets: Number,
      reps: Number,
    },
  ],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
