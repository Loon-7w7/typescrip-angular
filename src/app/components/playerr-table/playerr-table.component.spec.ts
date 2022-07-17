import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerrTableComponent } from './playerr-table.component';

describe('PlayerrTableComponent', () => {
  let component: PlayerrTableComponent;
  let fixture: ComponentFixture<PlayerrTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerrTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerrTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
