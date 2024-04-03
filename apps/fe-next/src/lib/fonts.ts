import { Albert_Sans, Noto_Sans } from 'next/font/google';

export const albertSans = Albert_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-albert-sans',
  display: 'swap',
});

export const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-noto-sans',
  display: 'swap',
});
