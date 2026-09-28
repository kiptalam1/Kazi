import Spinner from '@/components/ui/Spinner';

export default function Loader() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <Spinner className="text-brand-active size-6 sm:size-8" />
        <p className="text-brand-active text-center text-sm sm:text-base">
          Loading ...
        </p>
      </div>
    </div>
  );
}
