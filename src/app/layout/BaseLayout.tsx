import { Outlet } from 'react-router-dom';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { Sidebar } from '@/widgets';

const BaseLayout = () => {
   return (
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
   );
};

export default BaseLayout;
