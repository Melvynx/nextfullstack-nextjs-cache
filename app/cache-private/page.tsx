import { unstable_cacheLife as cacheLife } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

async function UserSpecificData() {
  "use cache: private";
  cacheLife({ stale: 60 });

  const cookieStore = await cookies();
  const userId = cookieStore.get("demo-user-id")?.value || "anonymous";

  const timestamp = new Date().toISOString();
  const renderTime = timestamp;

  console.log("🟣 [use cache: private] Component rendered at:", timestamp, "for user:", userId);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const userPreferences = {
    theme: cookieStore.get("theme")?.value || "system",
    language: cookieStore.get("language")?.value || "en",
    notifications: cookieStore.get("notifications")?.value || "enabled",
  };

  const mockUserData = {
    username: userId === "anonymous" ? "Guest User" : `User ${userId.slice(0, 8)}`,
    lastLogin: timestamp,
    unreadMessages: userId.length % 10,
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          Cached Data (Private)
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            <strong>User ID:</strong> {userId}
          </p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            <strong>Rendered at:</strong> {timestamp}
          </p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            <strong>Render time:</strong> {renderTime}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            Cache expires after 60 seconds
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          User Profile
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Username</span>
            <span className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
              {mockUserData.username}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Last Login</span>
            <span className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
              {new Date(mockUserData.lastLogin).toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Unread Messages</span>
            <span className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
              {mockUserData.unreadMessages}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          User Preferences (from cookies)
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Theme</span>
            <span className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
              {userPreferences.theme}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Language</span>
            <span className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
              {userPreferences.language}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Notifications</span>
            <span className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
              {userPreferences.notifications}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function CachePrivatePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="flex w-full max-w-4xl flex-col gap-8 px-8 py-16">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-zinc-950 dark:text-zinc-50">
              use cache: private
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Per-user cache (client-side)
            </p>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            ← Back
          </Link>
        </div>

        <div className="rounded-lg border border-purple-200 bg-purple-50 p-6 dark:border-purple-900 dark:bg-purple-950">
          <h2 className="mb-3 text-lg font-semibold text-purple-950 dark:text-purple-50">
            Characteristics
          </h2>
          <ul className="space-y-1 text-sm text-purple-800 dark:text-purple-200">
            <li>• Cache scope: Per-user (isolated)</li>
            <li>• Storage: Client-side only (browser memory/cache)</li>
            <li>• Dynamic context: Yes</li>
            <li>• Access to cookies/headers: Yes</li>
            <li>• Minimum cache time: 30 seconds</li>
            <li>• Runtime prefetching: Supported</li>
          </ul>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <UserSpecificData />
        </Suspense>

        <div className="rounded-lg border border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-3 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            Test Instructions
          </h3>
          <ol className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>1. Note the User ID and timestamp above</li>
            <li>2. Refresh this page multiple times within 60 seconds</li>
            <li>3. The timestamp should stay the same (cache hit)</li>
            <li>4. Wait 60+ seconds and refresh - timestamp updates</li>
            <li>5. Open in incognito/private window - different User ID and cache</li>
            <li>6. This cache is stored client-side, not on the server</li>
            <li>
              7. Check DevTools → Network tab → Headers for x-nextjs-cache
            </li>
          </ol>
        </div>

        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-900 dark:bg-yellow-950">
          <h3 className="mb-3 text-lg font-semibold text-yellow-950 dark:text-yellow-50">
            Where is the cache stored?
          </h3>
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            The cache is stored in the browser&apos;s memory (Router Cache), not in localStorage,
            IndexedDB, or Cache Storage. It&apos;s managed by Next.js and React internally. You won&apos;t
            see it in DevTools Application tab - it&apos;s in RAM! To verify: check console logs and
            observe when the component re-renders.
          </p>
        </div>
      </main>
    </div>
  );
}
