import { Outlet } from 'react-router-dom';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { Sidebar } from '@/widgets';
import { useTokenStore } from '@/modules/Auth/model/store/authStore';

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
            <div className='h-screen bg-background'>
               <Header />
               <div className='mt-6 flex justify-center'>Авторизируйтесь</div>
               <Footer />
            </div>
         )}
      </>
   );
};

export default BaseLayout;
