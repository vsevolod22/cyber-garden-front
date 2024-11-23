import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLogin } from '../model/api/LoginApi';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Title } from '@/shared/ui/title';

export const loginSchema = z.object({
   email: z.string().email({ message: 'Некорректный email' }),
   password: z.string().min(2, { message: 'Пароль должен быть не менее 8 символов' }),
});

interface LoginFormProps {
   toggleOpenStatus: (status: boolean) => void;
}

export const LoginForm = ({ toggleOpenStatus }: LoginFormProps) => {
   const { mutate: login } = useLogin();
   const [error, setError] = useState<string | null>(null);

   const loginForm = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
      login(values, {
         onSuccess: (data) => {
            localStorage.setItem('token', data.access_token);
            toggleOpenStatus(false);
         },
         onError: () => {
            setError('Ошибка при входе');
         },
      });
   };

   return (
      <Form {...loginForm}>
         <form className='space-y-4' onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
            <FormField
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input placeholder='Введите email' {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
               control={loginForm.control}
               name='email'
            />

            <FormField
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Пароль</FormLabel>
                     <FormControl>
                        <Input placeholder='Введите пароль' type='password' {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
               control={loginForm.control}
               name='password'
            />
            {error && <Title className='text-red-500' text={error} />}
            <Button className='absolute bottom-6 w-[160px]' type='submit'>
               Войти
            </Button>
         </form>
      </Form>
   );
};
