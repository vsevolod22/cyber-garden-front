import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Title } from '@/shared/ui/title';

import { useLogin } from '../model/api/LoginApi';
import { useRegister } from '../model/api/RegisterApi';

export function AuthModal() {
   const [open, setOpen] = useState(false);
   const [isLogin, setIsLogin] = useState(true);
   const [error, setError] = useState<string | null>(null);

   const { mutate: login } = useLogin();
   const { mutate: register } = useRegister();

   const loginSchema = z.object({
      email: z.string().email({ message: 'Некорректный email' }),
      password: z.string().min(2, { message: 'Пароль должен быть не менее 8 символов' }),
   });

   const registerSchema = loginSchema
      .extend({
         username: z.string().min(3, { message: 'Имя пользователя должно быть не менее 3 символов' }),
         confirmPassword: z.string().min(2, { message: 'Пароль должен быть не менее 8 символов' }),
      })
      .refine((data) => data.password === data.confirmPassword, {
         message: 'Пароли должны совпадать',
         path: ['confirmPassword'],
      });

   const formSchema = isLogin ? loginSchema : registerSchema;

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: '',
         password: '',
         username: '',
         confirmPassword: '',
      },
   });

   useEffect(() => {
      form.reset();
   }, [isLogin]);

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      console.log(isLogin);
      if (isLogin) {
         login(values, {
            onSuccess: (data) => {
               localStorage.setItem('token', data.access_token);
               setOpen(false);
            },
            onError: () => {
               setError('Ошибка при входе');
            },
         });
      } else {
         const filteredValues = { ...values };
         delete filteredValues.confirmPassword;
         register(values, {
            onSuccess: (data) => {
               localStorage.setItem('token', data.access_token);
               setOpen(false);
            },
            onError: () => {
               setError('Ошибка при регистрации');
            },
         });
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button className='flex gap-2' size='small' variant='secondary'>
               {isLogin ? 'Авторизоваться' : 'Регистрация'}
            </Button>
         </DialogTrigger>

         <DialogContent aria-describedby='dialog-description' className='sm:max-w-md'>
            <DialogHeader>
               <DialogTitle>{isLogin ? 'Авторизация' : 'Регистрация'}</DialogTitle>
               <DialogDescription id='dialog-description'>Пожалуйста, заполните форму ниже.</DialogDescription>
            </DialogHeader>
            <div className='mb-4 flex justify-center gap-8'>
               <Button variant={isLogin ? 'default' : 'secondary'} onClick={() => setIsLogin(true)}>
                  Вход
               </Button>
               <Button variant={!isLogin ? 'default' : 'secondary'} onClick={() => setIsLogin(false)}>
                  Регистрация
               </Button>
            </div>
            <Form {...form}>
               <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
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
                     control={form.control}
                     name='email'
                  />
                  {!isLogin && (
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
                        control={form.control}
                        name='username'
                     />
                  )}
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
                     control={form.control}
                     name='password'
                  />
                  {!isLogin && (
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
                        control={form.control}
                        name='confirmPassword'
                     />
                  )}
                  {error && <Title className='text-red-500' text={error} />}
                  <Button className='w-full' type='submit'>
                     {isLogin ? 'Войти' : 'Зарегистрироваться'}
                  </Button>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
}
