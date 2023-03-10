import Content from "../../../article/domain/valueobject/Content";
import Image from "../../../image/domain/entity/Image";
import Author from "../../../user/domain/entity/Author";
import Program from "../aggregate/Program";
import ProgramRepository from "../repository/ProgramRepository";

export default class ProgramService {
     private _programRepository: ProgramRepository

     constructor(programRepository: ProgramRepository) {
          this._programRepository = programRepository
     }
     public addProgram(author: Author, content: Content, image: Image): Promise<Program> {
          return new Promise<Program>(async (resolve, reject) => {
               try {
                    let program = author.addProgram(content, image)
                    await this._programRepository.saveProgram(program)
                    resolve(program)
               } catch (error) {
                    reject(error)
               }
          })
     }
}