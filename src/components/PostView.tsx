import Image from "next/image";
import { Avatar } from "./Avatar";

export type PostViewProps = {
  image: string;
  authorAvatar: string;
  authorUsername: string;
  content: string;
  publishDate: string;
};

export function PostView({
  image,
  authorAvatar,
  authorUsername,
  content,
  publishDate,
}: PostViewProps) {
  return (
    <div className="post-view">
      <div className="image-container row">
        {image && (
          <Image
            priority
            src={image}
            width="800"
            height="800"
            alt=""
            style={{
              objectFit: "cover",
              width: "100%",
            }}
          />
        )}
      </div>
      <div className="content-container row">
        <header className="content-item avatar-container">
          {authorAvatar && (
            <Avatar
              src={authorAvatar}
              alt={`Foto de ${authorUsername}`}
              size={48}
            />
          )}
          <span>{authorUsername}</span>
        </header>
        <div
          className="content-item"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="content-item">
          <time dateTime={new Date(publishDate).toJSON()}>
            {new Date(publishDate).toLocaleDateString("pt-br")}
          </time>
        </div>
      </div>
      <style jsx>{`
        .post-view {
          background-color: #fff;
          border-radius: 8px;
          border: 1px solid #ccc;
          display: flex;
          max-height: 800px;
          box-sizing: border-box;
        }

        .image-container {
          background-color: #000;
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content-container {
          flex: 1;
          overflow-x: auto;
          padding: 8px;
        }

        .image-container img {
          width: 100%;
        }

        .avatar-container {
          display: flex;
          align-items: center;
        }

        .avatar-container span {
          margin-left: 8px;
          font-size: 18px;
          font-weight: bold;
        }

        .content-item:not(:first-child) {
          margin-top: 16px;
        }

        @media (max-width: 600px) {
          .post-view {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
