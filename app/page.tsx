import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="flex w-full max-w-4xl flex-col gap-12 px-8 py-16">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-zinc-950 dark:text-zinc-50">
            Next.js Cache Directives Demo
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Explore the three different caching strategies in Next.js 15+
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <Link
            href="/cache-standard"
            className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              use cache
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Static, shared cache for build-time content
            </p>
            <ul className="text-sm text-zinc-500 dark:text-zinc-500">
              <li>• Global cache</li>
              <li>• No dynamic context</li>
              <li>• Pre-rendered at build</li>
            </ul>
          </Link>

          <Link
            href="/cache-remote"
            className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              use cache: remote
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Dynamic, shared cache for server-side content
            </p>
            <ul className="text-sm text-zinc-500 dark:text-zinc-500">
              <li>• Global cache</li>
              <li>• Works in dynamic context</li>
              <li>• Server-side storage</li>
            </ul>
          </Link>

          <Link
            href="/cache-private"
            className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              use cache: private
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Per-user cache for personalized content
            </p>
            <ul className="text-sm text-zinc-500 dark:text-zinc-500">
              <li>• Per-user cache</li>
              <li>• Access to cookies</li>
              <li>• Client-side storage</li>
            </ul>
          </Link>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            How to test
          </h3>
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>1. Open each page and check the console for render timestamps</li>
            <li>2. Refresh the page to see cache behavior</li>
            <li>3. Use DevTools to inspect cache storage locations</li>
            <li>4. Navigate between pages to observe cache persistence</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
