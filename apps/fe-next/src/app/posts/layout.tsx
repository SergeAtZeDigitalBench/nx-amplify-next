import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

const PostsLayout = ({ children, modal }: Props): JSX.Element => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default PostsLayout;
