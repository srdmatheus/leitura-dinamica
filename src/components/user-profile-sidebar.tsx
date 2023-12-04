import { useState } from 'react';

import { supabase } from '@/services/supabase';
import { usePlayerContext } from '@/contexts/player';
import { useAuth } from '@/hooks/useAuth';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus } from 'lucide-react';

export const UserProfileSidebar = () => {
  const [textToRegister, setTextToRegister] = useState('');
  const { user, updateUser, texts } = useAuth();
  const { updateText } = usePlayerContext();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      updateUser(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewTextRegister = async () => {
    await supabase
      .from('Texts')
      .insert({ content: textToRegister, user_id: user?.id });
  };

  return (
    <div className="relative flex h-full flex-col overflow-y-hidden">
      <div className="mt-8 text-center">
        <p>Conectado!</p>
        <p className="font-semibold">{user?.email}</p>
      </div>

      <div className="mt-20 flex w-full">
        <Input
          type="text"
          placeholder="Cadastrar novo texto"
          className="rounded-r-none border-none"
          value={textToRegister}
          onChange={(e) => setTextToRegister(e.target.value)}
        />
        <Button
          className="rounded-l-none border-none"
          onClick={handleNewTextRegister}
        >
          <Plus size={18} strokeWidth={3} />
        </Button>
      </div>

      <div className="mb-4 mt-8 flex flex-col gap-2 overflow-y-auto">
        <span className="text-center text-sm font-semibold">
          {texts?.length
            ? 'Seus textos, clique para utilizar.'
            : 'Nenhum texto cadastrado.'}
        </span>
        {texts && (
          <div className="scrollbar flex-grow overflow-y-auto">
            <div className="flex flex-col gap-2">
              {texts.map((text) => (
                <button
                  key={text.id}
                  onClick={() => updateText(text.content)}
                  className="w-full cursor-pointer truncate rounded-md border border-gray-50 bg-gray-100 p-2 text-sm shadow-sm outline-none ring-brand transition hover:bg-white focus-visible:ring-2 "
                >
                  {text.content}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <Button className="w-full" onClick={handleLogout}>
          Desconectar
        </Button>
      </div>
    </div>
  );
};
