import Article from "../../domain/aggregate/Article";
import { Tags } from "../../domain/valueobject/Tag";
import { ArticleSnapshots } from "../../domain/valueobject/ArticleSnapshot";

export type ArticleDateJSON = {
  created_at: Date;
  updated_at: Date;
}

export type ArticleSnapshotJSON = {
  slug: string;
  title: string;
  excerpt: string;
  image_thumbnail_url: string;
  author_name: string;
  tags: string[];
  date: ArticleDateJSON;
}

export type ArticleJSON = {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  image: {
    id: string;
    url: {
      original: string;
      thumbnail: string;
    }
    alt: string;
    dimension: {
      height: number;
      width: number;
    }
  }
  author: {
    name: string;
    email: string;
  }
  tags: string[];
  related_articles: ArticleSnapshotJSON[];
  is_published: boolean;
  date: ArticleDateJSON
}

export class TagMapper {
  public static toJSON(tags: Tags): string[] {
    let tagsJSON: string[] = []

    for (let tag of tags) {
      tagsJSON.push(tag.value)
    }
  
    return tagsJSON
  }
}

export class ArticleSnapshotMapper {
  public static toJSON(articleSnapshots: ArticleSnapshots): ArticleSnapshotJSON[] {
    let articleSnapshotsJSON: ArticleSnapshotJSON[] = []

    for (let articleSnapshot of articleSnapshots) {
      articleSnapshotsJSON.push({
        slug: articleSnapshot.slug.value,
        title: articleSnapshot.title,
        excerpt: articleSnapshot.excerpt,
        image_thumbnail_url: articleSnapshot.imageThumbnailURL,
        author_name: articleSnapshot.authorName,
        tags: TagMapper.toJSON(articleSnapshot.tags),
        date: {
          created_at: articleSnapshot.date.createdAt,
          updated_at: articleSnapshot.date.updatedAt
        }
      })
    }

    return articleSnapshotsJSON
  }
}

export default class ArticleMapper {
  public static toJSON(article: Article): ArticleJSON {
    return {
      slug: article.slug.value,
      title: article.content.title,
      content: article.content.content,
      excerpt: article.content.excerpt,
      image: {
        id: article.image.id,
        url: {
          original: article.image.url.original,
          thumbnail: article.image.url.thumbnail
        },
        alt: article.image.alt,
        dimension: {
          height: article.image.dimension.height,
          width: article.image.dimension.width
        }
      },
      author: {
        name: article.authorName,
        email: article.authorEmail
      },
      tags: TagMapper.toJSON(article.tags),
      related_articles: ArticleSnapshotMapper.toJSON(article.relatedArticles),
      is_published: Boolean(article.isPublished),
      date: {
        created_at: article.date.createdAt,
        updated_at: article.date.updatedAt
      }
    }
  }
}