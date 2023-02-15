import mysql, { Connection } from "mysql2";
import sinon, { SinonMock } from "sinon";
import Author from "../../../domain/entity/Author";
import Image from "../../../domain/entity/Image";
import * as ImageRepositoryDomain from "../../../domain/repository/ImageRepository"
import Dimension from "../../../domain/valueobject/Dimension";
import Email from "../../../domain/valueobject/Email";
import ImageURL from "../../../domain/valueobject/ImageURL";
import Name from "../../../domain/valueobject/Name";
import Password from "../../../domain/valueobject/Password";
import ImageRepository from "./ImageRepository";

describe("Image Repository MySQL", () => {
    let connection: Connection = mysql.createConnection({ host: "localhost" });
    let mock: SinonMock = sinon.mock(connection);
    let repository: ImageRepositoryDomain.default = new ImageRepository(connection)
    
    let uuid = "asdasdas12396sdaflkhj"
    let author: Author = new Author(
        new Email("email@mail.com"),
        new Name("admin", "kece"),
        new Password("asdasd1324123", "asdffg123u49afasdqewt")
    )
    let image: Image = new Image(
        new ImageURL("original-url", "thumbnail-url"),
        "alternative",
        new Dimension(50, 70))
    let imagez: string = "aasdasdasd235425sdgsd"

    it("should return an images", async () => {
        mock
            .expects("query")
            .once()
            .withArgs("SELECT id, original_url, thumbnail_url, alt, height, width FROM images WHERE author = ?")
            .callsArgWith(
                2,
                null,
                [
                    {
                        id: "asdasdas12396sdaflkhj",
                        original_url: "original-url",
                        thumbnail_url: "thumbnail-url",
                        alt: "alternative",
                        height: 50,
                        width: 70,
                    },
                    {
                        id: "asdasdas1239adfsasdaflkhj",
                        original_url: "original-url2",
                        thumbnail_url: "thumbnail-url2",
                        alt: "alternative2",
                        height: 50,
                        width: 70,
                    }
                ],
                ["id", " original_url", "thumbnail_url", "alt", "height", "width"]
            )
        expect(await repository.getImages(author)).toBeDefined()
    })
    it("should return an error if failed", async () => {
        mock.expects("query").once().callsArgWith(2, new Error(), null, null)
        try {
            await repository.getImages(author)
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })
    it("should return an image uuid", async () => {
        mock
            .expects("query")
            .once()
            .withArgs("SELECT original_url, thumbnail_url, alt, height, width FROM images WHERE id = ? LIMIT 1")
            .callsArgWith(
                2,
                null,
                [
                    {
                        id: "asdasdas12396sdaflkhj",
                        original_url: "original-url",
                        thumbnail_url: "thumbnail-url",
                        alt: "alternative",
                        height: 50,
                        width: 70,
                    }
                ],
                ["id", " original_url", "thumbnail_url", "alt", "height", "width"]
            )
        expect(await repository.getImage(uuid)).toBeDefined()
    })
    it("should return an error if failed", async () => {
        mock.expects("query").once().callsArgWith(2, new Error(), null, null)
        try {
            await repository.getImage(uuid)
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })

    it("should save image", async () => {
        mock
            .expects("query")
            .once()
            .withArgs("INSERT INTO images (id, original_url, thumbnail_url, alt, height, width) VALUES (?, ?, ?, ?, ?, ?)")
            .callsArgWith(
                2,
                null,
                [
                    {
                        id: "asdasdas12396sdaflkhj",
                        original_url: "original-url",
                        thumbnail_url: "thumbnail-url",
                        alt: "alternative",
                        height: 50,
                        width: 70,
                    }
                ],
                ["id", "original_url", "thumbnail_url", "alt", "height", "width"]
            )
        expect(await repository.saveImage(image)).toBeDefined()
    })

    it("should return an error if failed", async () => {
        mock.expects("query").once().callsArgWith(2, new Error(), null, null)
        try {
            await repository.saveImage(image)
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })

    it("should update image", async () => {
        mock
            .expects("query")
            .once()
            .withArgs("UPDATE images SET original_url = ?, thumbnail_url = ?, alt = ?, height = ?, width = ?")
            .callsArgWith(
                2,
                null,
                [
                    {
                        id: "aasdasdasd235425sdgsd",
                        original_url: "original-url2",
                        thumbnail_url: "thumbnail-url2",
                        alt: "alternative2",
                        height: 53,
                        width: 73,
                    }
                ],
                ["id", "original_url", "thumbnail_url", "alt", "height", "width"]
            )
        expect(await repository.updateImage(image)).toBeDefined()
    })

    it("should return an error if failed", async () => {
        mock.expects("query").once().callsArgWith(2, new Error(), null, null)
        try {
            await repository.updateImage(image)
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })

    it("should delete image", async () => {
        mock
            .expects("query")
            .once()
            .withArgs("DELETE FROM images WHERE id = ?")
            .callsArgWith(
                2,
                null,
                [
                    {
                        id: "aasdasdasd235425sdgsd",
                    }
                ],
                ["id"]
            )
        expect(await repository.deleteImage(imagez)).toBeDefined()
    })
    it("should return an error if failed", async () => {
        mock.expects("query").once().callsArgWith(2, new Error(), null, null)
        try {
            await repository.deleteImage(imagez)
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })




})


