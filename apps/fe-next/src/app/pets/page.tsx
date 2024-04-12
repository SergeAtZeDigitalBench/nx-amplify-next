import { Suspense } from 'react';

import PetsListSsr from '../../components/PetsList/PetsListSsr';
import LoadingList from '../../components/LoadingList';
import PetsList from '../../components/PetsList';

const PetsPage = async () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Pets</h1>
      <Suspense fallback={<LoadingList />}>
        <PetsListSsr />
      </Suspense>
      <PetsList />
    </>
  );
};

export default PetsPage;
