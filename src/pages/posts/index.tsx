import Head from "next/head";
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="/#">
            <time>12 de abril de 2021</time>
            <strong>Galo doido de BH</strong>
            <p>
              Galo doido de minas e o atletico mg galo doidooo galo de minas e o maior de todos os tempos
            </p>
          </a>

          <a href="/#">
            <time>12 de abril de 2021</time>
            <strong>Galo doido de BH</strong>
            <p>
              Galo doido de minas e o atletico mg galo doidooo galo de minas e o maior de todos os tempos
            </p>
          </a>

          <a href="/#">
            <time>12 de abril de 2021</time>
            <strong>Galo doido de BH</strong>
            <p>
              Galo doido de minas e o atletico mg galo doidooo galo de minas e o maior de todos os tempos
            </p>
          </a>
        </div>
      </main>
    </>
  )
}