import { supabase } from '@/services/supabase';

import { useAuth } from '@/hooks/useAuth';
import { usePlayer } from '@/hooks/usePlayer';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

const formSchema = z.object({
  text: z.string().min(30, { message: 'Insira um texto maior.' })
});

type FormData = z.infer<typeof formSchema>;

export const UserProfileSidebar = () => {
  const { user, updateUser, texts } = useAuth();
  const { updateText } = usePlayer();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors }
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      updateUser(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async ({ text }: FormData) => {
    await supabase.from('Texts').insert({ content: text, user_id: user?.id });
  };

  return (
    <div className="relative flex h-full flex-col overflow-y-hidden">
      <div className="mt-8 text-center">
        <p>Conectado!</p>
        <p className="font-semibold">{user?.email}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-20 flex w-full">
        <Controller
          name="text"
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <>
              <Input
                {...field}
                type="text"
                placeholder="Cole aqui o seu texto"
                className={`rounded-r-none ${
                  errors.text ? 'border-red-500' : ''
                }`}
              />
            </>
          )}
        />

        <Button
          className="rounded-l-none border-none"
          type="submit"
          disabled={isSubmitting}
        >
          <Plus size={18} strokeWidth={3} />
        </Button>
      </form>
      {errors.text && (
        <span className="text-red-500">{errors.text.message}</span>
      )}

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
