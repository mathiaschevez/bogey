import { useRouter } from 'next/router'
import React from 'react'
import { MockArticles } from '~/styles/constants'

const ArticleDetail = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className='flex-1'>
      Article
    </div>
  )
}

export default ArticleDetail