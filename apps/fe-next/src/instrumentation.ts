export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { serverWorker } = await import('./lib/msw/server');
    serverWorker.listen();
  }
}
