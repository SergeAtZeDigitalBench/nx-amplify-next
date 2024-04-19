'use client';

import { useBaselimeRum } from '@baselime/react-rum';
import { useEffect } from 'react';
import Image from 'next/image';

import type { ErrorPageProps } from '../types';

import { getErrorPageMessage } from '../lib/common';

const ErrorPage = ({ error, reset }: ErrorPageProps): JSX.Element => {
  const { sendEvent } = useBaselimeRum();
  const details = getErrorPageMessage(error);

  useEffect(() => {
    console.warn(details);
    if (process.env.NODE_ENV === 'production') {
      sendEvent('Error', {
        namespace: '/',
        message: details,
        error,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl text-center my-4 text-teal-700">Oups!...</h1>
      <Image
        src="https://i.imgur.com/FOeYt4E.png"
        alt="oustrich"
        width={400}
        height={400}
        priority
      />
      <h2 className="text-2xl text-center my-4 text-teal-700">
        An error happened
      </h2>
      <div className="flex justify-center">
        <button
          onClick={() => {
            reset();
          }}
          className="px-2 py-1 min-w-[100px] rounded-lg text-white text-center bg-teal-700 hover:bg-teal-800 active:bg-teal-900 border border-teal-900"
        >
          reset
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
