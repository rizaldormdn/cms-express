import Slug from "../../../article/domain/valueobject/Slug";
import Specification from "../../../Specification";
import Program from "../aggregate/Program";
import { ProgramSnapshots } from "../valueobject/ProgramSnapshot";

export default interface ProgramRepository {
     getFeaturedProgram(): Promise<ProgramSnapshots>
     saveProgram(program: Program): Promise<void>
     getPrograms(specification: Specification): Promise<ProgramSnapshots>
     getProgram(slug: Slug): Promise<Program>
     countProgram(specification: Specification): Promise<number>
}