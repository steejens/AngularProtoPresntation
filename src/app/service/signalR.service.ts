// signalr.service.ts
import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection | any;
  private messageSubject: Subject<any> = new Subject<any>();
  constructor() {
    // this.registerOnServerEvents()
  }

  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7084/presentationHub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err: any) => console.log('Error while starting connection: ' + err));
  }

  getConnectionId(): Observable<string> {
    return new Observable<string>((observer) => {
      if (this.hubConnection) {
        this.hubConnection.on('ReceiveConnectionId', (connectionId: any) => {
          observer.next(connectionId);
        });
      }
    });
  }
  join(prId: string, name: string) {
    return this.hubConnection?.invoke('Join', prId, name)
  }
  joinAsPresentator(prId: string, name: string) {
    return this.hubConnection.invoke('JoinAsPresenter', prId, name)
  }
  leave(prId: string): void {
    if (this.hubConnection) {
      this.hubConnection.invoke('Leave', prId)
        .then(() => console.log(`Leaved from Presentation: ${prId}`))
        .catch((err: any) => console.error(`Error joining presentation: ${prId}: ${err}`));
    }
  }

  addMessageListener() {
    if (this.hubConnection) {
      this.hubConnection.on('SendMessage', (message: string) => {
        this.messageSubject.next({ message });
      });
    }
  }
  changeState(body: any) {
    if (this.hubConnection) {
      this.hubConnection.invoke('ChangeState', body.state, body.participantId, body.id)
      .then(() => console.log(`Leaved from Presentation: ${body.id}`))
      .catch((err: any) => console.error(`Error joining presentation: ${body.id}: ${err}`));
    }
  }
  changePointerCoordinates(body: any) {
    if (this.hubConnection) {
      this.hubConnection.invoke('ChangePointerCoordinates', body.id, body.mouseX, body.mouseY)
      .then(() => console.log(`Changed pointer coordinates: ${body.id}`))
      .catch((err: any) => console.error(`Error Changed pointer coordinates: ${body.id}: ${err}`));
    }
  }
  getMessageListener() {
    return this.messageSubject.asObservable();
  }
}
