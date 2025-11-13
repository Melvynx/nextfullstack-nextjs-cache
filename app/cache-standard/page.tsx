import Link from "next/link";
import { Suspense } from "react";

async function ExpensiveComputation() {
  "use cache";

  const timestamp = new Date().toISOString();
  const renderTime = timestamp;

  console.log("🔵 [use cache] Component rendered at:", timestamp);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const products = [
    { id: 1, name: "Product A", price: 29.99 },
    { id: 2, name: "Product B", price: 49.99 },
    { id: 3, name: "Product C", price: 19.99 },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          Cached Data
        </h3>
        <div className="space-y-2">
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
          Products
        </h3>
        <div className="space-y-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded border border-zinc-200 p-3 dark:border-zinc-700"
            >
              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                {product.name}
              </span>
              <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                ${product.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function CacheStandardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="flex w-full max-w-4xl flex-col gap-8 px-8 py-16">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-zinc-950 dark:text-zinc-50">
              use cache
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Static, shared cache (build-time)
            </p>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            ← Back
          </Link>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
          <h2 className="mb-3 text-lg font-semibold text-blue-950 dark:text-blue-50">
            Characteristics
          </h2>
          <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
            <li>• Cache scope: Global (shared by all users)</li>
            <li>• Storage: Server-side cache handler</li>
            <li>• Dynamic context: No (static only)</li>
            <li>• Access to cookies/headers: No</li>
            <li>• Default revalidation: 15 minutes</li>
          </ul>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <ExpensiveComputation />
        </Suspense>

        <div className="rounded-lg border border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-3 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            Test Instructions
          </h3>
          <ol className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>1. Note the &quot;Rendered at&quot; timestamp above</li>
            <li>2. Refresh this page (Cmd/Ctrl + R)</li>
            <li>3. The timestamp should remain the same (cache hit)</li>
            <li>4. Check the console - you won&apos;t see new render logs</li>
            <li>5. This cache is shared globally across all users</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
