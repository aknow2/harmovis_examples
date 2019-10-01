import React from 'react';
import { HarmoVisLayers, Container, BasedProps, BasedState, connectToHarmowareVis, MovesLayer, MovesInput, DepotsInput, PlayButton, PauseButton, ForwardButton, ReverseButton, AddMinutesButton, ElapsedTimeRange, SpeedRange, DepotsLayer, Movesbase } from 'harmoware-vis';
import './App.scss';

const MAPBOX_TOKEN = "pk.eyJ1IjoidG1rbnltIiwiYSI6ImNrMDNuYTA3NTJ4YzUzbnV0ZGxycjRtMmgifQ.B6rGu500hfC4hbhLei9vMA"

const createMovesBase = (): Movesbase[] => {
  const departuretime = 1551575400;
  const arrivaltime = 1551578280;
  return [{
    departuretime,
    arrivaltime,
    operation: [
      
    ]
  }];
}


class App extends Container<BasedProps, BasedState> {

  componentDidMount() {
    const { actions } = this.props;
    if(actions) {
      actions.setMovesBase([{
        "departuretime":1551575400,"arrivaltime":1551578280,"operation":[
    {"position":[136.945255,35.190691,0],"elapsedtime":1551575400},
    {"position":[136.936864,35.191591,0],"elapsedtime":1551575460},
    {"position":[136.929784,35.195934,0],"elapsedtime":1551575520},
    {"position":[136.921210,35.196281,0],"elapsedtime":1551575580},
    {"position":[136.910178,35.197183,0],"elapsedtime":1551575700},
    {"position":[136.904748,35.190528,0],"elapsedtime":1551575820},
    {"position":[136.905379,35.181560,0],"elapsedtime":1551575940},
    {"position":[136.908156,35.173784,0],"elapsedtime":1551576060},
    {"position":[136.908031,35.169990,0],"elapsedtime":1551576120},
    {"position":[136.908898,35.163724,0],"elapsedtime":1551576240},
    {"position":[136.906907,35.157963,0],"elapsedtime":1551576300},
    {"position":[136.904771,35.150276,0],"elapsedtime":1551576420},
    {"position":[136.900947,35.143257,0],"elapsedtime":1551576540},
    {"position":[136.901769,35.134622,0],"elapsedtime":1551576660},
    {"position":[136.906622,35.127823,0],"elapsedtime":1551576780},
    {"position":[136.910380,35.120735,0],"elapsedtime":1551576840},
    {"position":[136.919835,35.120141,0],"elapsedtime":1551576960},
    {"position":[136.929545,35.117125,0],"elapsedtime":1551577080},
    {"position":[136.937741,35.117728,0],"elapsedtime":1551577140},
    {"position":[136.948824,35.123331,0],"elapsedtime":1551577260},
    {"position":[136.954523,35.130536,0],"elapsedtime":1551577380},
    {"position":[136.964036,35.136946,0],"elapsedtime":1551577500},
    {"position":[136.965008,35.144556,0],"elapsedtime":1551577620},
    {"position":[136.966754,35.154519,0],"elapsedtime":1551577740},
    {"position":[136.963441,35.163923,0],"elapsedtime":1551577800},
    {"position":[136.966701,35.175522,0],"elapsedtime":1551577920},
    {"position":[136.962254,35.184612,0],"elapsedtime":1551578040},
    {"position":[136.954268,35.188806,0],"elapsedtime":1551578160},
    {"position":[136.945255,35.190691,0],"elapsedtime":1551578280}]}]);
      actions.setViewport({
        ...this.props.viewport,
        width: window.screen.width,
        height: window.screen.height,
      })
    }
  }

  render() {
    const { settime, timeBegin, timeLength, actions, clickedObject, depotsData,
      secperhour, animatePause, animateReverse, viewport, routePaths,
      lightSettings, movesbase, movedData } = this.props;
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
            <li><MovesInput actions={actions} /></li>
            <li><DepotsInput actions={actions} /></li>
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
            <ElapsedTimeRange settime={settime} timeLength={timeLength}
                timeBegin={timeBegin} actions={actions} />
            </li>
            <li>
            <SpeedRange secperhour={secperhour} actions={actions} />
            </li>
          </ul>
        </div>
        <div className="harmovis_area">
          <HarmoVisLayers
            viewport={viewport} actions={actions}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            layers={[
              new MovesLayer({ routePaths, movesbase, movedData,
                       clickedObject, actions, lightSettings, optionVisible }),
              new DepotsLayer({ depotsData, lightSettings, optionVisible }),
            ]}
          />
        </div>
      </div>
    );
  }
}

export default connectToHarmowareVis(App);
