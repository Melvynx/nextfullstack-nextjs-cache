import { unstable_cacheLife as cacheLife } from "next/cache";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

async function DynamicSharedData(props: { requestId: string }) {
  "use cache: remote";
  cacheLife("hours");

  const timestamp = new Date().toISOString();
  const renderTime = timestamp;

  console.log("🟢 [use cache: remote] Component rendered at:", timestamp);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const globalStats = {
    totalUsers: 15234,
    activeToday: 892,
    totalPosts: 45678,
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          Cached Data (Remote)
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            <strong>Request ID:</strong> {props.requestId}
          </p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            <strong>Rendered at:</strong> {timestamp}
          </p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            <strong>Render time:</strong> {renderTime}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          Global Stats (Same for all users)
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col rounded border border-zinc-200 p-4 dark:border-zinc-700">
            <span className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">
              {globalStats.totalUsers.toLocaleString()}
            </span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Total Users
            </span>
          </div>
          <div className="flex flex-col rounded border border-zinc-200 p-4 dark:border-zinc-700">
            <span className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">
              {globalStats.activeToday.toLocaleString()}
            </span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Active Today
            </span>
          </div>
          <div className="flex flex-col rounded border border-zinc-200 p-4 dark:border-zinc-700">
            <span className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">
              {globalStats.totalPosts.toLocaleString()}
            </span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Total Posts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function CacheRemotePage() {
  await connection();

  const requestId = `req-${crypto.randomUUID()}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="flex w-full max-w-4xl flex-col gap-8 px-8 py-16">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-zinc-950 dark:text-zinc-50">
              use cache: remote
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Dynamic, shared cache (runtime)
            </p>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            ← Back
          </Link>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950">
          <h2 className="mb-3 text-lg font-semibold text-green-950 dark:text-green-50">
            Characteristics
          </h2>
          <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
            <li>• Cache scope: Global (shared by all users)</li>
            <li>• Storage: Server-side cache handler</li>
            <li>• Dynamic context: Yes (works after connection())</li>
            <li>• Access to cookies/headers: No (but can pass as props)</li>
            <li>• Revalidation: Configurable with cacheLife()</li>
          </ul>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <DynamicSharedData requestId={requestId} />
        </Suspense>

        <div className="rounded-lg border border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-3 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            Test Instructions
          </h3>
          <ol className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>1. Note the Request ID and timestamp above</li>
            <li>2. Refresh this page multiple times</li>
            <li>
              3. Request ID changes (new request), but timestamp stays the same
              (cached component)
            </li>
            <li>4. The cache key includes requestId prop</li>
            <li>5. This demonstrates caching in a dynamic context</li>
            <li>6. Cache is stored server-side and shared globally</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
