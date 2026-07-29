import React, { createContext, useContext, useState } from 'react';

type User = {
  login: string;
  avatar_url: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
};

const GitHubAuthContext = createContext<AuthContextType | null>(null);

export function GitHubAuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (newToken: string) => {
    try {
      const response = await fetch(
        'https://api.github.com/user',
        {
          headers: {
            Authorization: `Bearer ${newToken}`,
            Accept: 'application/vnd.github+json',
          },
        }
      );

      if (!response.ok) {
        return false;
      }

      const githubUser = await response.json();

      setUser(githubUser);
      setToken(newToken);

      return true;

    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    return true;
  };

  return (
    <GitHubAuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </GitHubAuthContext.Provider>
  );
}


export function useGitHubAuth() {
  const context = useContext(GitHubAuthContext);

  if (!context) {
    throw new Error(
      'useGitHubAuth must be used inside GitHubAuthProvider'
    );
  }

  return context;
}