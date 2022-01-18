import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddImgComponent } from './modal-add-img.component';

describe('ModalAddImgComponent', () => {
  let component: ModalAddImgComponent;
  let fixture: ComponentFixture<ModalAddImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
