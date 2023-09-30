import React from 'react'

// typescript魔法
interface User {
    id: number;
    name: string;
}
const UsersPage = async () => {
    // 从服务端获取数据,得到一个Promise
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await res.json();

  return (
    <>
        <h1>Users</h1>
        <p>{new Date().toLocaleTimeString()}</p>
        <ul>
            {users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
    </>
  )
}

export default UsersPage
