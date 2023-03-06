import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, mergeMap, Observable, range} from "rxjs";
import {ApiNames} from "../models/ApiNames";

@Injectable({
  providedIn: 'root'
})

export class PersonInfoService {

  constructor(private httpClient: HttpClient) {}

  public getInfoByName(name: string): Observable<any[]>{
    return range(0, ApiNames.nationalize + 1)
      .pipe(
        mergeMap(i => this.httpClient.get<Object>(`https://api.${ApiNames[i]}.io/?name=${name}`)
                .pipe(
                  map(res => [res, i])
                ))
          );
  }
}
