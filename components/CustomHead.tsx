import Head from "next/head";

export const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};
