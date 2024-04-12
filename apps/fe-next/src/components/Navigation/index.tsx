import Link from 'next/link';

import AuthButtons from './components/AuthButtons';

const Navigation = (): JSX.Element => {
  return (
    <nav
      data-testid="Navigation"
      className="flex justify-between items-center max-w-5xl mx-auto text-yellow-200 min-h-[30px]"
    >
      <Link href="/">
        <span>🏠</span>
      </Link>

      <ul className="flex gap-2">
        <li>
          <Link href="/posts">
            <span>📑</span>
          </Link>
        </li>
        <li>
          <Link href="/todos">
            <span>📚</span>
          </Link>
        </li>
        <li>
          <Link href="/pets">
            <span>🐱</span>
          </Link>
        </li>
        <AuthButtons />
      </ul>
    </nav>
  );
};

export default Navigation;
