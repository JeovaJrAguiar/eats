import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SighinComponent } from './sighin.component';

describe('SighinComponent', () => {
  let component: SighinComponent;
  let fixture: ComponentFixture<SighinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SighinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SighinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
