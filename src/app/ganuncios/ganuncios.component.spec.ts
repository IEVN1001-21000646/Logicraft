import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanunciosComponent } from './ganuncios.component';

describe('GanunciosComponent', () => {
  let component: GanunciosComponent;
  let fixture: ComponentFixture<GanunciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanunciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GanunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
