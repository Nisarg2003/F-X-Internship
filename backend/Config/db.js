import mongoose from "mongoose";
import colors from "colors";

const connectDb = async() => {
    try {
        const conn = await mongoose.connect("mongodb+srv://nisarg623:O2629PtetVNXYQwj@to-do.xij6y3a.mongodb.net/");
        console.log(
          `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
        );
      } catch (error) {
        console.log(`Errro in Mongodb ${error}`.bgRed.white);
      }
}    

export default connectDb