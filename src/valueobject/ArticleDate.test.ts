import ArticleDate from './ArticleDate'

<<<<<<< HEAD
describe('vlaue object ArticleDate', () => {
     const articleDate: ArticleDate = new ArticleDate()

     it('should set createdAt to current date by default', () => {
          expect(articleDate.createdAt).toBeInstanceOf(Date)
     })
     it('should set updatedAt to current date by default', () => {
          expect(articleDate.updatedAt).toBeInstanceOf(Date)
     })
     it('should set createdAt to provided date', () => {
          const createdAt = new Date('2023-01-01')
          const articleDate = new ArticleDate(createdAt)
          expect(articleDate.createdAt).toEqual(createdAt)
     })
     it('should set updatedAt to provided date', () => {
          const updatedAt = new Date('2023-01-01')
          const articleDate = new ArticleDate(undefined, updatedAt)
          expect(articleDate.updatedAt).toEqual(updatedAt)
     })
     it('should update updatedAt', () => {
          const updatedAt = new Date('2023-01-01')
          articleDate.update(updatedAt)
          expect(articleDate.updatedAt).toEqual(updatedAt)
=======
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
>>>>>>> a97dbfb09ec3c60ad8275b4edb05a98036c71235
     })
})