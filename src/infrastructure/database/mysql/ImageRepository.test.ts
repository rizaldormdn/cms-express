import mysql, { Connection } from "mysql2";
import sinon, { SinonMock } from "sinon";
import Image from "../../../domain/entity/Image";
import * as ImageRepositoryDomain from "../../../domain/repository/ImageRepository"
import Dimension from "../../../domain/valueobject/Dimension";
import ImageURL from "../../../domain/valueobject/ImageURL";
import ImageRepository from "./ImageRepository";


describe("Image Repository MySQL", () => {
    let connection: Connection = mysql.createConnection({ host: "localhost" });
    let mock: SinonMock = sinon.mock(connection);
    let repository: ImageRepositoryDomain.default = new ImageRepository(connection)
    let uuid = "asdasdas12396sdaflkhj"
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
    it("should return an error if failed",async () => {
        mock.expects("query").once().callsArgWith(2, new Error(),null,null)
        try {
            await repository.getImage(uuid)
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })
})

describe("Image Repository MySQL", () => {
    let connection: Connection = mysql.createConnection({ host: "localhost" });
    let mock: SinonMock = sinon.mock(connection);
    let repository: ImageRepositoryDomain.default = new ImageRepository(connection)
    let image:Image = new Image(new ImageURL("original-url","thumbnail-url"),"alternative",new Dimension(50,70))
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

    it("should return an error if failed",async () => {
        mock.expects("query").once().callsArgWith(2, new Error(),null,null)
        try {
            await repository.saveImage(image)
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })
})

describe("Image Repository MySQL", () => {
    let connection: Connection = mysql.createConnection({ host: "localhost" });
    let mock: SinonMock = sinon.mock(connection);
    let repository: ImageRepositoryDomain.default = new ImageRepository(connection)
    let image:Image = new Image(new ImageURL("original-url","thumbnail-url2"),"asdasd",new Dimension(50,70))
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

    it("should return an error if failed",async () => {
        mock.expects("query").once().callsArgWith(2, new Error(),null,null)
        try {
            await repository.updateImage(image)
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })
})

describe("Image Repository MySQL", () => {
    let connection: Connection = mysql.createConnection({ host: "localhost" });
    let mock: SinonMock = sinon.mock(connection);
    let repository: ImageRepositoryDomain.default = new ImageRepository(connection)
    let image:string = "aasdasdasd235425sdgsd"
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
        expect(await repository.deleteImage(image)).toBeDefined()
    })
    it("should return an error if failed",async () => {
        mock.expects("query").once().callsArgWith(2, new Error(),null,null)
        try {
            await repository.deleteImage(image)
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })
})