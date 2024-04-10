import { Demo, Button } from '@nx-amplify-next/ui';

import PetsListSsr from '../components/PetsList/PetsListSsr';
import PetsList from '../components/PetsList';

const HomePage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">
        Welcome to my app!
      </h1>

      <Demo />
      <Button
        variant="outline"
        className="text-sm bg-green-600 hover:bg-green-700"
      >
        ChadCN button
      </Button>

      <PetsListSsr />
      <PetsList />
    </>
  );
};

export default HomePage;
