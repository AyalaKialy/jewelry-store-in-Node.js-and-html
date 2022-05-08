const mongoose = require('mongoose');
const {CONNECTION_STRING} = require('../config')

main().catch(err => console.log(err));

async function main() {
  await (await mongoose.connect(CONNECTION_STRING))
  console.log("connect to mongo!!!");
}