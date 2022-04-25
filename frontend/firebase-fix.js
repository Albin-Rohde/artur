const { exec } = require("child_process");
console.log("Fixing firebase bc it sucks");

(async () => {
  exec(
    "mv index.esm2017.js node_modules/@firebase/util/dist",
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      console.error(stderr);
    }
  );
})();
