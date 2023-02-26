import Author from "../entity/Author";
import ArticleRepository  from "../../domain/repository/ArticleRepository";
import Article from "../aggregate/Article";
import Slug from "../valueobject/Slug";
import Content from "../valueobject/Content";
import Image from "../entity/Image";
import { Tags } from "../valueobject/Tag";

export default class ArticleService {
  private _articleRepository: ArticleRepository;

  constructor(articleRepository: ArticleRepository) {
    this._articleRepository = articleRepository;
  }

  public async addArticle(author: Author, content: Content, image: Image, tags: Tags): Promise<Article> {
    return new Promise<Article>((async (resolve, reject) => {
      try {
        let article = author.addArticle(content, image, tags)
  
        await this._articleRepository.saveArticle(article)

        resolve(article)
      } catch (err) {
        reject(err)
      }
    }))
  }

  public async updateArticle(author: Author, slug: Slug, newContent: Content, newImage: Image, newTags: Tags): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let article = await this._articleRepository.getArticle(slug)
        let updatedArticle = author.updateArticle(article, newContent, newImage, newTags)
  
        resolve(await this._articleRepository.updateArticle(updatedArticle))
      } catch (err) {
        reject(err)
      }
    })
  }

  public async publishArticle(author: Author, slug: Slug): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let article = await this._articleRepository.getArticle(slug);

        author.publishArticle(article)

        resolve(await this._articleRepository.updateArticle(article));
      } catch (err) {
        reject(err);
      }
    })
  }

  public async unpublishArticle(author: Author, slug: Slug): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let article = await this._articleRepository.getArticle(slug);
  
        author.unpublishArticle(article)
  
        resolve(await this._articleRepository.updateArticle(article));
      } catch (err) {
        reject(err);
      }
    })
  }

  public async deleteArticle(author: Author, slug: Slug): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        resolve(await this._articleRepository.deleteArticle(slug, author.email));
      } catch (err) {
        reject(err);
      }
    })
  }
}
