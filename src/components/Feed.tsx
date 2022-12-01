import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

export type FeedProps = {
  items: FeedItemProps[];
  pagination?: PaginationProps;
};

export type PaginationProps = {
  pageCount: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type FeedItemProps = {
  image: string;
  link: string;
  title: string;
};

export function Feed({ items, pagination }: FeedProps) {
  return (
    <div className="feed">
      <div className="feed-grid">
        {items.map((item, index) => (
          <FeedItem {...item} key={index} />
        ))}
      </div>
      {pagination && <Pagination {...pagination} />}
      <style jsx>{`
        .feed {
          padding: 8px 0;
        }

        .feed-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 600px) {
          .feed-grid {
            gap: 1px !important;
          }
        }
      `}</style>
    </div>
  );
}

function FeedItem({ image, link, title }: FeedItemProps) {
  return (
    <Link href={link}>
      <Image
        src={image}
        width="200"
        height="200"
        alt={title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          aspectRatio: "1",
        }}
      />
    </Link>
  );
}

function Pagination({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  pageCount,
}: PaginationProps) {
  return (
    <div className="pagination">
      <div className="pagination-desktop">
        {Array.from(
          { length: Math.ceil(pageCount) },
          (_, index) => index + 1
        ).map((page) => {
          if (page === currentPage) {
            return (
              <span key={page} className="pagination-link current-page">
                {page}
              </span>
            );
          }

          return (
            <Link
              href={page === 1 ? "/" : `/posts/page/${page}`}
              key={page}
              className="reset-anchor"
              title={`Ir para a página ${page}`}
            >
              <span className="pagination-link">{page}</span>
            </Link>
          );
        })}
      </div>
      <div className="pagination-mobile">
        {hasPreviousPage && (
          <Link
            href={
              currentPage - 1 === 1 ? "/" : `/posts/page/${currentPage - 1}`
            }
            className="reset-anchor"
            title="Voltar uma página"
          >
            <span className={"pagination-link"}>
              <MdArrowLeft size="32px" aria-label="Página anterior" />
            </span>
          </Link>
        )}
        {hasNextPage && (
          <Link
            href={`/posts/page/${currentPage + 1}`}
            className="reset-anchor"
            title="Avançar para a próxima página"
          >
            <span className={"pagination-link"}>
              <MdArrowRight size="32px" aria-label="Próxima página" />
            </span>
          </Link>
        )}
      </div>
      <style jsx>{`
        .pagination-desktop {
          display: none;
        }
        .pagination-mobile {
          display: flex;
        }
        @media (min-width: 600px) {
          .pagination-desktop {
            display: flex !important;
          }
          .pagination-mobile {
            display: none !important;
          }
        }
        .pagination-desktop,
        .pagination-mobile {
          justify-content: center;
          margin-top: 1em;
        }
        .pagination-link {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: red;
          margin: 1em;
          width: 36px;
          height: 36px;
          border-radius: 18px;
          background-color: #ccc;
          font-size: 12px;
        }
        .current-page {
          background-color: #003366;
          color: #fff;
        }
        .pagination-link:hover {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
