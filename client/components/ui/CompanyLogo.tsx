import Image from 'next/image';

type LogoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  // loading: 'lazy' | 'eager';
};
export const CompanyLogo = ({
  src,
  alt,
  width,
  height,
  className,
}: LogoProps) => {
  return (
    <div
      className={`overflow-hidden rounded-full ${className ?? ''}`}
      style={{ width, height }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        className="size-full object-contain"
      />
    </div>
  );
};
