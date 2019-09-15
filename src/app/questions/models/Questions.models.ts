import { Schema, model } from 'mongoose';

const QuestionSchema = new Schema(
    {
      title: {
        type: String,
        required: true
      },
      body: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      },
      answers: {
        type: Array,
      }
    },
    { timestamps: { createdAt: "created_at" } }
);

const QuestionModel = model("Question", QuestionSchema);

export default QuestionModel;
