import Author from "../../../user/domain/entity/Author";
import ArticleRepository  from "../repository/ArticleRepository";
import Article from "../aggregate/Article";
import Slug from "../valueobject/Slug";
import Content from "../valueobject/Content";
import Image from "../../../image/domain/entity/Image";
import { Tags } from "../valueobject/Tag";
import User from "../../../user/domain/entity/User";

export default class ArticleService {
  private _articleRepository: ArticleRepository;

  constructor(articleRepository: ArticleRepository) {
    this._articleRepository = articleRepository;
  }

  public addArticle(author: Author, content: Content, image: Image, tags: Tags): Promise<Article> {
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

  public updateArticle(author: Author, slug: Slug, newContent: Content, newImage: Image, newTags: Tags): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let updatedArticle = author.updateArticle(slug, newContent, newImage, newTags)
  
        resolve(await this._articleRepository.updateArticle(updatedArticle))
      } catch (err) {
        reject(err)
      }
    })
  }

  public deleteArticle(user: User, slug: Slug): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        if (!user.isAdministrator) {
          resolve(await this._articleRepository.deleteArticleWithEmail(slug, user.email));
        } else {
          resolve(await this._articleRepository.deleteArticle(slug))
        }
      } catch (err) {
        reject(err);
      }
    })
  }
}
