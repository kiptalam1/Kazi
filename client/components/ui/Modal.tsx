import { useEffect, useRef } from 'react';

type ModalProps = React.ComponentProps<'div'> & {
  onClose: () => void;
  ariaLabel?: string;
};

export default function Modal({
  onClose,
  children,
  ariaLabel = 'Dialog',
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previousActiveElement = document.activeElement;
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCloseRef.current();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, []);

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="bg-overlay/50 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className="flex max-h-[calc(100vh-2rem)] w-full justify-center overflow-y-auto outline-none"
      >
        {children}
      </div>
    </div>
  );
}
