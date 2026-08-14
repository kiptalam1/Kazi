import Image from 'next/image';

type LogoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};
export const CompanyLogo = ({ src, alt, width, height, className }: LogoProps) => {
  return (
    <div className={`overflow-hidden rounded-full ${width} ${height} ${className ?? ''}`}>
      <Image src={src} alt={alt} width={width} height={height} className="object-cover" />
    </div>
  );
};
