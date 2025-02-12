import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiosqueComponent } from './quiosque.component';

describe('QuiosqueComponent', () => {
  let component: QuiosqueComponent;
  let fixture: ComponentFixture<QuiosqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuiosqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuiosqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
