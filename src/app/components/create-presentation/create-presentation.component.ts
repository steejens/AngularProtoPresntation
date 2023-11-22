import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PresentationService } from 'src/app/service/presentation.service';

@Component({
  selector: 'app-create-presentation',
  templateUrl: './create-presentation.component.html',
  styleUrls: ['./create-presentation.component.css']
})
export class CreatePresentationComponent implements OnInit {

  name: string = "";
  prId: string = "";
  constructor(private presentationService: PresentationService, private router: Router){}

  ngOnInit(): void {
  }

  create(){
    this.presentationService.createPresentation(this.name)
    .subscribe((res: any) => {
      this.prId = res.presentationId;
      this.router.navigate(['join/', this.prId]);
    })
  }
}
