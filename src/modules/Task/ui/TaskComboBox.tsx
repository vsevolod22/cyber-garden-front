import * as React from 'react';
import { Check, ChevronDown, FolderOpenDot } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/shared/ui/command';
import { Button } from '@/shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { cn } from '@/utils/lib/utils';

// Типы проекта
export interface ProjectItem {
   children?: ProjectItem[];
   label: string;
   value: string;
}

interface TaskComboBoxProps {
   className?: string;
   defaultLabel?: string;
   items: ProjectItem[];
   placeholder?: string;
   svg?: React.ReactNode;
   onSelect?: (selectedValue: string, selectedLabel: string) => void;
}

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
               className='flex justify-between'
               value={item.value}
               onSelect={() => onSelect(item.value, item.label)}
            >
               {item.label}
               <Check className={cn('ml-auto', selectedValue === item.value ? 'opacity-100' : 'opacity-0')} />
            </CommandItem>
         );
      }
   });
};

export const TaskComboBox: React.FC<TaskComboBoxProps> = ({
   items,
   className,
   placeholder = 'Найти проект...',
   defaultLabel = 'Проект',
   svg = <FolderOpenDot className='w-4' />,
   onSelect,
}) => {
   const [open, setOpen] = React.useState(false);
   const [inputValue, setInputValue] = React.useState('');
   const [value, setValue] = React.useState('');
   const [label, setLabel] = React.useState(defaultLabel);

   const handleSelect = (selectedValue: string, selectedLabel: string) => {
      setValue(selectedValue);
      setLabel(selectedLabel);
      setInputValue('');
      setOpen(false);
      if (onSelect) {
         onSelect(selectedValue, selectedLabel);
      }
   };

   const filteredProjects = React.useMemo(() => {
      return filterProjects(items, inputValue);
   }, [items, inputValue]);

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild className={className}>
            <Button aria-expanded={open} className='h-8 min-w-[120px] justify-between gap-2' role='combobox' variant='outline'>
               {svg}
               {label}
               <ChevronDown className='opacity-50' />
            </Button>
         </PopoverTrigger>
         <PopoverContent className='w-[250px] p-0'>
            <Command inputValue={inputValue} onInputValueChange={setInputValue}>
               <div className='flex items-center border-b px-3' cmdk-input-wrapper=''>
                  <CommandInput className='h-9' placeholder={placeholder} />
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
