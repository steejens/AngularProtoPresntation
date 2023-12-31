
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PresentationService {
    constructor(private http: HttpClient) { }

    createPresentation(name: string) {
        return this.http.post(environment.apiUrl + 'presentation/create', {presentationName: name});
    }
}
