import { Injectable } from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import { Observable } from "rxjs";
import { Calendario, Imagen } from '../modelos/calendario.model';
import {map, finalize} from 'rxjs/operators'
import { AngularFireStorage } from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  calendarioColeccion: AngularFirestoreCollection<Calendario>;
    calendarioDoc: AngularFirestoreDocument<Calendario>;
    calendarios: Observable<Calendario[]>;
    calendario: Observable<Calendario>;

    constructor(
        private db: AngularFirestore,
        private storage: AngularFireStorage
    ){
        this.calendarioColeccion =db.collection('calendarios', ref => ref)
    }

    async insertFichero(file: File){
        var urlFichero = "";
        const id = Math.random().toString(36).substring(2);
        const filePath = `/profile_${id}`;
        const ref = this.storage.ref(filePath);
        return this.storage.upload(filePath, file).then(
            x => x.ref.getDownloadURL()
        )
    }

    /*async insertMultiplesFicheros(files: File[]){
        var imagenes:Imagen[] = [];

        for(let file of files) { 
            await this.insertFichero(file).then(
                x => imagenes.push({src: x, visto: false, mensaje:''})
            )
        }
        return imagenes;
    }*/
}
