import Link from "next/link";
import styles from "../../styles/Details.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import LoadingPage from "../LoadingPage";

export async function getStaticPaths() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const pokemon = await resp.json();
  return {
    paths: pokemon.map((pok: any) => ({
      params: { id: pok.id.toString() },
    })),
    fallback: true,
  };
}
export async function getStaticProps({ params }: any) {
  try {
    const resp = await fetch(
      `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
    );
    const response = await resp.json();
    return {
      props: {
        pokemon: response,
      },
      revalidate: 30,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

const Details = ({ pokemon }: any) => {
  const router = useRouter();
  if (router.isFallback) {
    return <LoadingPage />;
  }
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
