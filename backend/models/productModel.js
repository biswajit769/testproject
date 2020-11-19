import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    shortdescription:{ type: String, required: true },
    hdate:{ type: Date, required: true },
    pcategory:[
      {
        id: { type: String, required: true },
        isChecked: { type: Boolean, required: true },
        value: { type: String, required: true },
      },
    ],
    ecategory:[
      {
        id: { type: String, required: true },
        isChecked: { type: Boolean, required: true },
        value: { type: String, required: true },
      },
    ],
    ecategoryids:{ type: Array, required: true },
    pcategoryids:{ type: Array, required: true },
    hostname:{ type: String, required: true },
    hostuserid:{ type: String, required: true },
    pageaction:{ type: String, required: true },
    ticketCancellationPolicy:{ type: String, required: true }
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;
