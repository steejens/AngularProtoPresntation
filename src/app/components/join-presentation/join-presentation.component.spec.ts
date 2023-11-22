import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinPresentationComponent } from './join-presentation.component';

describe('JoinPresentationComponent', () => {
  let component: JoinPresentationComponent;
  let fixture: ComponentFixture<JoinPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinPresentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
