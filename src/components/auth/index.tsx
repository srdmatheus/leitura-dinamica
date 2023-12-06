'use client';

import { useState } from 'react';

import { Login } from './login';
import { Register } from './register';

export const Auth = () => {
  const [mode, setMode] = useState<'register' | 'login'>('login');

  return (
    <div>
      {mode === 'login' && (
        <>
          <Login />
          <span
            onClick={() => setMode('register')}
            className="mt-2 block cursor-pointer text-center text-sm hover:text-brand-button hover:underline"
          >
            Não possui uma conta?
          </span>
        </>
      )}
      {mode === 'register' && (
        <>
          <Register />
          <span
            onClick={() => setMode('login')}
            className="mt-2 block cursor-pointer text-center text-sm hover:text-brand-button hover:underline"
          >
            Já possui uma conta?
          </span>
        </>
      )}
    </div>
  );
};
