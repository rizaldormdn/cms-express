import mysql, { Connection } from "mysql2";
import sinon, { SinonMock } from "sinon";
import * as ArticleRepositoryInterface from "../../../domain/repository/ArticleRepository";
import ArticleRepository from "./ArticleRepository";
import { article, specification, email, slug } from "../../../../testdata"

describe("ArticleRepository", () => {
  let connection: Connection = mysql.createConnection({host: "localhost"});
  let mock: SinonMock = sinon.mock(connection);
  let articleRepository: ArticleRepositoryInterface.default = new ArticleRepository(connection);

  describe("get featured articles", () => {
    it("should return featured articles", async () => {
      let query = `
        SELECT
          slug,
          title,
          excerpt,
          thumbnail_url,
          first_name,
          last_name,
          tags,
          articles.created_at AS created_at,
          articles.updated_at AS updated_at
        FROM articles
        JOIN images ON images.id = articles.image_id
        JOIN users ON users.email = articles.author_email
        ORDER BY articles.updated_at DESC LIMIT ?
      `
      let expected = [
        {
          slug: 'this-is-title',
          title: 'This is title',
          excerpt: 'This is excerpt.',
          thumbnail_url: 'http://example.com/thumbnail.jpg',
          first_name: 'John',
          last_name: 'Doe',
          tags: 'tag1,tag2,tag3',
          created_at: new Date().toString(),
          updated_at: new Date().toString()
        }
      ];
      let columns = ["slug", "title", "excerpt", "thumbnail_url", "first_name", "last_name", "tags", "created_at", "updated_at"]
    
      mock
        .expects("query")
        .once()
        .withArgs(query)
        .callsArgWith(
          2,
          null,
          expected,
          columns
        );
  
      try {
        expect(await articleRepository.getFeaturedArticles()).toBeDefined()
      } catch(err) {
        expect(err).toBeUndefined()
      }
    })
  
    it("should return an error if failed get featured articles", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null);
  
      try {
        expect(await articleRepository.getFeaturedArticles()).toBeUndefined()
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });
  })

  describe("get articles", () => {
    it("should return articles", async () => {
      let query = `
        SELECT
          slug,
          title,
          excerpt,
          thumbnail_url,
          first_name,
          last_name,
          tags,
          articles.created_at AS created_at,
          articles.updated_at AS updated_at
        FROM articles
        JOIN images ON images.id = articles.image_id
        JOIN users ON users.email = articles.author_email
        WHERE title LIKE ?
        ORDER BY articles.updated_at DESC LIMIT ?, ?
      `
      let expected = [
        {
          slug: 'this-is-title',
          title: 'This is title',
          excerpt: 'This is excerpt.',
          thumbnail_url: 'http://example.com/thumbnail.jpg',
          first_name: 'John',
          last_name: 'Doe',
          tags: 'tag1,tag2,tag3',
          created_at: new Date().toString(),
          updated_at: new Date().toString()
        }
      ];
      let columns = ["slug", "title", "excerpt", "thumbnail_url", "first_name", "last_name", "tags", "created_at", "updated_at"]
    
      mock
        .expects("query")
        .once()
        .withArgs(query)
        .callsArgWith(
          2,
          null,
          expected,
          columns
        );
  
      try {
        expect(await articleRepository.getArticles(specification)).toBeDefined()
      } catch(err) {
        expect(err).toBeUndefined()
      }
    })
  
    it("should return an error if failed get articles", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null);
  
      try {
        expect(await articleRepository.getArticles(specification)).toBeUndefined()
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    })
  })

  describe("it should get articles by author", () => {
    it("should get articles by author", async () => {
      let query = `
        SELECT
          slug,
          title,
          excerpt,
          thumbnail_url,
          first_name,
          last_name,
          tags,
          articles.created_at AS created_at,
          articles.updated_at AS updated_at
        FROM articles
        JOIN images ON images.id = articles.image_id
        JOIN users ON users.email = articles.author_email
        WHERE title LIKE ? AND articles.author_email = ?
        ORDER BY articles.updated_at DESC LIMIT ?, ?
      `
      let expected = [
        {
          slug: 'this-is-title',
          title: 'This is title',
          excerpt: 'This is excerpt.',
          thumbnail_url: 'http://example.com/thumbnail.jpg',
          first_name: 'John',
          last_name: 'Doe',
          tags: 'tag1,tag2,tag3',
          created_at: new Date().toString(),
          updated_at: new Date().toString()
        }
      ];
      let columns = ["slug", "title", "excerpt", "thumbnail_url", "first_name", "last_name", "tags", "created_at", "updated_at"]
    
      mock
        .expects("query")
        .once()
        .withArgs(query)
        .callsArgWith(
          2,
          null,
          expected,
          columns
        );
  
      try {
        expect(await articleRepository.getArticlesByAuthor(specification, email)).toBeDefined()
      } catch(err) {
        expect(err).toBeUndefined()
      }
    })
  
    it("should return an error if get articles by author", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null);
  
      try {
        expect(await articleRepository.getArticlesByAuthor(specification, email)).toBeUndefined()
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    })
  })

  describe("get an article", () => {
    let articleQuery = `
        SELECT
          slug,
          title,
          content,
          excerpt,
          BIN_TO_UUID(image_id) AS image_id,
          original_url,
          thumbnail_url,
          alt,
          height,
          width,
          first_name,
          last_name,
          email,
          tags,
          is_published,
          articles.created_at AS created_at,
          articles.updated_at AS updated_at
        FROM articles
        JOIN images ON images.id = articles.image_id
        JOIN users ON users.email = articles.author_email
        WHERE slug = ? LIMIT 1
      `
    let relatedArticlesQuery = `
        SELECT
          slug,
          title,
          excerpt,
          thumbnail_url,
          first_name,
          last_name,
          tags,
          articles.created_at AS created_at,
          articles.updated_at AS updated_at
        FROM articles
        JOIN images ON images.id = articles.image_id
        JOIN users ON users.email = articles.author_email
        WHERE slug != ? AND (tags LIKE ? OR tags LIKE ? OR tags LIKE ?)
        ORDER BY articles.updated_at DESC LIMIT ?
      `
    let expectedArticle = [
      {
        slug: 'this-is-title',
        title: 'This is title',
        content: '<p>This is content.</p>',
        excerpt: 'This is excerpt.',
        image_id: '660b8122-ac8f-11ed-8805-80e82cb6b6a3',
        original_url: 'http://example.com/original.jpg',
        thumbnail_url: 'http://example.com/thumbnail.jpg',
        alt: 'Example',
        height: 1920,
        width: 1080,
        first_name: 'John',
        last_name: 'Doe',
        tags: 'tag1,tag2,tag3',
        is_published: true,
        created_at: new Date().toString(),
        updated_at: new Date().toString()
      }
    ];
    let expectedArticleColumns = ["slug", "title", "content", "excerpt", "image_id", "original_url", "thumbnail_url", "alt", "height", "width", "first_name", "last_name", "email", "tags", "is_published", "created_at", "updated_at"]
    let expectedRelatedArticlesColumns = ["slug", "title", "excerpt", "thumbnail_url", "first_name", "last_name", "tags", "created_at", "updated_at"]

    it("should get an article", async () => {
      let expectedRelatedArticles = [
        {
          slug: 'this-is-title',
          title: 'This is title',
          excerpt: 'This is excerpt.',
          thumbnail_url: 'http://example.com/thumbnail.jpg',
          first_name: 'John',
          last_name: 'Doe',
          tags: 'tag1,tag2,tag3',
          created_at: new Date().toString(),
          updated_at: new Date().toString()
        }
      ];
    
      mock
        .expects("query")
        .once()
        .withArgs(articleQuery)
        .callsArgWith(
          2,
          null,
          expectedArticle,
          expectedArticleColumns
        );
      mock
        .expects("query")
        .once()
        .withArgs(relatedArticlesQuery)
        .callsArgWith(
          2,
          null,
          expectedRelatedArticles,
          expectedRelatedArticlesColumns
        );
  
      try {
        expect(await articleRepository.getArticle(slug)).toBeDefined()
      } catch(err) {
        expect(err).toBeUndefined()
      }
    })

    it("should return empty related articles if article has no tags", async () => {
      let expectedArticle = [
        {
          slug: 'this-is-title',
          title: 'This is title',
          content: '<p>This is content.</p>',
          excerpt: 'This is excerpt.',
          image_id: '660b8122-ac8f-11ed-8805-80e82cb6b6a3',
          original_url: 'http://example.com/original.jpg',
          thumbnail_url: 'http://example.com/thumbnail.jpg',
          alt: 'Example',
          height: 1920,
          width: 1080,
          first_name: 'John',
          last_name: 'Doe',
          tags: '',
          is_published: true,
          created_at: new Date().toString(),
          updated_at: new Date().toString()
        }
      ];

      mock
      .expects("query")
      .once()
      .withArgs(articleQuery)
      .callsArgWith(
        2,
        null,
        expectedArticle,
        expectedArticleColumns
      );

      try {
        expect(await articleRepository.getArticle(slug)).toBeDefined()
      } catch(err) {
        expect(err).toBeUndefined()
      }
    })

    it("should return an error if failed get an article", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null);
  
      try {
        expect(await articleRepository.getArticle(slug)).toBeUndefined()
      } catch(err) {
        expect(err).toBeInstanceOf(Error);
      }
    })

    it("should return an error if failed get related articles", async () => {
      mock
      .expects("query")
      .once()
      .withArgs(articleQuery)
      .callsArgWith(
        2,
        null,
        expectedArticle,
        expectedArticleColumns
      );
      mock.expects("query").once().callsArgWith(2, new Error(), null, null);

      try {
        expect(await articleRepository.getArticle(slug)).toBeUndefined()
      } catch(err) {
        expect(err).toBeInstanceOf(Error);
      }
    })
  })

  describe("save an article", () => {
    it("should save an article", () => {
      mock.expects("query").once().withArgs("INSERT INTO articles (slug, title, content, excerpt, image_id, author_email, tags) VALUES (?, ?, ?, ?, UUID_TO_BIN(?), ?, ?)");
  
      try {
        articleRepository.saveArticle(article)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    })

    it("should return an error if failed save an article", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null);

      try {
        await articleRepository.saveArticle(article)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })
  })

  describe("update an article", () => {
    it("should update an article", () => {
      mock.expects("query").once().withArgs("UPDATE articles SET title = ?, content = ?, excerpt = ?, image_id = UUID_TO_BIN(?), tags = ? WHERE slug = ? AND author_email = ?");
  
      try {
        articleRepository.updateArticle(article)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    })

    it("should return an error if failed update an article", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null);

      try {
        await articleRepository.updateArticle(article)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })
  })

  describe("delete an article", () => {
    it("should delete an article", () => {
      mock.expects("query").once().withArgs("DELETE FROM articles WHERE slug = ?");
  
      try {
        articleRepository.deleteArticle(slug)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    })

    it("should return an error if failed delete an article", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null);

      try {
        await articleRepository.deleteArticle(slug)
      } catch (err) {
        expect(err).toBeDefined()
      }
    })
  })
})