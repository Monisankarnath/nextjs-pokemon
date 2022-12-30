import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

type pokemon = {
  id: number;
  name: string;
  image: any;
};
export async function getServerSideProps() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}
export default function Home({ pokemon }: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon</title>
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemon?.map((pok: pokemon) => (
          <div className={styles.card} key={pok?.id}>
            <Link href={`/pokemon/${pok?.id}`}>
              <picture>
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pok?.image}`}
                  alt={pok?.name}
                />
              </picture>
              <h3>{pok?.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
