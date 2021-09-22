interface User {
  id?: number;
  name: string;
  age: number;
}

let users: Array<User> = [];

export class UsersAPI {
  createUser(user: Omit<User, "id">) {
    let id = Math.random() * 1000;
    let newUser = { id, ...user };

    users.push(newUser);

    return newUser;
  }

  deleteUser(userId: number) {
    const newUserList = users.filter((user) => user.id === userId);

    users = newUserList;

    return users;
  }
}
