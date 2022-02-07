import axios from "axios";
import image from "terminal-image";

export async function getPhoto() {
  let res = await axios.get(
    "https://avatars.githubusercontent.com/u/34713212?s=400&u=bfd01a0cd25ef18896f52ad5e41acb6e155c8946&v=4",
    { responseType: "arraybuffer" }
  );
  return console.log(
    await image.buffer(res.data, { width: "100%", height: "100%" })
  );
}
