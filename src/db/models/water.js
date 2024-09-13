import { model, Schema } from 'mongoose';

const waterRecordSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users', 
        required: true 
      },
      amount: {
        type: Number, 
        required: true,
        min: 0.05    
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
      date: {
        type: String, 
        required: true
      },
      dailyWaterRate: {
        type: Number, 
        required: true,
        min: 1,
        max: 10
      }
},{
    timestamps: true,
    versionKey: false, 
  });

export const WaterCollection = model('WaterRecord', waterRecordSchema);
