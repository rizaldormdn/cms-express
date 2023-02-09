import { Connection } from "mysql2";
import Article, { Articles } from "../../../domain/entity/Article";
import * as ArticleRepositoryInterface from "../../../domain/repository/ArticleRepository";
import Author from "../../../domain/aggregate/Author";

export class ArticleRepository implements ArticleRepositoryInterface.default {
	private _connection: Connection;

	constructor(connection: Connection) {
		this._connection = connection;
	}

	getArticle(slug: string): Promise<Article> {
		return new Promise<Article>((resolve, reject) => {});
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
