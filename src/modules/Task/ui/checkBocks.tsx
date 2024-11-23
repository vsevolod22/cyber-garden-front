import { Checkbox } from '@/shared/ui/checkbox';

export function CheckboxTask() {
   return (
      <div className='relative my-4 flex min-h-[80px] items-center space-x-2 border-y'>
         <Checkbox className='h-6 w-6' id='xak' />
         <label
            htmlFor='xak'
            className='text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
         >
            Выиграть хакатон
         </label>
         <span className='absolute bottom-2 right-2 text-gray-500'>Вилков Всеволод Викторович</span>
      </div>
   );
}
