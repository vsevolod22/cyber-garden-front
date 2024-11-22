import * as React from 'react';
import { Check, ChevronDown, FolderOpenDot } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/shared/ui/command';
import { Button } from '@/shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { cn } from '@/utils/lib/utils';

// Типы проекта
interface ProjectItem {
   label: string;
   value: string;
   children?: ProjectItem[];
}

// Данные
const projects: ProjectItem[] = [
   { label: 'Входящие', value: 'inbox' },
   {
      label: 'Мои проекты',
      value: 'my-projects',
      children: [
         { label: 'Учеба 📚', value: 'Учёба' },
         { label: 'Рутины 🌀', value: 'Рутины' },
         { label: 'Вдохновение ✨', value: 'Вдохновение' },
      ],
   },
];

// Рекурсивная функция фильтрации проектов
const filterProjects = (items: ProjectItem[], query: string): ProjectItem[] => {
   return items
      .map((item) => {
         if (item.children) {
            const filteredChildren = filterProjects(item.children, query);
            if (filteredChildren.length > 0 || item.label.toLowerCase().includes(query.toLowerCase())) {
               return { ...item, children: filteredChildren };
            }
         } else if (item.label.toLowerCase().includes(query.toLowerCase())) {
            return item;
         }
         return null;
      })
      .filter((item): item is ProjectItem => item !== null);
};

// Рекурсивный рендеринг элементов
const renderItems = (
   items: ProjectItem[],
   selectedValue: string,
   onSelect: (value: string, label: string) => void,
): React.ReactNode => {
   return items.map((item) => {
      if (item.children && item.children.length > 0) {
         return (
            <CommandGroup key={item.value} heading={item.label}>
               {renderItems(item.children, selectedValue, onSelect)}
            </CommandGroup>
         );
      } else {
         return (
            <CommandItem
               key={item.value}
               value={item.value}
               onSelect={() => onSelect(item.value, item.label)}
               className='flex justify-between'
            >
               {item.label}
               <Check className={cn('ml-auto', selectedValue === item.value ? 'opacity-100' : 'opacity-0')} />
            </CommandItem>
         );
      }
   });
};

// Основной компонент
export const TaskComboBox: React.FC = () => {
   const [open, setOpen] = React.useState(false);
   const [inputValue, setInputValue] = React.useState('');
   const [value, setValue] = React.useState('');
   const [label, setLabel] = React.useState('Проект');

   const handleSelect = (selectedValue: string, selectedLabel: string) => {
      setValue(selectedValue);
      setLabel(selectedLabel);
      setInputValue(''); // Сброс строки поиска
      setOpen(false);
   };

   const filteredProjects = React.useMemo(() => {
      return filterProjects(projects, inputValue);
   }, [inputValue]);

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant='outline'
               role='combobox'
               aria-expanded={open}
               className='ml-5 h-8 min-w-[120px] justify-between gap-2'
            >
               <FolderOpenDot className='w-4' />
               {label}
               <ChevronDown className='opacity-50' />
            </Button>
         </PopoverTrigger>
         <PopoverContent className='w-[250px] p-0'>
            <Command inputValue={inputValue} onInputValueChange={setInputValue}>
               <div className='flex items-center border-b px-3' cmdk-input-wrapper=''>
                  <CommandInput placeholder='Найти проект...' className='h-9' />
               </div>
               <CommandList>
                  {filteredProjects.length > 0 ? (
                     renderItems(filteredProjects, value, handleSelect)
                  ) : (
                     <CommandEmpty>Нет проектов</CommandEmpty>
                  )}
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   );
};
