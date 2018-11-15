const pg = require("pg");
const settings = require("./settings"); // settings.json
const input = process.argv[2];
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
    console.log("Connecting to db...")
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT $1::int AS number", ["1"], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Connected")

    console.log(input);

    client.end();
    console.log("Disconnected")
  });
});