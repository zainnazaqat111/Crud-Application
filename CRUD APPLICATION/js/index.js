const users = [
  { name: "Usman", age: "22", },
  { name: "Zain", age: "22", },
];
let global_id;
function fields() {
  const name = document.getElementById("name");
  const age = document.getElementById("age");
  const button = document.getElementById("btn");
  const props = { name, age, button };
  return props;
}
function add_update() {
  const { name, age, button } = fields();
  if (button.value === "Add") {
    users.push({
      name: name.value,
      age: age.value,
    });
    setUsers();
    reset();
  } else {
    users.splice(global_id, 1, {
      name: name.value,
      age: age.value,
    });
    setUsers();
    reset();
    button.value = "Add";
    global_id = undefined;
  }
}
function reset() {
  let { name, age, button } = fields();
  name.value = "";
  age.value = "";
  button.value = "Add";
}
function deleteUser(id) {
  users.splice(id, 1);
  setUsers();
}
function editUser(id) {
  let user = users[id];
  global_id = id;
  let { name, age, button } = fields();
  name.value = user.name;
  age.value = user.age;
  button.value = "Update";
}
function search(users, query) {
  return query && query !== ""
    ? users.filter(
        (user) =>
          user.name.toLowerCase().startsWith(query.toLowerCase()) ||
          user.age.toString().toLowerCase().startsWith(query)
      )
    : users;
}
function setUsers() {
  const query = document.getElementById("search").value;
  const tbody = document.getElementById("data");
  const filteredUsers = search(users, query);
  const output = filteredUsers.map((user, i) => {
    return `<tr>
        <td><input type="checkbox" /></td>
        <td>${user.name}</td>
        <td>${user.age}</td>
        
        <td>
          <button class="btn btn-info" onclick="editUser(${i})">Edit</button>
          <button class="btn btn-danger" onclick="deleteUser(${i})">Delete</button>
        </td>
      </tr>`;
  });
  tbody.innerHTML = output.join("");
}
function main() {
  setUsers();
}
main();
fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((res) => console.log(res));
