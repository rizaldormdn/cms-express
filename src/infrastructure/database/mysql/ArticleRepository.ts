import { Connection } from "mysql2";
import Article, { Articles } from "../../../domain/entity/Article";
import * as ArticleRepositoryInterface from "../../../domain/repository/ArticleRepository";
import Author from "../../../domain/aggregate/Author";
import Content from "../../../domain/valueobject/Content";
import Image from "../../../domain/entity/Image";
import Email from "../../../domain/valueobject/Email";
import Tag from "../../../domain/valueobject/Tag";

export class ArticleRepository implements ArticleRepositoryInterface.default {
	private _connection: Connection;

	constructor(connection: Connection) {
		this._connection = connection;
	}

	getArticle(slug: string): Promise<Article> {
		return new Promise<Article>((resolve, reject) => {
			this._connection.query(	"SELECT slug, content, image, author, tags, relatedArticles, date FROM article WHERE slug = ?",
			[slug],
			(err:any | null, result:any)=>{
				if(err) reject(err);
				if(result.length > 0){
					resolve(new Article(
						slug,
						new Content(result.title, result.content, result.excerpt),
						new Image(result.url, result.alt, result.dimension, result.thumbnails),
						new Author(result[0].email, result[0].name, result[0].password, result[0].article) as any, 
						result.tags,
						result.relatedArticles,
						result.date
					))
				}
			}
			)
		});
	}

	getArticles(author: Author): Promise<Articles> {
		return new Promise<Articles>((resolve, reject) => {});
	}

	saveArticle(article: Article): Promise<void> {
		return new Promise<void>((resolve, reject) => {});
	}

	updateArticle(article: Article): Promise<void> {
		return new Promise<void>((resolve, reject) => {});
	}

	deleteArticle(slug: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {});
	}
}
