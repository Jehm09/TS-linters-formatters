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

    getUserById(userId: number): User {
        let userFound = null;

        users.forEach((user: User) => {
            if (user.id === userId) {
                userFound = user;
            }
        });

        return userFound;
    }

    deleteUser(userId: number): User[] {
        const newUserList = [];

        users.forEach((user: User) => {
            if (user.id !== userId) {
                newUserList.push(user);
            }
        });

        users = newUserList;

        // console.log({ users });

        return users;
    }
}
