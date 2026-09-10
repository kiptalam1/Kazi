import Spinner from '@/components/ui/Spinner';

export default function Loader() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <Spinner />
    </div>
  );
}
