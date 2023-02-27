import ArticleDate from './ArticleDate'

describe('vlaue object ArticleDate', () => {
  let articleDate: ArticleDate = new ArticleDate()

  it('should set createdAt to current date by default', () => {
    expect(articleDate.createdAt).toBeInstanceOf(Date)
  })

  it('should set updatedAt to current date by default', () => {
      expect(articleDate.updatedAt).toBeInstanceOf(Date)
  })

  it('should set createdAt to provided date', () => {
    let createdAt = new Date('2023-01-01')
    let articleDate = new ArticleDate(createdAt)

    expect(articleDate.createdAt).toEqual(createdAt)
  })

  it('should set updatedAt to provided date', () => {
    let updatedAt = new Date('2023-01-01')
    let articleDate = new ArticleDate(undefined, updatedAt)
    
    expect(articleDate.updatedAt).toEqual(updatedAt)
  })

  it('should update updatedAt', () => {
    let previousDate = articleDate.updatedAt

    articleDate.update()

    expect(articleDate.updatedAt).not.toEqual(previousDate)
  })
})