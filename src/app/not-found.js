import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#2E0056]">Page Not Found</h2>
            <p className="mb-8 text-slate-600">Could not find requested resource</p>
            <Link href="/" className="btn btn-primary">
                Return Home
            </Link>
        </div>
    );
}
