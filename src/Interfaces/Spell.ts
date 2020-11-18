export interface ISpell{
    Nombre: string,
    Nivel: number,
    Via: string,
    Accion: string,
    Efecto: string,
    Tipo: Array<string>,
    mantenimiento: string,
    Grado: Array<ISpellGrade>
}

export interface ISpellGrade{
    Name: string,
    Coste: number,
    IntR: number,
    Efecto: string,
    CosteMantenimiento: number
}