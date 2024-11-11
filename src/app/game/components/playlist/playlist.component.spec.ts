import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistComponent } from './playlist.component';

describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
    component.playlist = {
      id: 'id',
      description: 'description',
      name: 'name',
      images: [
        {
          url: 'url',
          height: 900,
          width: 800
        }
      ]
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    document.body.removeChild(fixture.debugElement.nativeNode);
  });
});
