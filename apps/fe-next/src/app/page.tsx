import { Demo, Button } from '@nx-amplify-next/ui';

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
    </>
  );
};

export default HomePage;
