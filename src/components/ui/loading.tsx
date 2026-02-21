/**
 * Loading spinner component
 */
export function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center min-h-screen ${className}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-DEFAULT"></div>
    </div>
  );
}
