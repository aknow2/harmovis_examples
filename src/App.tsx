import React from 'react';
import { FpsDisplay,HarmoVisLayers, Container, BasedProps, BasedState, connectToHarmowareVis, MovesLayer, PlayButton, PauseButton, ForwardButton, ReverseButton, AddMinutesButton, ElapsedTimeRange, SpeedRange, Movesbase, MovesbaseOperation } from 'harmoware-vis';
import HeatmapRaidusRange from './components/HeatmapRaidusRange';
import HeatmapLayer from './layers/HeatmapLayer';
import { HeatmapState } from './reducer/heatmapSettings';
import './App.scss';
import ToggleHeatMap from './components/ToggleHeatMap';
import HeatmapTypeSelection from './components/HeatmapSelection';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const createMovesBase = (): Movesbase => {
  const interval = 1000;
  const repeat = 20;
  const departuretime = 1551575400;
  const arrivaltime = departuretime + interval * repeat;

  const operation = Array.from({length: repeat}, (_, i): MovesbaseOperation => {
    const lon = 136.7 + (Math.floor(Math.random() * 299999) /1000000);
    const lat = 35.1 + (Math.floor(Math.random() * 199999) / 1000000);
    return {
      position: [lon, lat, 0],
      elapsedtime: departuretime + (i*interval)
    } as MovesbaseOperation;
  });
  return {
    departuretime,
    arrivaltime,
    operation
  };
}

const createMovesBaseList = (count: number): Movesbase[] => {
  return Array.from({length: count}, (): Movesbase => createMovesBase())
}


class App extends Container<BasedProps & HeatmapState, BasedState> {

  componentDidMount() {
    console.log(process.env);
    const { actions, particleCount } = this.props;
    if(actions) {
      actions.setMovesBase(createMovesBaseList(particleCount));
      actions.setViewport({
        ...this.props.viewport,
        width: window.screen.width,
        height: window.screen.height,
      })
      actions.setSecPerHour(100);
    }
  }

  render() {
    const { settime, timeBegin, timeLength, actions, clickedObject, depotsData,
      secperhour, animatePause, animateReverse, viewport, routePaths,
      lightSettings, movesbase, movedData, gridSize, enabledHeatmap, selectedType } = this.props;
    const optionVisible = false;
    if (actions === undefined
      || settime === undefined || lightSettings === undefined
      || timeLength === undefined || timeBegin === undefined
      || secperhour === undefined || !viewport
      || !routePaths || !movesbase
      || !movedData || clickedObject === undefined
      || !depotsData) {
      return <div/>
    }
    return (
      <div>
        <div className="harmovis_controller">
          <ul >
            <li>{animatePause ?
                <PlayButton actions={actions} /> :
                <PauseButton actions={actions} />}
                {animateReverse ?
                <ForwardButton actions={actions} /> :
                <ReverseButton actions={actions} />}
            </li>
            <li>
            <AddMinutesButton addMinutes={-5} actions={actions} />
            <AddMinutesButton addMinutes={5} actions={actions} />
            </li>
              <li>
                elapsed time: 
              <ElapsedTimeRange settime={settime} timeLength={timeLength}
                  timeBegin={timeBegin} actions={actions} />
              </li>
              <li>
                speed: 
              <SpeedRange secperhour={secperhour} actions={actions} />
              </li>
              </ul>
            <figure>
              <figcaption>Heatmap settings</figcaption>
              <ol>
              <li>
                enable heatmap: <ToggleHeatMap />
              </li>
              <li>
                grid size(m): <HeatmapRaidusRange />
              </li>
              <li>
                type: <HeatmapTypeSelection />
              </li>
              </ol>
            </figure>

        </div>
        <div className="harmovis_area">
          <HarmoVisLayers
            viewport={viewport} actions={actions}
            mapboxApiAccessToken={MAPBOX_TOKEN ? MAPBOX_TOKEN : ''}
            layers={[
              new MovesLayer({ routePaths, movesbase, movedData,
                       clickedObject, actions, lightSettings, optionVisible }),
              new HeatmapLayer({
                visible: enabledHeatmap,
                type: selectedType,
                movedData,
                size: gridSize
              }),
            ]}
          />
        </div>
        <FpsDisplay />
      </div>
    );
  }
}

export default connectToHarmowareVis(App, undefined);
