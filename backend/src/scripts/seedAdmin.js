import bcrypt from 'bcryptjs';
import { connectDatabase } from '../config/db.js';
import { env } from '../config/env.js';
import { User } from '../models/User.js';

const seed = async () => {
  await connectDatabase();

  const passwordHash = await bcrypt.hash(env.adminSeedPassword, 12);

  await User.findOneAndUpdate(
    { email: env.adminSeedEmail },
    {
      name: 'Virbhadra Khobare',
      email: env.adminSeedEmail,
      passwordHash,
      role: 'admin',
      title: 'Full Stack Developer | AI/ML Enthusiast | Software Engineer',
      githubUrl: 'https://github.com/VirbhadraKhobare',
      leetcodeUrl: 'https://leetcode.com/',
      codeforcesUrl: 'https://codeforces.com/'
    },
    { upsert: true, new: true }
  );

  console.log('Admin user seeded:', env.adminSeedEmail);
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
