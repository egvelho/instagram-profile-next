import type { GetServerSideProps } from "next";

export type TesteProps = {
  items: string[];
};

export default function Teste({ items }: TesteProps) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export const getServerSideProps: GetServerSideProps<TesteProps> = async () => {
  const items = Array.from({ length: 10 }, () =>
    new Date().toLocaleTimeString()
  );

  return {
    props: {
      items,
    },
  };
};
