import mysql, { Connection } from "mysql2";
import sinon, { SinonMock } from "sinon";
import * as ImageRepositoryDomain from "../../../domain/repository/ImageRepository"
import ImageRepository from "./ImageRepository";
import { image, specification, email } from "../../../../testdata";

describe("ImageRepository", () => {
  let connection: Connection = mysql.createConnection({ host: "localhost" });
  let mock: SinonMock = sinon.mock(connection);
  let imageRepository: ImageRepositoryDomain.default = new ImageRepository(connection)

  describe("get images", () => {
    it("should return images", async () => {
      let query = `
        SELECT
          BIN_TO_UUID(id) AS id,
          original_url,
          thumbnail_url,
          alt,
          height,
          width,
          author_email
        FROM images
        WHERE alt LIKE ?
        ORDER BY images.updated_at DESC
        LIMIT ?, ?
      `

      mock
        .expects("query")
        .once()
        .withArgs(query)
        .callsArgWith(
          2,
          null,
          [
            {
              id: image.id,
              original_url: image.url.original,
              thumbnail_url: image.url.thumbnail,
              alt: image.alt,
              height: image.dimension.height,
              width: image.dimension.width,
              author_email: image.authorEmail
            }
          ],
          ["id", "original_url", "thumbnail_url", "alt", "height", "width", "author_email"]
        )

      try {
        expect(await imageRepository.getImages(specification)).toBeDefined();
      } catch(err) {
        expect(err).toBeUndefined()
      }
    })

    it("should return an error if failed", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null)
  
      try {
        await imageRepository.getImages(specification)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })

  describe("get image", () => {
    it("should return an image", async () => {
      mock
        .expects("query")
        .once()
        .withArgs("SELECT original_url, thumbnail_url, alt, height, width, author_email FROM images WHERE BIN_TO_UUID(id) = ? LIMIT 1")
        .callsArgWith(
          2,
          null,
          [
            {
              original_url: image.url.original,
              thumbnail_url: image.url.thumbnail,
              alt: image.alt,
              height: image.dimension.height,
              width: image.dimension.width
            }
          ],
          ["original_url", "thumbnail_url", "alt", "height", "width"]
        )

      try {
        expect(await imageRepository.getImage(image.id)).toBeDefined();
      } catch(err) {
        expect(err).toBeUndefined()
      }
    })

    it("should return an error if failed get an image", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null)
  
      try {
        await imageRepository.getImage(image.id)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })

  describe("save image", () => {
    it("should save an image", () => {
      mock.expects("query").once().withArgs("INSERT INTO images (id, original_url, thumbnail_url, alt, height, width, author_email) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)");
  
      try {
        imageRepository.saveImage(image)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    });

    it("should return an error if failed save an image", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null)
  
      try {
        await imageRepository.saveImage(image)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })

  describe("update image alt", () => {
    it("should update an image alt", () => {
      mock.expects("query").once().withArgs("UPDATE images SET alt = ? WHERE BIN_TO_UUID(id) = ? AND author_email = ?");
  
      try {
        imageRepository.updateImageAlt(image.alt, image.id, email)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    });

    it("should return an error if failed update an image alt", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null)
  
      try {
        await imageRepository.updateImageAlt(image.alt, image.id, email)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })

  describe("delete image", () => {
    it("should delete an image", () => {
      mock.expects("query").once().withArgs("DELETE FROM images WHERE BIN_TO_UUID(id) = ?");
  
      try {
        imageRepository.deleteImage(image.id)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    });

    it("should return an error if failed delete an image", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null)
  
      try {
        await imageRepository.deleteImage(image.id)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })
})