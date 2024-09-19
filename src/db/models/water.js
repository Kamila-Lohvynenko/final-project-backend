import { model, Schema } from 'mongoose';

const waterRecordSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.05,
      max: 10000,
    },
    day: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([1-9]|[12]\d|3[01])$/.test(v);
        },
        message: 'Invalid day format (should be between 01 and 31)',
      },
    },
    month: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([1-9]|1[0-2])$/.test(v);
        },
        message: 'Invalid month format (should be between 01 and 12)',
      },
    },
    year: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{4}$/.test(v);
        },
        message: 'Invalid year format (should be a four-digit number)',
      },
    },
    time: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(v);
        },
        message: 'Invalid time format (should be hh:mm)',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const WaterCollection = model('waters', waterRecordSchema);
