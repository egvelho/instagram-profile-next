import Image from "next/image";

export type AvatarProps = {
  size?: number;
  alt: string;
  src?: string;
  name?: string;
};

export function Avatar({ size = 24, name, alt, src }: AvatarProps) {
  return (
    <div className="avatar">
      {src === undefined && name !== undefined ? (
        <div className="avatar-initials">{getInitials(name)}</div>
      ) : (
        <Image
          src={src as string}
          width={size}
          height={size}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: `calc(${size}px / 2)`,
          }}
        />
      )}
      <style jsx>{`
        .avatar {
          width: ${size}px;
          height: ${size}px;
        }

        .avatar-initials {
          width: ${size}px;
          height: ${size}px;
          border-radius: calc(${size}px / 2);
          background-color: #883997;
          color: #f9f9f9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: calc(${size}px / 2.5);
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

function getInitials(name: string) {
  const splittedName = name.trim().toUpperCase().split(" ");
  const firstName = splittedName[0] || "";
  const lastName = splittedName[splittedName.length - 1] || "";

  if (splittedName.length > 1 && firstName.length > 0 && lastName.length > 0) {
    return firstName[0].concat(lastName[0]);
  } else if (firstName.length > 0) {
    return firstName[0].concat(firstName[firstName.length - 1]);
  } else {
    return "??";
  }
}
