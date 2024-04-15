export type PageProps<
  P = Record<string, string>,
  Q = Record<string, string>
> = {
  params: P;
  searchParams: Q;
};

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
