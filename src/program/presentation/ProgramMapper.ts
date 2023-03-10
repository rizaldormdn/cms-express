import { Tags } from "../../article/domain/valueobject/Tag";
import Program from "../domain/aggregate/Program";
import { ProgramSnapshots } from "../domain/valueobject/ProgramSnapshot";

export type ProgramDateJSON = {
     created_at: Date;
     updated_at: Date;
}

export type ProgramSnapshotJSON = {
     slug: string;
     title: string;
     excerpt: string;
     image_thumbnail_url: string;
     author_name: string;
     date: ProgramDateJSON;
}

export type ProgramJSON = {
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
     is_published: boolean;
     date: ProgramDateJSON;
}
export class ProgramSnapshotMapper {
     public static toJSON(programSnapshots: ProgramSnapshots): ProgramSnapshotJSON[] {
          let programSnapshotsJSON: ProgramSnapshotJSON[] = []

          for (let programSnapshot of programSnapshots) {
               programSnapshotsJSON.push({
                    slug: programSnapshot.slug.value,
                    title: programSnapshot.title,
                    excerpt: programSnapshot.excerpt,
                    image_thumbnail_url: programSnapshot.imageThumbnailURL,
                    author_name: programSnapshot.authorName,
                    date: {
                         created_at: programSnapshot.date.createdAt,
                         updated_at: programSnapshot.date.updatedAt
                    }
               })
          }
          return programSnapshotsJSON
     }
}

export default class ProgramMapper {
     public static toJSON(program: Program): ProgramJSON {
          return {
               slug: program.slug.value,
               title: program.content.title,
               content: program.content.content,
               excerpt: program.content.excerpt,
               image: {
                    id: program.image.id,
                    url: {
                         original: program.image.url.original,
                         thumbnail: program.image.url.thumbnail
                    },
                    alt: program.image.alt,
                    dimension: {
                         height: program.image.dimension.height,
                         width: program.image.dimension.width
                    }
               },
               author: {
                    name: program.authorName,
                    email: program.authorEmail
               },
               is_published: Boolean(program.isPublished),
               date: {
                    created_at: program.date.createdAt,
                    updated_at: program.date.updatedAt
               }

          }
     }
}