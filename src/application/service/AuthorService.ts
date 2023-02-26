import Author from "../../domain/entity/Author";
import ArticleRepository  from "../../infrastructure/database/mysql/ArticleRepository";
import Article from "../../domain/aggregate/Article";
import Slug from "../../domain/valueobject/Slug";
import Content from "../../domain/valueobject/Content";
import Image from "../../domain/entity/Image";
import { Tags } from "../../domain/valueobject/Tag";
import confirmationService from "./ConfirmationService";

export default class AuthorService {
  private _articleRepository: ArticleRepository;
  private _confirmationService: confirmationService;

  constructor(articleRepository: ArticleRepository, confirmationService: confirmationService) {
    this._articleRepository = articleRepository;
    this._confirmationService = confirmationService;
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

  public async updateArticle(article: Article): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        resolve(await this._articleRepository.updateArticle(article))
      } catch (err) {
        reject(err)
      }
    })
  }

  public async publishArticle(slug: Slug): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let article = await this._articleRepository.getArticle(slug);
  
        article.publish();

        resolve(await this._articleRepository.updateArticle(article));
      } catch (err) {
        reject(err);
      }
    })
  }

  public async unpublishArticle(slug: Slug): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let article = await this._articleRepository.getArticle(slug);
  
        article.unpublish();
  
        resolve(await this._articleRepository.updateArticle(article));
      } catch (err) {
        reject(err);
      }
    })
  }
}
