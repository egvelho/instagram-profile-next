import { GrFavorite, GrHomeRounded } from "react-icons/gr";
import { Avatar } from "./Avatar";

export function AppBarItems() {
  return (
    <div className="app-bar-items">
      <a className="item" href="/" title="Ver favoritos">
        <GrFavorite size="22px" aria-label="Favoritos" />
      </a>
      <a className="item" href="/" title="Ir para home">
        <GrHomeRounded size="22px" aria-label="Home" />
      </a>
      <span className="item">
        <Avatar
          src="https://eduardovelho.com/images/egvelho.jpg"
          alt="Foto de egvelho"
          size="36px"
        />
      </span>
      <style jsx>{`
        .app-bar-items {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .item {
          display: flex;
          align-items: center;
        }

        .item:not(:first-child) {
          margin-left: 22px;
        }
      `}</style>
    </div>
  );
}
