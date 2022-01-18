import { Injectable } from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import { Observable } from "rxjs";
import { Calendario } from "../modelos/calendario.model";
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  calendarioColeccion: AngularFirestoreCollection<Calendario>;
    calendarioDoc: AngularFirestoreDocument<Calendario>;
    calendarios: Observable<Calendario[]>;
    calendario: Observable<Calendario>;

    constructor(
        private db: AngularFirestore
    ){
        this.calendarioColeccion =db.collection('calendarios', ref => ref)
    }

    getCalendarios():Observable<Calendario[]>{
        this.calendarios = this.calendarioColeccion.snapshotChanges().pipe(
            map(cambios => {
                return cambios.map(accion=>{
                    const datos = accion.payload.doc.data() as Calendario;
                    datos.id = accion.payload.doc.id;
                    return datos;
                })
            })
        );
        return this.calendarios;
    }

    getCalendario(id: string):Observable<Calendario>{
        this.calendarioDoc = this.db.doc<Calendario>(`calendarios/${id}`);
        this.calendario = this.calendarioDoc.snapshotChanges().pipe(
            map( accion => {
                if(accion.payload.exists === false){
                    return null;
                }else{
                    const datos = accion.payload.data() as Calendario;                    
                    datos.id = accion.payload.id;
                    return datos as any;
                }
            })
       )
        return this.calendario;
    }

    async insertCalendario(calendario: Calendario){
        await this.calendarioColeccion.add(calendario).then(
            x => calendario.id =x.id
        )
        return calendario;
    }

    updateCalendario(calendario: Calendario):void{
        this.calendarioDoc = this.db.doc(`calendarios/${calendario.id}`);
        this.calendarioDoc.update(calendario);
    }

    deleteCalendario(calendario: Calendario):void{
        this.calendarioDoc = this.db.doc(`calendarios/${calendario.id}`);
        this.calendarioDoc.delete();
    }
}
