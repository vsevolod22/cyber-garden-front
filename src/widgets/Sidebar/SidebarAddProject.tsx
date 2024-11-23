import { TaskComboBox, type ProjectItem } from '@/modules/Task/ui/TaskComboBox';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';

import { Input } from '@/shared/ui/input';
import { Plus, User } from 'lucide-react';

// Имя
// Пользователи
// Отмена / Добавить

const users: ProjectItem[] = [
   {
      label: 'Пользователи',
      value: 'users',
      children: [
         { label: 'Вилков В. В. (240303vilkov@gmail.com)', value: 'Вилков В. В. (240303vilkov@gmail.com)' },
         { label: 'Рутины 🌀', value: 'Рутины' },
         { label: 'Вдохновение ✨', value: 'Вдохновение' },
      ],
   },
];

export const SidebarAddProject = () => {
   //    const form = useForm<z.infer<typeof loginSchema>>({
   //       resolver: zodResolver(loginSchema),
   //       defaultValues: {
   //          email: '',
   //          password: '',
   //       },
   //    });

   return (
      <Card>
         <CardHeader className='esmob:px-2 flex flex-col gap-4 pb-0 pt-0'>
            <Input placeholder='Имя' />
         </CardHeader>
         <CardContent className='es:h-32 esmob:justify-center flex flex-wrap items-center justify-between border-t sm:h-32 lg:h-20'>
            <div className='esmob:ml-0 ml-5 flex flex-wrap gap-2'>
               <TaskComboBox
                  defaultLabel='Пользователь'
                  items={users}
                  placeholder='Выберите пользователя'
                  svg={<User className='w-4' />}
               />
            </div>

            <div className='es:mx-5 esmob:mx-0 esmob:justify-center flex gap-2 sm:mr-5 md:ml-5 md:mr-5'>
               <Button className='h-12 bg-red-500 hover:bg-red-400'>Отмена</Button>
               <Button disabled className='h-12'>
                  Добавить задачу
               </Button>
            </div>
         </CardContent>
      </Card>
   );
};
