import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellFilterFormComponent } from './spell-filter-form.component';

describe('SpellFilterFormComponent', () => {
  let component: SpellFilterFormComponent;
  let fixture: ComponentFixture<SpellFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpellFilterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
