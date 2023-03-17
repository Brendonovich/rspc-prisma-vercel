import { NextPage } from "next";
import Head from "next/head";
import { useMutation } from "../src/rspc";
import styles from "../styles/Home.module.css";

const UsingUseMutation: NextPage = () => {
  const { mutate, data, isLoading, error } = useMutation("createUser");

  return (
    <div className={styles.container}>
      <Head>
        <title>Using useMutation | RSPC Example with Next.js</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <code>useMutation</code>
        </h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            mutate({ email: event.currentTarget.email.value });
          }}
        >
          <input type="text" name="email" placeholder="Email" />
          <button>Submit</button>
        </form>

        <p className={styles.description}>
          {isLoading && "Loading data ..."}
          {data && `Server received message: ${JSON.stringify(data)}`}
          {error?.message}
        </p>
      </main>
    </div>
  );
};

export default UsingUseMutation;
