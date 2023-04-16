import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { colorList, colors } from "~/styles/constants";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col gap-12">
        <FeaturedSection />
        <Articles />
        <SubscribeSection />
      </main>
    </>
  );
};

export default Home;

export function FeaturedSection() {
  return (
    <div className='flex justify-center border-black max-h-[700px] overflow-hidden'>
      <Image className="object-fill" alt='Golf Image' src='https://r4.wallpaperflare.com/wallpaper/553/206/435/nature-landscape-trees-grass-wallpaper-2b365c1d83a17fe9d5441bd94dcc9ca0.jpg' height={700} width={2000} />
    </div>
  )
}

export function Articles() {
  const MockArticles = [
    {
      id: '1',
      title: 'Article 1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      image: 'https://r4.wallpaperflare.com/wallpaper/553/206/435/nature-landscape-trees-grass-wallpaper-2b365c1d83a17fe9d5441bd94dcc9ca0.jpg'
    },
    {
      id: '2',
      title: 'Article 2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      image: 'https://r4.wallpaperflare.com/wallpaper/553/206/435/nature-landscape-trees-grass-wallpaper-2b365c1d83a17fe9d5441bd94dcc9ca0.jpg'
    },
    {
      id: '3',
      title: 'Article 3',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      image: 'https://r4.wallpaperflare.com/wallpaper/553/206/435/nature-landscape-trees-grass-wallpaper-2b365c1d83a17fe9d5441bd94dcc9ca0.jpg'
    },
  ]

  return (
    <div className='w-full h-[300px] flex px-10 justify-between'>
      {MockArticles.map((article, i) => {
        return (
          <div key={article.id} className='w-[30%]'>
            <div className='text-white px-3 py-1 mb-1 max-w-[100px]' style={{ background: colorList[i]}}>Category</div>
            <h1 className='text-lg font-bold'>{article.title}</h1>
            <p>{article.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export function SubscribeSection() {
  return (
    <div className='bg-black w-full h-[300px]'></div>
  )
}

