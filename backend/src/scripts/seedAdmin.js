import bcrypt from "bcryptjs";
import "../config/loadEnv.js";
import { connectDatabase } from "../config/db.js";
import { User } from "../models/User.js";

const adminSeedEmail =
  process.env.ADMIN_EMAIL || "admin@virabhadraportfolio.com";
const adminSeedPassword = process.env.ADMIN_PASSWORD || "Admin@12345";

const seed = async () => {
  await connectDatabase();

  const passwordHash = await bcrypt.hash(adminSeedPassword, 12);

  await User.findOneAndUpdate(
    { email: adminSeedEmail },
    {
      name: "Virbhadra Khobare",
      email: adminSeedEmail,
      passwordHash,
      role: "admin",
      title: "Full Stack Developer | AI/ML Enthusiast | Software Engineer",
      githubUrl: "https://github.com/VirbhadraKhobare",
      leetcodeUrl: "https://leetcode.com/virabhadra07",
      codeforcesUrl: "https://codeforces.com/",
    },
    { upsert: true, new: true },
  );

  console.log("Admin user seeded:", adminSeedEmail);
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
