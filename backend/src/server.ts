import app from "./app";
import { PORT } from "./config/env";
import { connectDB } from "./db/dbconnection";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(` Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
