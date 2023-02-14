import Specification from "./Specification"

describe('Specification', () => {
  it('should have search and page', () => {
    let search = "test..."
    let page = 1
    let specification = new Specification(search, page)

    expect(specification.search).toBe(search)
    expect(specification.page).toBe(page)
  })
})