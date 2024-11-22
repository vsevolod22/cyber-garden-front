import { Outlet } from 'react-router-dom';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/ui/sidebar';
import { AppSidebar } from '@/widgets/Sidebar';

const BaseLayout = () => {
   return (
      <SidebarProvider>
         <AppSidebar />
         <SidebarInset>
            <SidebarTrigger className='-ml-1' />
            <div className='h-screen bg-background'>
               <Header />
               <div>
                  <div>
                     <Outlet />
                  </div>
                  <Footer />
               </div>
            </div>
         </SidebarInset>
      </SidebarProvider>
   );
};

export default BaseLayout;
