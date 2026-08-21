import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-wrap py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-mute">That URL is not in the Klear Club catalog.</p>
      <Link href="/store" className="mt-8 inline-flex text-sm font-medium text-klear-deep">
        Go to store
      </Link>
    </div>
  );
}
