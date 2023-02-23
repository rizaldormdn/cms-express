import UserRepository from "../../infrastructure/database/mysql/UserRepository";
import Author from "../../domain/entity/Author";
import ArticleRepository  from "../../infrastructure/database/mysql/ArticleRepository";
import Name from "../../domain/valueobject/Name";
import Password from "../../domain/valueobject/Password";
import Article from "../../domain/aggregate/Article";
import Slug from "../../domain/valueobject/Slug";
import Content from "../../domain/valueobject/Content";
import Image from "../../domain/entity/Image";
import { Tags } from "../../domain/valueobject/Tag";
import confirmationService from "./ConfirmationService";


export default class AuthorService {
  private _userRepository: UserRepository;
  private _articleRepository: ArticleRepository;
  private _confirmationService: confirmationService;

  constructor(articleRepository: ArticleRepository, userRepository: UserRepository, confirmationService: confirmationService) {
    this._articleRepository = articleRepository;
    this._userRepository = userRepository;
    this._confirmationService = confirmationService;
  }

  public changeName(author: Author, name: Name): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      author.changeName(name)
    
      try {
        resolve(await this._userRepository.updateUser(author))
      } catch (err) {
        reject(err)
      }
    })
  }

  public updatePassword(author: Author, password: Password): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      author.updatePassword(password)

      try {
        resolve(await this._userRepository.updateUser(author))
      } catch (err) {
        reject(err)
      }
    })
  }


public async addArticle( author: Author, content: Content, image: Image, tags: Tags): Promise<Article> {
    return new Promise<Article>((async (resolve, reject) => {
      let article =  author.addArticle(content, image, tags)

      try {
        await this._confirmationService.sendConfirmation(author)
        await this._articleRepository.saveArticle(article)

        resolve(article)
      } catch (err) {
        reject(err)
      }
    }))
  }

public async updateArticle(article: Article): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        let slug = await this._articleRepository.updateArticle(article) 
      try {
        resolve(slug)
      } catch (err) {
        reject(err)
      }
    })
  }

  public async publishArticle(slug: Slug): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
    try {
      const article = await this._articleRepository.getArticle(slug);
      article.publish();
      await this._articleRepository.updateArticle(article);
    } catch (error) {
      console.error(`Failed to publish article with slug ${slug}: ${error}`);
      throw error;
    }
  })
}

  public async unpublishArticle(slug: Slug): Promise<void> {
    try {
      const article = await this._articleRepository.getArticle(slug);
      article.unpublish();
      await this._articleRepository.updateArticle(article);
    } catch (error) {
      console.error(`Failed to unpublish article with slug ${slug}: ${error}`);
      throw error;
    }
  }
}
