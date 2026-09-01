export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#ffffff] px-6">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6">🚧</div>

        <h1 className="font-heading text-4xl font-semibold tracking-tight">
          Blogify is temporarily unavailable
        </h1>

        <p className="mt-4 text-gray-500 leading-7">
          We are currently performing some maintenance.
          Please check back soon.
        </p>
      </div>
    </main>
  );
}