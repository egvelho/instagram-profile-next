export type AvatarProps = {
  size?: number | string;
  alt: string;
  src: string;
};

export function Avatar({ size = "24px", alt, ...data }: AvatarProps) {
  return (
    <div className="avatar">
      <img src={data.src} width={size} height={size} alt={alt} />
      <style jsx>{`
        .avatar {
          width: ${size};
          height: ${size};
        }

        img {
          width: 100%;
          height: 100%;
          border-radius: calc(${size} / 2);
        }
      `}</style>
    </div>
  );
}
