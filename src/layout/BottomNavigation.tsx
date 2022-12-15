import Link from "next/link";
import { Avatar } from "src/components/Avatar";
import { GrHomeRounded, GrLogout, GrLogin, GrChat } from "react-icons/gr";
import { signOut, useSession } from "next-auth/react";

const bottomNavigationHeight = "48px";

export function BottomNavigation() {
  const { data, status } = useSession();

  return (
    <div className="bottom-navigation">
      {status === "authenticated" && (
        <>
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
          <a className="item" href="/user/messenger" title="Conversar">
            <GrChat size="22px" aria-label="Conversar" />
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
