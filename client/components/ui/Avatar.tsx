import Image from 'next/image';

type AvatarProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};
export const Avatar = ({ src, alt, width, height, className }: AvatarProps) => {
  return (
    <div
      className={`overflow-hidden rounded-full ${width} ${height} ${className ?? ''}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
      />
    </div>
  );
};
