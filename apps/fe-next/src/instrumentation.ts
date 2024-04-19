export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { serverWorker } = await import('./lib/msw/server');
    serverWorker.listen();
  }

  if (
    process.env.NEXT_RUNTIME === 'nodejs' &&
    process.env.NODE_ENV === 'production'
  ) {
    /**
     * Logging with OpenTelemetry setup tool:
     *  https://baselime.io/docs/sending-data/languages/next.js
     */
    const { BaselimeSDK, VercelPlugin, BetterHttpInstrumentation } =
      await import('@baselime/node-opentelemetry');

    const sdk = new BaselimeSDK({
      serverless: true,
      service: 'nx-next-mongo-contentful',
      instrumentations: [
        new BetterHttpInstrumentation({
          plugins: [
            // Add the Vercel plugin to enable correlation between your logs and traces for projects deployed on Vercel
            new VercelPlugin(),
          ],
        }),
      ],
    });

    sdk.start();
  }
}
