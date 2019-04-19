const base_url = "http://localhost:3100";

export default {
  getUsers: () => {
    return fetch(`${base_url}/getUsers`, { method: "GET" }).then(res =>
      res.json()
    );
  },
  deleteUser: userId => {
    return fetch(`${base_url}/deleteUser/${userId}`, { method: "DELETE" });
  },
  saveUser: user => {
    return fetch(`${base_url}/postUser`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(user)
    });
  }
};
