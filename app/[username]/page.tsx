"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import Image from 'next/image';

interface UserDetails {
  login: string;
  avatar_url: string;
  name: string;
  company: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
  twitter_username: string;
}

const UserDetails = () => {
  const { username } = useParams();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (username) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`https://api.github.com/users/${username}`);
          const data = await response.json();
          if (data?.status === "404") {
            setUser(null);
          } else {
            setUser(data);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    }
  }, [username]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto flex justify-center items-center min-h-dvh">
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <div>
            <h1 className="text-2xl font-bold my-4">{user.login}'s Profile</h1>
            <Image src={user.avatar_url} alt={user.login} width={32} height={32} className="w-32 h-32 rounded-full" />
            <p>Name: {user.name}</p>
            <p>Company: {user.company}</p>
            <p>Location: {user.location}</p>
            <p>Followers: {user.followers}</p>
            <p>Following: {user.following}</p>
            <p>Twitter: {user.twitter_username || "N/A"}</p>
            <p>Public Repositories: {user.public_repos}</p>
          </div>
        ) : (
          <p>User not found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
