'use client';

import { useAuth } from '@/hooks/useAuth';

import { supabase } from '@/services/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z
  .object({
    email: z.string().email({ message: 'Insira um e-mail válido.' }),
    password: z
      .string()
      .min(7, { message: 'Necessário 7 caracteres ou mais.' }),
    confirm: z.string().min(7, { message: 'Necessário 7 caracteres ou mais.' })
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Senhas não conferem.',
    path: ['confirm']
  });

type FormData = z.infer<typeof formSchema>;

export const Register = () => {
  const { updateUser } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    setError
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        setError('root', {
          type: 'manual',
          message: error.message
        });
        return console.log(error.message);
      }

      if (data.user) {
        updateUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex w-full flex-col gap-4 self-center">
        <h2 className="text-center text-xl font-bold">Cadastrar</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            name="email"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <div>
                <div className="flex justify-between">
                  <label htmlFor={field.name}>Email</label>
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <Input
                  type="text"
                  {...field}
                  id={field.name}
                  className={errors.email ? 'border-red-500' : ''}
                />
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <div>
                <div className="flex justify-between">
                  <label htmlFor={field.name}>Senha</label>
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <Input
                  type="password"
                  {...field}
                  id={field.name}
                  className={errors.password ? 'border-red-500' : ''}
                />
              </div>
            )}
          />
          <Controller
            name="confirm"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <div>
                <div className="flex justify-between">
                  <label htmlFor={field.name}>Confirmar senha</label>
                  {errors.confirm && (
                    <span className="text-red-500">
                      {errors.confirm.message}
                    </span>
                  )}
                </div>
                <Input
                  type="password"
                  {...field}
                  id={field.name}
                  className={errors.password ? 'border-red-500' : ''}
                />
              </div>
            )}
          />

          {errors.root && (
            <p className="text-center text-red-500">{errors.root.message}</p>
          )}
          <Button
            className="mt-2 h-10 w-full"
            type="submit"
            disabled={isSubmitting}
          >
            Criar conta
          </Button>
        </form>
      </div>
    </div>
  );
};
