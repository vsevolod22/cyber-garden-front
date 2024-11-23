import { z } from 'zod';
import { loginSchema } from './LoginForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '../model/api/RegisterApi';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Title } from '@/shared/ui/title';
import { useState } from 'react';
import { useTokenStore } from '../model/store/authStore';

const registerSchema = loginSchema
   .extend({
      name: z.string().min(3, { message: 'Имя пользователя должно быть не менее 3 символов' }),
      confirmPassword: z.string().min(2, { message: 'Пароль должен быть не менее 8 символов' }),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: 'Пароли должны совпадать',
      path: ['confirmPassword'],
   });

interface RegistrationFormProps {
   toggleOpenStatus: (status: boolean) => void;
}

export const RegistrationForm = ({ toggleOpenStatus }: RegistrationFormProps) => {
   const { mutate: register } = useRegister();
   const [error, setError] = useState<string | null>(null);
   const { setAccessToken, setRefreshToken } = useTokenStore();
   const registerForm = useForm<z.infer<typeof registerSchema>>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         email: '',
         password: '',
         name: '',
         confirmPassword: '',
      },
   });

   const onSubmit = (values: z.infer<typeof registerSchema>) => {
      const filteredValues = { ...values };
      delete filteredValues.confirmPassword;
      register(values, {
         onSuccess: (data) => {
            setAccessToken(data.access_token);
            setRefreshToken(data.refresh_token);
            toggleOpenStatus(false);
         },
         onError: () => {
            setError('Ошибка при регистрации');
         },
      });
   };

   return (
      <Form {...registerForm}>
         <form className='space-y-4' onSubmit={registerForm.handleSubmit(onSubmit)}>
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
               control={registerForm.control}
               name='email'
            />
            <FormField
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Имя пользователя</FormLabel>
                     <FormControl>
                        <Input placeholder='Введите имя пользователя' type='text' {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
               control={registerForm.control}
               name='name'
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
               control={registerForm.control}
               name='password'
            />
            <FormField
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Подтвердите пароль</FormLabel>
                     <FormControl>
                        <Input placeholder='Повторите пароль' type='password' {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
               control={registerForm.control}
               name='confirmPassword'
            />
            {error && <Title className='text-red-500' text={error} />}
            <Button className='w-[160px]' type='submit'>
               Зарегистрироваться
            </Button>
         </form>
      </Form>
   );
};
