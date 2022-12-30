import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/Details.module.css";
import Head from "next/head";

type PokemonProps = {
  id: number;
  name: string;
  image: any;
  type: string;
};

const Details = () => {
  const {
    query: { id },
  } = useRouter();
  const [pokemon, setPokemon] = useState<PokemonProps | null>(null);

  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
      );
      setPokemon(await resp.json());
    }
    if (id) getPokemon();
  }, [id]);
  if (!pokemon) return <div>loading ...</div>;
  return (
    <div className={styles.container}>
      <Head>
        <title>{pokemon?.name}</title>
      </Head>
      <div>
        <Link href="/">Back To Home</Link>
      </div>
      <div className={styles.layout}>
        <div>
          <picture>
            <img
              className={styles.picture}
              src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon?.image}`}
              alt={pokemon?.name}
            />
          </picture>
        </div>
        <div>
          <div className={styles.name}>{pokemon?.name}</div>
          <div className={styles.type}>{pokemon?.type}</div>
        </div>
      </div>
    </div>
  );
};
export default Details;
