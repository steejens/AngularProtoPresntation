import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../service/signalR.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-join-presentation',
  templateUrl: './join-presentation.component.html',
  styleUrls: ['./join-presentation.component.css']
})
export class JoinPresentationComponent implements OnInit {
  connectionId: string | undefined;
  messages: string[] = [];
  currentPage: string = ""
  options = {
    isJoinedAsPresenter: false,
    isJoined: false,
    top: "",
    left: ""
  }
  cursorObject = {}

  constructor(private signalRService: SignalRService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addMessageListener();
    this.route.params.subscribe(param => {
      this.connectionId = param['prId'];
    })
    this.signalRService.getMessageListener().subscribe((message) => {
      // console.log('Received message:', message);
      this.cursorObject = {
        top: `${message.message.MouseY}px`,
        left: `${message.message.MouseX}px`
      }
      this.currentPage = message.message;
      this.messages.push(message.message);
    });

    // Subscribe to the connection ID observable
    this.signalRService.getConnectionId().subscribe((connectionId) => {
      // console.log(connectionId)
      this.connectionId = connectionId;
    });
  }
  join(prId: string, name: string): void {
    this.signalRService.join(prId, name)
    .then(() => this.options.isJoined = true)
    .catch((err: any) => console.error(`Error joining presentation: ${prId}: ${err}`));
  }
  joinAsPresentator(prId: string, name: string){
    this.signalRService.joinAsPresentator(prId, name)
    .then(() => this.options.isJoined = true, this.options.isJoinedAsPresenter = true)
    .catch((err: any) => console.error(`Error joining presentation: ${prId}: ${err}`));
  }
  leave(prId: string): void {
    this.signalRService.leave(prId);
  }
}
