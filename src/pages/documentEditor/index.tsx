import { Button, Input, Modal } from "antd";
import { useSession } from "next-auth/react";
import Head from "next/head"
import { useState } from "react";
import { type ArticleResponse } from "~/server/api/routers/article";
import { colors } from "~/styles/constants";
import { api } from "~/utils/api"

const DocumentEditor = () => {
  const { data: sessionData } = useSession()
  const userArticles = api.article.getUserArticles.useQuery({ userId: sessionData?.user.id ?? ''})

  const saveArticle = api.article.saveParagraph.useMutation()
  const publishArticle = api.article.publishArticle.useMutation()

  const [savedArticlesModalOpen, setSavedArticlesModalOpen] = useState<boolean>(false)
  const [articleTitle, setArticleTitle] = useState<string>('')
  const [textAreaValue, setTextAreaValue] = useState<string>('')

  const [currentArticle, setCurrentArticle] = useState<ArticleResponse | null>(null)
  const [selectedSavedArticle, setSelectedSavedArticle] = useState<ArticleResponse | null>(null)

  const handleSaveParagraph = async () => {
    try {
      if (!sessionData || !sessionData?.user.id) return console.log('no session data')
          
      const res = await saveArticle.mutateAsync({
        userId: sessionData.user.id,
        title: articleTitle,
        content: textAreaValue,
        articleId: currentArticle?.id
      })

      if (res === 'Error') return console.log('error saving article')

      console.log(res, 'successfully saved article')
      setCurrentArticle(res)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePublishArticle = async () => {
    try {
      if (!sessionData || !sessionData?.user.id) return console.log('no session data')
            
      const res = await publishArticle.mutateAsync({
        userId: sessionData.user.id,
        title: articleTitle,
        content: textAreaValue
      })

      res === 'Error' ?
        console.log('error saving article') :
        console.log(res, 'successfully saved article') 
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoadArticle = () => {
    if (!selectedSavedArticle) return

    setArticleTitle(selectedSavedArticle.title)
    setTextAreaValue(selectedSavedArticle.paragraphs[0]?.content ?? '')

    setSavedArticlesModalOpen(false)
  }

  return (
    <>
      <Head>
        <title>Bogey Blaine</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <div className='flex-1 flex items-center'>
          <SidePanel setSavedArticlesModalOpen={setSavedArticlesModalOpen} />
          <div className={`flex flex-col flex-1 ml-60`}>
            <ContentCreation
              currentArticle={currentArticle}
              articleTitle={articleTitle}
              setArticleTitle={setArticleTitle}
              textAreaValue={textAreaValue}
              setTextAreaValue={setTextAreaValue}
            />
            <SaveAndPublishButtons
              handleSaveParagraph={handleSaveParagraph}
              handlePublishArticle={handlePublishArticle}
            />
          </div>
        </div>
        <Modal
          title='Saved Articles' 
          open={savedArticlesModalOpen}
          footer={[
            <Button key='cancel'>Cancel</Button>,
            <Button key='load' disabled={!selectedSavedArticle} onClick={() => handleLoadArticle()}>Load</Button>
          ]}
          onCancel={() => setSavedArticlesModalOpen(false)}
        >
          <div className='flex flex-col justify-center items-center'>
            {userArticles.data?.map(article => (
              <div 
                key={article.id}
                className={`border border-slate-400 p-3 w-full cursor-pointer hover:border-blue-600 ${selectedSavedArticle?.id === article.id ? 'border-blue-600' : ''}`}
                onClick={() => setSelectedSavedArticle(article)}
              >
                <>{article.title}</>
              </div>
            ))}
          </div>
        </Modal>
      </>
    </>
  );
}

export default DocumentEditor

const SidePanel = ({ setSavedArticlesModalOpen }: { setSavedArticlesModalOpen: (_: boolean) => void }) => {

  return (
    <div className='fixed flex flex-col px-3 gap-6 h-full mt-16 pt-20 z-10'>
      <Button
        size='large'
        className={`border-black hover:bg-black hover:text-white`}
        onClick={() => setSavedArticlesModalOpen(true)}
      >Saved Articles</Button>
      <Button
        size='large'
        className={`border-black hover:bg-black hover:text-white`}
      >Preview Article</Button>
    </div>
  )
}

const ContentCreation = ({ currentArticle, articleTitle, textAreaValue, setArticleTitle, setTextAreaValue }: { currentArticle: ArticleResponse | null, articleTitle: string, setArticleTitle: (_: string) => void, textAreaValue: string, setTextAreaValue: (_:string) => void }) => {
  return (
    <div>
      { currentArticle?.title ? 
          <div className='text-3xl font-bold mb-6'>{currentArticle.title}</div> :
        currentArticle?.id ?  
          <div className='text-3xl font-bold mb-6'>{currentArticle.title}</div> :
          null 
      }
      <div className='items-center flex justify-center cursor-pointer border-2 border-black font-bold text-xl w-[80%] h-48 mb-6'>Image +</div>
      <Input
        size='large'
        className='mx-auto w-[80%] mb-6'
        placeholder='The Title for this Article'
        value={articleTitle}
        onChange={(e) => setArticleTitle(e.target.value)}
      />
      <Input.TextArea 
        className='mx-auto w-[80%]'
        value={textAreaValue}
        onChange={(e) => setTextAreaValue(e.target.value)}
        autoSize={{ minRows: 10, maxRows: 20 }}
      />
    </div>
  )
}

const SaveAndPublishButtons = ({ handleSaveParagraph, handlePublishArticle }: { handleSaveParagraph: () => Promise<void>, handlePublishArticle: () => Promise<void> }) => {
  return (
    <div className='flex gap-6 mt-9'>
      <Button
        size='large'
        className={`border-black hover:bg-black hover:text-white`}
        onClick={handleSaveParagraph as () => void}
      >Save Paragraph</Button>
      <Button
        size='large'
        style={{ background: colors.black}}
        className={`text-white`}
        onClick={handlePublishArticle as () => void}
      >Publish Article</Button>
    </div>
  )
}
