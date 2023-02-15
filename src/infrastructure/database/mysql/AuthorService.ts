import UserRepository from "./UserRepository";
import Author from "../../../domain/entity/Author";
import { ArticleRepository } from "./ArticleRepository";
import Name from "../../../domain/valueobject/Name";
import Password from "../../../domain/valueobject/Password";
import Article from "../../../domain/aggregate/Article";
import Slug from "../../../domain/valueobject/Slug";
import Content from "../../../domain/valueobject/Content";
import Image from "../../../domain/entity/Image";
import Tags from "../../../domain/valueobject/Tag";

export default class AuthorService {
  private _userRepository: UserRepository;
  private _articleRepository: ArticleRepository;

  constructor(
    userRepository: UserRepository,
    articleRepository: ArticleRepository
  ) {
    this._userRepository = userRepository;
    this._articleRepository = articleRepository;
  }

  public async changeName(author: Author, name: Name): Promise<void> {
    try {
      author.changeName(name);
      await this._userRepository.updateAuthor(author);
    } catch (error) {
      console.error(
        `Failed to change name for author with id ${author}: ${error}`
      );
      throw error;
    }
  }

  public async updatePassword(author: Author, password: Password) {
    try {
      author.updatePassword(password);
      await this._userRepository.updateAuthor(author);
    } catch (error) {
      console.error(
        `Failed to update password for author with id ${author}: ${error}`
      );
      throw error;
    }
  }

  
  public async addArticle(
    slug: Slug,
    content: Content,
    image: Image,
    tags: Tags[]
  ): Promise<Article> {
    try {
      const article = new Article(slug, content, image, tags, false);
      await this._articleRepository.saveArticle(article);
      return article;
    } catch (error) {
      console.error(`Failed to add article with slug ${slug}: ${error}`);
      throw error;
    }
  }

  public async updateArticle(
    slug: Slug,
    content: Content,
    image: Image,
    tags: Tags[]
  ): Promise<void> {
    try {
      const article = await this._articleRepository.getArticle(slug);
      article.updateContent(content);
      article.updateImage(image);
      article.updateTags(tags);
      await this._articleRepository.updateArticle(article);
    } catch (error) {
      console.error(`Failed to update article with slug ${slug}: ${error}`);
      throw error;
    }
  }

  public async publishArticle(slug: Slug): Promise<void> {
    try {
      const article = await this._articleRepository.getArticle(slug);
      article.publish();
      await this._articleRepository.updateArticle(article);
    } catch (error) {
      console.error(`Failed to publish article with slug ${slug}: ${error}`);
      throw error;
    }
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
