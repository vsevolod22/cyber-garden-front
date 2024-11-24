import { useFetchProjectById } from '@/modules/projects/api/GetProject';
import type { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';

export const ProjectPage = () => {
   const { id } = useParams<{ id: string }>();
   const projectId = Number(id);
   const { data: project, isLoading, isError, error } = useFetchProjectById(projectId);

   if (isLoading) {
      return <div>Загрузка проекта...</div>;
   }

   if (isError) {
      return (
         <div>
            <p>Ошибка загрузки проекта:</p>
            <p>{(error as AxiosError).message}</p>
         </div>
      );
   }

   return (
      <div>
         <h1>Данные проекта</h1>
         {project && (
            <div>
               <p>
                  <strong>Название:</strong> {project.name}
               </p>
               <p>
                  <strong>ID:</strong> {project.id}
               </p>
               <p>
                  <strong>Рабочее пространство:</strong> {project.workspace_id}
               </p>
               <p>
                  <strong>Создано пользователем:</strong> {project.created_by}
               </p>
               <p>
                  <strong>Дата создания:</strong> {project.created_at}
               </p>
               <p>
                  <strong>Дата обновления:</strong> {project.updated_at}
               </p>
            </div>
         )}
      </div>
   );
};
