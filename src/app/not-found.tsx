import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/44">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">This page is outside the system map.</h1>
        <p className="mt-4 leading-8 text-muted">Return to the digital headquarters.</p>
        <ButtonLink href="/" variant="primary" className="mt-8">
          Go home
        </ButtonLink>
      </div>
    </main>
  );
}
