import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Project {
   name: string;
   id: number;
   workspace_id: number;
   created_by: number;
   created_at: string;
   updated_at: string;
}

interface ProjectState {
   projects: Project[];
   currentProject: Project | null;
   workspaceProjects: Project[]; // Список проектов текущего рабочего пространства
   setProjects: (projects: Project[]) => void;
   setCurrentProject: (project: Project | null) => void;
   addProject: (project: Project) => void;
   removeProject: (id: number) => void;
   updateProject: (updatedProject: Project) => void;
   toggleCurrentProject: (id: number) => void;
   clearProjects: () => void;
   filterProjectsByWorkspace: (workspaceId: number) => void; // Метод фильтрации
}

export const useProjectStore = create<ProjectState>()(
   persist(
      (set, get) => ({
         projects: [],
         currentProject: null,
         workspaceProjects: [], // Изначально пустой список

         setProjects: (projects) => {
            set({ projects });
         },

         setCurrentProject: (project) => {
            set({ currentProject: project });
         },

         addProject: (project) => {
            set((state) => ({
               projects: [...state.projects, project],
            }));
         },

         removeProject: (id) => {
            set((state) => ({
               projects: state.projects.filter((proj) => proj.id !== id),
            }));
         },

         updateProject: (updatedProject) => {
            set((state) => ({
               projects: state.projects.map((proj) => (proj.id === updatedProject.id ? updatedProject : proj)),
            }));
         },

         toggleCurrentProject: (id) => {
            set((state) => {
               const project = state.projects.find((proj) => proj.id === id);
               return {
                  currentProject: state.currentProject?.id === id ? null : project || null,
               };
            });
         },

         clearProjects: () => {
            set({ projects: [], currentProject: null, workspaceProjects: [] });
         },

         filterProjectsByWorkspace: (workspaceId) => {
            const allProjects = get().projects;
            const filteredProjects = allProjects.filter((proj) => proj.workspace_id === workspaceId);
            set({ workspaceProjects: filteredProjects });
         },
      }),
      {
         name: 'project-storage',
         storage: createJSONStorage(() => localStorage),
      },
   ),
);
