import {Head, Html, Main, NextScript} from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" sizes="180x180" href="/favicon/favicon.ico" />
        <link rel="stylesheet" href="/_next/static/style.css" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
