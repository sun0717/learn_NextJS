import React from 'react'

// typescript魔法
interface User {
    id: number;
    name: string;
    email: string;
}
const UsersPage = async () => {
    // 从服务端获取数据,得到一个Promise
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await res.json();

  return (
    <>
        <h1>Users</h1>
        {/* <p>{new Date().toLocaleTimeString()}</p> */}
        <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>)}
            </tbody>
        </table>
    </>
  )
}

export default UsersPage
