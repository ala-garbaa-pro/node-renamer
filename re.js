const fs = require("fs");
const path = require("path");
const scriptName = path.basename(__filename);

const list_filename = "list.txt";

const main = async () => {
  const unnecessaryWords = [list_filename, scriptName];

  const filename_list = await fs
    .readFileSync("list.txt", "utf8")
    .toString()
    .split("\n");

  const list_names = await fs
    .readdirSync("./")
    .filter((el) => !unnecessaryWords.includes(el));

  await asyncForEach(list_names, async (filename, index) => {
    const new_name =
      (await filename_list[index].trim().replace("?", "").replace("!", "")) +
      (await path.extname(filename));

    await fs.renameSync(`./${filename}`, `./${new_name}`);

    await console.log(`File Renamed from "${filename}" to ${new_name}`);
  });
};
main();

/**
 * asyncForEach.
 * @param {array} array Original array.
 * @param {function} callback Async array.
 */
const asyncForEach = async (array, callback) => {
  try {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  } catch (error) {
    console.log(error);
  }
};
