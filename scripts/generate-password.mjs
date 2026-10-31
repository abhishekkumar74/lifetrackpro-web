import crypto from 'node:crypto';
import readline from 'node:readline';

function hashPassword(pwd) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(pwd, salt, 64).toString('hex');
  console.log('\n✅ Naya Password Hash aur Salt generate ho gaya!\n');
  console.log('Apne `.env.local` file mein in dono lines ko update karein:\n');
  console.log(`ADMIN_PASSWORD_SALT=${salt}`);
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
}

const cliArg = process.argv[2];

if (cliArg) {
  hashPassword(cliArg);
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Naya Admin Password enter karein: ', (answer) => {
    rl.close();
    if (!answer || !answer.trim()) {
      console.log('\n❌ Password empty nahi ho sakta.\n');
      process.exit(1);
    }
    hashPassword(answer.trim());
  });
}
