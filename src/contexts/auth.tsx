'use client';

import { supabase } from '@/services/supabase';
import { User } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

type Text = {
  id: string;
  created_at: string;
  user_id: string;
  content: string;
};

type AuthContextType = {
  user: User | undefined;
  updateUser: (data: User | undefined) => void;
  texts: Text[] | undefined;
  getTexts: (userId: string) => void;
};

const initialValue: AuthContextType = {
  user: undefined,
  updateUser: () => {},
  texts: undefined,
  getTexts: () => {}
};

export const AuthContext = createContext<AuthContextType>(initialValue);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [texts, setTexts] = useState<Text[] | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      const fetchTexts = async () => {
        const { data } = await supabase
          .from('Texts')
          .select('*')
          .eq('user_id', user?.id);

        if (data) {
          setTexts(data);
        }
      };
      fetchTexts();
    }
  }, [user?.id]);

  const updateUser = (data: User | undefined) => setUser(data);

  const getTexts = async (userId: string) => {
    const { data } = await supabase
      .from('Texts')
      .select('*')
      .eq('user_id', userId);

    if (data) {
      setTexts(data);
    }
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, texts, getTexts }}>
      {children}
    </AuthContext.Provider>
  );
};
