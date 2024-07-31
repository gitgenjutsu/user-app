"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface User {
  id: number,
  login: string;
  avatar_url: string;
  url: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.github.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="container mx-auto flex justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-slate-700 text-center table-fixed border-collapse">
            <thead>
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Avatar</th>
                <th className="py-2">Username</th>
                <th className="py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.login}>
                  <td className="py-2">{user.id}</td>
                  <td className="py-2 flex justify-center">
                    <Image src={user.avatar_url} alt={user.login} width={10} height={10} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="py-2">{user.login}</td>
                  <td className="py-2">
                    <Link href={`/${user.login}`} className="text-blue-300 hover:underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserList;
