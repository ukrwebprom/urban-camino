const tavria = {
  id: 'tavriav',
  name: 'Camino del Tavria V',
  distance: 0.34,
  geoJson: {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            30.72096651677873,
            46.486747224637725
          ],
          [
            30.72040026962145,
            46.48768371760258
          ],
          [
            30.719524629685537,
            46.48741442728607
          ],
          [
            30.719069296920196,
            46.48873273134882
          ]
        ],
        "type": "LineString"
      }
    }
  ]
  },
  checkPoints:[
{
      "type": "Feature",
      "properties": {"id": 1, "name": "Старт"},
      "geometry": {
        "coordinates": [
          30.71908431535789,
          46.48871052810796
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {"id": 2, "name": "Переулок"},
      "geometry": {
        "coordinates": [
          30.71953199302675,
          46.48741427896621
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {"id": 3, "name": "Наливайка"},
      "geometry": {
        "coordinates": [
          30.72041508322249,
          46.48766761998925
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {"id": 4, "name": "Финиш"},
      "geometry": {
        "coordinates": [
          30.720948614158402,
          46.48677669956655
        ],
        "type": "Point"
      }
    }
  ]

};

export default tavria;