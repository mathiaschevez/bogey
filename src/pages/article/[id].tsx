import { useRouter } from 'next/router'
import React from 'react'
import { MockArticles } from '~/styles/constants'

const ArticleDetail = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      Article
    </div>
  )
}

export default ArticleDetail