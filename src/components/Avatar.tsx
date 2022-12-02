import Image from "next/image";

export type AvatarProps = {
  size?: number;
  alt: string;
  src: string;
};

export function Avatar({ size = 24, alt, ...data }: AvatarProps) {
  return (
    <div className="avatar">
      <Image
        src={data.src}
        width={size}
        height={size}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: `calc(${size}px / 2)`,
        }}
      />
      <style jsx>{`
        .avatar {
          width: ${size}px;
          height: ${size}px;
        }
      `}</style>
    </div>
  );
}
