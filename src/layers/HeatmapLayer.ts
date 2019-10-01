import { LayerProps, CompositeLayer, HexagonLayer, GridLayer } from 'deck.gl';
import { MovedData } from 'harmoware-vis';
import { HeatmapType } from '../reducer/heatmapSettings';


interface HeatmapLayerProps extends LayerProps {
  type:HeatmapType 
  movedData: MovedData[];
  size: number;
}

export default class PolygonIconLayer extends CompositeLayer<HeatmapLayerProps> {

  static layerName = 'HeatmapLayer';

  renderLayers() {
    const {movedData, type, size, visible} = this.props
    if (type === HeatmapType.Hexagon) {
      return [
          new HexagonLayer({
            visible, 
            opacity: 0.1,
            extruded: true,
            elevationScale: 10,
            data: movedData,
            radius: size,
            getPosition: (d: MovedData) => [d.longitude as number, d.latitude as number],
          })
        ];
    } else {
      return [
          new GridLayer({
            visible,
            opacity: 0.1,
            elevationScale: 10,
            extruded: true,
            cellSize: size,
            data: movedData,
            getPosition: (d: MovedData) => [d.longitude as number, d.latitude as number],
          })
        ];
    }
  }
}
