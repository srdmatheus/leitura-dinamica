'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from './ui/button';
import { supabase } from '@/services/supabase';
import { useState } from 'react';
import { Input } from './ui/input';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  const { updateUser } = useAuth();

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      setRegisterError(error.message);
      return;
    }

    if (data.user) {
      await supabase.from('users').update('name').eq('id', data.user.id);
    }

    if (data.user) {
      updateUser(data.user);
    }
  };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setRegisterError(error.message);
      return;
    }

    if (data.user) {
      updateUser(data.user);
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex w-full flex-col gap-4 self-center">
        <label>
          E-mail:
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Senha:
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="flex w-full gap-4">
          <Button className="w-full" onClick={handleRegister}>
            Criar conta
          </Button>
          <Button className="w-full" onClick={handleLogin}>
            Entrar
          </Button>
        </div>
        {registerError && <p className="text-red-500">{registerError}</p>}
      </div>
    </div>
  );
};
