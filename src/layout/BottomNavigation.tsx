import Link from "next/link";
import { GrFavorite, GrHomeRounded } from "react-icons/gr";
import { Avatar } from "src/components/Avatar";

const bottomNavigationHeight = "48px";

export function BottomNavigation() {
  return (
    <div className="bottom-navigation">
      <Link className="item" href="/" title="Ver favoritos">
        <GrFavorite size="22px" aria-label="Favoritos" />
      </Link>
      <Link className="item" href="/" title="Ir para home">
        <GrHomeRounded size="22px" aria-label="Home" />
      </Link>
      <span className="item">
        <Avatar
          src="https://eduardovelho.com/images/egvelho.jpg"
          alt="Foto de egvelho"
          size="36px"
        />
      </span>
      <style jsx>{`
        .bottom-navigation {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background-color: #fff;
          border-top: 1px solid #ccc;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: ${bottomNavigationHeight};
        }

        .item {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :global(body) {
          padding-bottom: ${bottomNavigationHeight};
        }

        @media (min-width: 600px) {
          .bottom-navigation {
            display: none !important; // Má prática, evitar !important
          }
        }
      `}</style>
    </div>
  );
}
