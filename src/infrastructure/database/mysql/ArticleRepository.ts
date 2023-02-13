import { Connection } from "mysql2";
import Article from "../../../domain/aggregate/Article";
import * as ArticleRepositoryInterface from "../../../domain/repository/ArticleRepository";
import Author from "../../../domain/entity/Author";
import { ArticleSnapshots } from "../../../domain/valueobject/ArticleSnapshot";
import Slug from "../../../domain/valueobject/Slug";

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
		return new Promise<Article>((resolve, reject) => {});
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
