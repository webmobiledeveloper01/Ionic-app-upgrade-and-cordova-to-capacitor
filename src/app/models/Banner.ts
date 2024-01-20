/* Datos del objeto Notification*/

export interface Banner{
    id: number,
    banner_publication_id?: number,
    banner_type_id: number,
    banner_url?: string,
    descripcion?:string,
    fecha_duracion?:string,    
    imagen: string;
    lat?:string,
    lng?:string,
    section_id?: number,
    user_id:number,
    zona_geografica?:string;
}