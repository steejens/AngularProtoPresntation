import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { SignalRService } from 'src/app/service/signalR.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationComponent implements OnChanges {
  @Input() inputPage: string = ""
  @Input() prId: string | any = ""
  @Input() options: { isJoined: boolean, isJoinedAsPresenter: boolean } | any;
  @Input('cursorObject') inputCursorObject : any;
  currentPage: number = Number(this.inputPage) || 1;

  cursorObject = { left: "1px", top: "1px" }
  constructor(private signalService: SignalRService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputPage'].currentValue != changes['inputPage'].previousValue) {
      this.currentPage = Number(this.inputPage);
    }
    if (changes['inputCursorObject'].currentValue != changes['inputCursorObject'].previousValue) {
      // console.log(this.inputCursorObject);
      
      this.cursorObject = this.inputCursorObject
    }
  }

  changePage(index: number) {
    const body = {
      state: index.toString(),
      id: this.prId,
      participantId: ""
    }
    this.signalService.changeState(body)
  }

  mouseTracking(event: Event | any) {
    if(this.options['isJoinedAsPresenter']){
      const body = {
        id: this.prId,
        mouseX: event.x,
        mouseY: event.y
      }
      console.log(event);
      
      this.cursorObject.left = `${event.x}px`;
      this.cursorObject.top = `${event.y}px`;
      this.signalService.changePointerCoordinates(body)
    }
  }
}
