import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoEncontradoComponentComponent } from './no-encontrado-component.component';

describe('NoEncontradoComponentComponent', () => {
  let component: NoEncontradoComponentComponent;
  let fixture: ComponentFixture<NoEncontradoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoEncontradoComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoEncontradoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
