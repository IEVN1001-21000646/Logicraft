import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpagosComponent } from './gpagos.component';

describe('GpagosComponent', () => {
  let component: GpagosComponent;
  let fixture: ComponentFixture<GpagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GpagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
