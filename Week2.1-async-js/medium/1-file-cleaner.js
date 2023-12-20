/*
File cleaner
Read a file, remove all the extra spaces and write it back to the same file.

For example, if the file input was

hello     world    my    name   is       raman
After the program runs, the output should be

hello world my name is raman
*/

const fs = require("fs");

fs.readFile("abc.txt", function (err, data) {
  let str = data.toString();
  console.log(str);

  // Remove spaces from string str
  let newstr = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] != " ") {
      newstr += str[i];
    } else {
      if (newstr[newstr.length - 1] != " ") newstr += str[i];
    }
  }

  console.log(newstr);
  fs.writeFile("abc.txt", newstr, function (err) {
    console.log("done");
  });
});
