import { Connection } from "mysql2";
import Article from "../../../domain/aggregate/Article";
import * as ArticleRepositoryInterface from "../../../domain/repository/ArticleRepository";
import Author from "../../../domain/entity/Author";
import { ArticleSnapshots } from "../../../domain/valueobject/ArticleSnapshot";
import Slug from "../../../domain/valueobject/Slug";
import Content from "../../../domain/valueobject/Content";
import Image from "../../../domain/entity/Image";

export class ArticleRepository implements ArticleRepositoryInterface.default {
	private _connection: Connection;

	constructor(connection: Connection) {
		this._connection = connection;
	}

	getFeaturedArticles(): Promise<ArticleSnapshots> {
		return new Promise<ArticleSnapshots>((resolve, reject) => {});
	}

	getArticles(author: Author): Promise<ArticleSnapshots> {
		return new Promise<ArticleSnapshots>((resolve, reject) => {});
	}

	getArticle(slug: Slug): Promise<Article> {
		return new Promise<Article>((resolve, reject) => {
			this._connection.query(
				"SELECT slug, content, image, author, tags, relatedArticles, date FROM article WHERE slug = ?",
				[slug.value],
				(err: any | null, result: any) => {
					if (err) reject(err);
					if (result.length > 0) {
						resolve(new Article(
							slug,
							new Content(result.title, result.content, result.excerpt),
							new Image(result.url, result.alt, result.dimension),
							new Author(result[0].email, result[0].name, result[0].password) as any, 
							result.tags,
							result.relatedArticles,
							result.date
						))
					}
				}
			)
		});
	}

	saveArticle(article: Article): Promise<void> {
		return new Promise<void>((resolve, reject) => {});
	}

	updateArticle(article: Article): Promise<void> {
		return new Promise<void>((resolve, reject) => {});
	}

	deleteArticle(slug: Slug): Promise<void> {
		return new Promise<void>((resolve, reject) => {});
	}
}
