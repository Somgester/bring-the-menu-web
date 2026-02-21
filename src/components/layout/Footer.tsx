import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="flex flex-col gap-4 sm:flex-row py-8 w-full shrink-0 items-center justify-between px-4 md:px-6 border-t border-green-200/50 bg-white">
      <p className="text-sm text-green-medium/70">
        © {currentYear} BringTheMenu. All rights reserved.
      </p>
      <nav className="flex gap-6" aria-label="Footer navigation">
        <Link className="text-sm text-green-DEFAULT hover:text-green-medium transition-colors" href="#">
          Terms of Service
        </Link>
        <Link className="text-sm text-green-DEFAULT hover:text-green-medium transition-colors" href="#">
          Privacy
        </Link>
      </nav>
    </footer>
  );
}
