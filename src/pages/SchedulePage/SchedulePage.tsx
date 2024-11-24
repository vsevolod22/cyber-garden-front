import { useSchedule } from '@/modules/Schedule/api/scheduleQuery';
import React, { useState } from 'react';

export const SchedulePage = () => {
   const [group, setGroup] = useState('');
   const [currentGroup, setCurrentGroup] = useState<string | null>(null);

   const { data: schedule, isLoading, isError, error } = useSchedule(currentGroup || '');

   const handleFetchSchedule = () => {
      if (group.trim()) {
         setCurrentGroup(group.trim());
      }
   };

   const renderSchedule = () => {
      if (!schedule || !schedule.table) return null;

      const { table } = schedule.table;

      return table.slice(2).map((daySchedule: string[], index: number) => {
         const [day, ...lessons] = daySchedule;

         return (
            <div key={index} className='mb-6 rounded-lg bg-white p-4 shadow-md'>
               <h2 className='text-lg font-semibold text-blue-600'>{day}</h2>
               <ul className='mt-2 space-y-2'>
                  {lessons.map((lesson, lessonIndex) =>
                     lesson ? (
                        <li key={lessonIndex} className='rounded-md border border-blue-300 bg-blue-50 p-3 shadow-sm'>
                           {lesson}
                        </li>
                     ) : (
                        <li key={lessonIndex} className='rounded-md border bg-gray-50 p-3 text-gray-500 shadow-sm'>
                           Нет занятий
                        </li>
                     ),
                  )}
               </ul>
            </div>
         );
      });
   };

   return (
      <div className='min-h-screen bg-gray-100 p-6'>
         <div className='mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md'>
            <h1 className='mb-6 text-center text-2xl font-bold text-blue-700'>Расписание занятий</h1>
            <div className='mb-4 flex gap-4'>
               <input
                  className='flex-1 rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
                  placeholder='Введите группу (например, КТбо2-8)'
                  type='text'
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
               />
               <button
                  className='rounded-lg bg-blue-500 px-6 py-3 text-white shadow transition hover:bg-blue-400'
                  disabled={isLoading}
                  onClick={handleFetchSchedule}
               >
                  {isLoading ? 'Загрузка...' : 'Получить расписание'}
               </button>
            </div>

            {isError && <div className='rounded-md bg-red-100 p-4 text-red-600 shadow'>{(error as Error).message}</div>}

            {schedule && (
               <div className='mt-6'>
                  <h2 className='text-xl font-bold text-gray-700'>
                     {schedule.table.name} (Неделя {schedule.table.week})
                  </h2>
                  <div className='mt-4'>{renderSchedule()}</div>
               </div>
            )}
         </div>
      </div>
   );
};
