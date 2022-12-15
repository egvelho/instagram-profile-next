import Link from "next/link";
import { GrHomeRounded, GrLogout, GrLogin, GrChat } from "react-icons/gr";
import { Avatar } from "src/components/Avatar";
import { signOut, useSession } from "next-auth/react";

export function AppBarItems() {
  const { data, status } = useSession();

  return (
    <div className="app-bar-items">
      {status === "authenticated" && (
        <>
          <a className="item" href="/user/messenger" title="Conversar">
            <GrChat size="22px" aria-label="Conversar" />
          </a>
          <a
            href="/api/auth/signout"
            className="item"
            title="Sair"
            onClick={(event) => {
              event.preventDefault();
              signOut();
            }}
          >
            <GrLogout size="22px" aria-label="Sair" />
          </a>
        </>
      )}
      {status === "unauthenticated" && (
        <a className="item" href="/api/auth/signin" title="Entrar">
          <GrLogin size="22px" aria-label="Entrar" />
        </a>
      )}
      <a className="item" href="/" title="Ir para home">
        <GrHomeRounded size="22px" aria-label="Home" />
      </a>
      <span className="item">
        <Link href={data?.user ? "/user/profile" : "/signup"}>
          <Avatar
            size={36}
            name={data?.user.name}
            src={data?.user.name ? undefined : "/avatar.jpeg"}
            alt=""
          />
        </Link>
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
