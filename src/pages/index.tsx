import Head from "next/head";
import { MainContent } from "@/components/MainContent";
import { AudioVisual } from "@/components/AudioVisual";

export default function Home() {
  return (
    <>
      <Head>
        <title>Birth day 2023</title>
        <meta name="description" content="Birth day 2023" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        {/* <MainContent /> */}
        <AudioVisual />
      </main>
    </>
  );
}
