type ProfileDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProfileDropdown({
  isOpen,
  onClose,
}: ProfileDropdownProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute z-50 right-0 border border-border bg-white top-full w-60 h-60 mt-2 shadow-xs rounded-sm"></div>
  );
}
