import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GusuariosComponent } from './gusuarios.component';

describe('GusuariosComponent', () => {
  let component: GusuariosComponent;
  let fixture: ComponentFixture<GusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GusuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
