const FILE_PATH = __dirname,
  fs = require("fs");

const GetData = _ => {
  const db = fs.readFileSync(`${FILE_PATH}/data.json`, "utf8");

  return JSON.parse(db).users;
};
const PersistData = users => {
    users = users.sort((o1, o2) => o1.userId - o2.userId);
  fs.writeFile(
    `${FILE_PATH}/data.json`,
    JSON.stringify({ users }),
    "utf8",
    (err, data) => {
      return !err;
    }
  );
};

module.exports = {
  GetUsers: _ => {
    return GetData();
  },
  SaveUser: user => {
    var data = GetData();
    // user.userValue = parseFloat(user.userValue);
    if (!user.userId) {
      var userId;
      if (!data.length) {
        userId = 1;
      } else {
        userId =
          Math.max.apply(
            Math,
            data.map(user => user.userId)
          ) + 1;
      }

      user.userId = userId;
      data.push(user);
    } else {
      (index = data.findIndex(
        data => user.userId === data.userId
      )),
        (data[index] = user);
    }

    return PersistData(data);
  },

  DeleteUser: userId => {
    console.log(userId);
    var data = GetData();
    data = data.filter(
      user => user.userId != userId
    );
    return PersistData(data);
  }
};
