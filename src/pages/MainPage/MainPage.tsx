import { usePing } from '@/modules/Auth/model/api/LoginApi';
import { Container } from '@/widgets/Container';
import { EventCard } from '@/widgets/EventCard';

export const MainPage = () => {
   const ping = usePing();
   console.log(ping.data);

   return (
      <Container>
         <EventCard />
      </Container>
   );
};
