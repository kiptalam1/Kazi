type ModalProps = React.ComponentProps<'div'> & {
  onClose: () => void;
};
export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-2xl"
    >
      {children}
    </div>
  );
}
