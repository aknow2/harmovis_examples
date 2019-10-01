import {isType} from 'typescript-fsa';
import { Action } from 'redux';
import * as actions from '../actions/actions';

export enum HeatmapType {
  Hexagon="Hexagon",
  Grid="Grdi",
}

export interface HeatmapState{
  selectedType: HeatmapType
  particleCount: number;
  gridSize: number;
  enabledHeatmap: boolean;
}

const initialState: HeatmapState  = {
  selectedType: HeatmapType.Hexagon,
  enabledHeatmap: true,
  gridSize: 400,
  particleCount: 3000,
};

export default (state = initialState, action: Action): HeatmapState => {
  if(isType(action, actions.setHeatmapRadius)) {
    return {
      ...state,
      gridSize: action.payload
    }
  }
  if (isType(action, actions.setHeatmapRadius)) {
    return {
      ...state,
      particleCount: action.payload
    };
  }
  if (isType(action, actions.toggleHeatmap)) {
    return {
      ...state,
      enabledHeatmap: action.payload,
    }
  }
  if (isType(action, actions.selectHeatmapType)) {
    return {
      ...state,
      selectedType: action.payload,
    }
  }
  return state;
};