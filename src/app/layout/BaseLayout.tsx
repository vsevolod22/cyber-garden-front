import { Outlet } from 'react-router-dom';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { Sidebar } from '@/widgets';
import { useTokenStore } from '@/modules/Auth/model/store/authStore';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher';
import { AuthModal } from '@/modules/Auth/ui/AuthModal';
import NonAuthImage from '@/shared/assets/NonAuthImage.png';

const BaseLayout = () => {
   const { accessToken } = useTokenStore();

   return (
      <>
         {accessToken ? (
            <SidebarProvider>
               <Sidebar />
               <SidebarInset>
                  <div className='h-screen bg-background'>
                     <Header />
                     <div className='px-6'>
                        <Outlet />
                     </div>
                     <Footer />
                  </div>
               </SidebarInset>
            </SidebarProvider>
         ) : (
            <div className='relative flex h-screen items-center justify-center gap-3 bg-background'>
               <ThemeSwitcher className='absolute right-4 top-4' />
               <img alt='Изображение для стартовой страницы' className='h-[800px] w-[800px]' src={NonAuthImage} />
               <div className='flex max-w-[700px] flex-col gap-16'>
                  <p className='text-3xl font-bold'>
                     Присоединяйся к тем, кто уже живет с удовольствием управляй задачами, анализируй нагрузку и наслаждайся
                     успехом!
                  </p>
                  <div className='flex gap-3'>
                     <AuthModal className='h-[56px] w-56 bg-primary text-xl font-bold uppercase hover:bg-primary-hover' />
                     <AuthModal authModalMode='register' className='h-[56px] w-56 border-primary text-xl font-bold uppercase' />
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default BaseLayout;
