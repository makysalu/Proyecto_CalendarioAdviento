export interface Calendario{
    id?:string;
    background:number;
    plantilla:number;
    imagenes:Imagen[];
}

export interface Imagen{
    id: number;
    src:string;
    visto:boolean;
    mensaje: string;
}