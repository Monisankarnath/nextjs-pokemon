import Link from "next/link";
import styles from "../../styles/Details.module.css";
import Head from "next/head";

export async function getServerSideProps({ params }: any) {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );
  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

const Details = ({ pokemon }: any) => {
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
