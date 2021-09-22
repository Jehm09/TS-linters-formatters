interface User {
    id?: number;
    name: string;
    age: number;
}

let users: Array<User> = [];

export class UsersAPI {
    createUser(user: Omit<User, 'id'>): User {
        const id = Math.random() * 1000;
        const newUser = { id, ...user };

        users.push(newUser);

        return newUser;
    }

    deleteUser(userId: number): Array<User> {
        const newUserList = users.filter((user) => user.id === userId);

        users = newUserList;

        return users;
    }

    getUserById(userId: number): User | undefined {
        return users.find((user) => user.id === userId);
    }
}
