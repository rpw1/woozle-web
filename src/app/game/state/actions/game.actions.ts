import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Guess } from '../../models/guess';
import { GameState } from '../models/game-state.model';
import { SpotifyPlaylist } from '../../../shared/models/spotify-playlist';
import { Track } from '../models/track';
import { SpotifyDevice } from '../../../shared/models/spotify-device';

export const GameActions = createActionGroup({
  source: 'Game State',
  events: {
    addGuess: props<{ guess: Guess }>(),
    reset: emptyProps(),
    updateGameState: props<{ newGameState : GameState }>(),

    togglePlayerOn: emptyProps(),
    togglePlayerOnSuccess: emptyProps(),
    togglePlayerOff: emptyProps(),
    togglePlayerOffSuccess: emptyProps(),
    
    loadPlaylist: props<{ playlist: SpotifyPlaylist }>(),
    loadPlaylistSuccess: props<{ tracks: Track[] }>(),
    setGameSolution: emptyProps(),

    loadDevice: props<{ device: SpotifyDevice }>()
  }
})
