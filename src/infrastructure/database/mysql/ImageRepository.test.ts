import mysql, { Connection } from "mysql2";
import sinon, { SinonMock } from "sinon";
import * as ImageRepositoryDomain from "../../../domain/repository/ImageRepository"
import ImageRepository from "./ImageRepository";
import { image, author } from "../../../testdata";

describe("ImageRepository", () => {
  let connection: Connection = mysql.createConnection({ host: "localhost" });
  let mock: SinonMock = sinon.mock(connection);
  let imageRepository: ImageRepositoryDomain.default = new ImageRepository(connection)

  describe("get images by author", () => {
    it("should return images by author", async () => {
      mock
        .expects("query")
        .once()
        .withArgs("SELECT BIN_TO_UUID(id), original_url, thumbnail_url, alt, height, width FROM images WHERE author_email = ? LIMIT ?")
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
              width: image.dimension.width
            }
          ],
          ["id", "original_url", "thumbnail_url", "alt", "height", "width"]
        )

      try {
        expect(await imageRepository.getImages(author)).toBeDefined();
      } catch(err) {
        expect(err).toBeUndefined()
      }
    })

    it("should return an error if failed", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null)
  
      try {
        await imageRepository.getImages(author)
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

  describe("update image", () => {
    it("should update an image", () => {
      mock.expects("query").once().withArgs("UPDATE images SET original_url = ?, thumbnail_url = ?, alt = ?, height = ?, width = ? WHERE BIN_TO_UUID(id) = ?");
  
      try {
        imageRepository.updateImage(image)
      } catch (err) {
        expect(err).toBeUndefined()
      }
    });

    it("should return an error if failed update an image", async () => {
      mock.expects("query").once().callsArgWith(2, new Error(), null, null)
  
      try {
        await imageRepository.updateImage(image)
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