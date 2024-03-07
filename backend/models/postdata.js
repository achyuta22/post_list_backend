const mongoose = require("mongoose");
// const postsdata=require("../")
const GirlImages = [
  {
    description:
      "A young woman with long brown hair, wearing a cozy sweater, sitting on a bench in a park and smiling.",
    image: "https://images.pexels.com/photos/3348748/pexels-photo-3348748.jpeg",
    likes: "100K likes",
    location: "United States",
  },
  {
    description:
      "A girl with short hair, holding a vintage film camera, looking thoughtfully into the distance.",
    image: "https://images.pexels.com/photos/3812944/pexels-photo-3812944.jpeg",
    likes: "800K likes",
    location: "France",
  },
  {
    description:
      "A beautiful girl wearing glasses, standing in a library surrounded by books, with a curious expression.",
    image: "https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg",
    likes: "8M likes",
    location: "Germany",
  },
  {
    description:
      "A redhead girl with freckles, standing outdoors in a field of flowers, enjoying the sunlight.",
    image: "https://images.pexels.com/photos/3228213/pexels-photo-3228213.jpeg",
    likes: "9M likes",
    location: "Italy",
  },
  {
    description:
      "A girl in a stylish black dress, posing confidently in front of a graffiti-covered wall.",
    image: "https://images.pexels.com/photos/1385472/pexels-photo-1385472.jpeg",
    likes: "8.3M likes",
    location: "Switzerland",
  },
  {
    description:
      "A young woman sitting elegantly on a chair, with a thoughtful expression, surrounded by nature.",
    image: "https://images.pexels.com/photos/4725133/pexels-photo-4725133.jpeg",
    likes: "9.2M likes",
    location: "Greece",
  },
];

const userSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },
  likes: {
    type: String,
  },
  location: {
    type: String,
  },
});
const post = mongoose.model("postsdata", userSchema);
const addingImages = async () => {
  const imagesAdding = await post.insertMany(GirlImages);
  console.log(imagesAdding);
};
addingImages();
module.exports = post;
