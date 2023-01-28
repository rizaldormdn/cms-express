import ArticleDate from './ArticleDate'

describe('ArticleDate Value object', () => {
     let createdAt = new Date()
     let updatedAt = new Date()
     let articleDate: ArticleDate = new ArticleDate(createdAt, updatedAt)
     
     test('check createdAt property', () => {
          expect(articleDate.createdAt.getTime()).toBe(createdAt.getTime())
     })
     test('check updatedAt property', () => {
          expect(articleDate.updatedAt.getTime()).toBe(updatedAt.getTime())
     })
     test('check createdAt getter', () => {
          expect(articleDate.createdAt).toBe(createdAt)
     })
     test('check updatedAt getter', () => {
          expect(articleDate.updatedAt).toBe(updatedAt)
     })
})