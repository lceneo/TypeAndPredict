import {IGender} from "../models/IGender";
import {INationality} from "../models/INationality";

export class Person{
    constructor(public name: string, public age: number, public gender: IGender, public nationality: INationality[]) {}
}
