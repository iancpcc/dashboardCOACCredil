import { AppStateEntity, DataState } from 'src/data/entities/app-state.entity';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, catchError, map, of, startWith, take, tap } from 'rxjs';
import mapboxgl, { GeoJSONSource } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

import { AgenciasService } from 'src/app/services/agencias.service';
import { AlertService } from 'src/app/utils/alert.service';
import { CuotasVencidas } from 'src/app/interfaces/IReportes/cuotas-vencidas.interface';
import { HelpersService } from 'src/app/utils/helpers.service';
import { IAgencia } from 'src/app/interfaces/agencia.interface';
import { IFeature } from 'src/app/interfaces/geojson.interface';
import { IUsuarioAgencia } from 'src/app/interfaces/usuario-agencia.interface';
import { ReportService } from 'src/app/services/report.service';
import { ResponseEntity } from 'src/data/entities/response.entity';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-georeferenciacion',
  templateUrl: './georeferenciacion.component.html',
  styleUrls: ['./georeferenciacion.component.css'],
})
export class GeoreferenciacionComponent implements OnInit, OnDestroy {
  map!: mapboxgl.Map;
  readonly DataState = DataState;

  paramsToAPI: {
    fechaCorte: string;
    asesorId: string | null;
    agenciasId: string | null;
  } = {
    fechaCorte: this.utils.obtenerFechaActual(),
    asesorId: null,
    agenciasId: null, // Inicialmente cargo todas las agencias
  };
  reportState$: AppStateEntity<CuotasVencidas[]> = {};
  usuarios$!: Observable<ResponseEntity<IUsuarioAgencia[]>>;
  agencias$!: Observable<AppStateEntity<IAgencia[]>>;
  suscripcion!:Subscription
  estadoReporte:DataState = DataState.LOADED
  features!: IFeature[]

  isFirstCallAjax: boolean = true; //Para que no afecte al iniciar el Datatable en el ngOnInit, hasta encontrar una forma de incializar el Datatable fuera del ngOnInit
  constructor(
    private utils: HelpersService,
    private agenciaService: AgenciasService,
    private reportSrv: ReportService,
    private alertSrv: AlertService
  ) {}

  ngOnInit(): void {
    this.inicializarMapa();
    this.agencias$ = this.obtenerAgencias$();
    this.obtenerCuotasVencidas();
    // this.renderMapa()
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
   }

  inicializarMapa() {
    mapboxgl.accessToken = environment.map_box_api;
    this.map = new mapboxgl.Map({
      container: 'map',
      // style: 'mapbox://styles/mapbox/streets-v12',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-78.6628187, -1.2571433],
      zoom: 7, // starting zoom
    });
    this.map.on('style.load', () => {
      this.map.setFog({}); // Set the default atmosphere style
    });
    this.map.on('load', () => {
      this.map.addSource('earthquakes', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        // data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
        // data: this.coordenadasGeoJson
        data: {
          type: 'FeatureCollection',
          features: this.features,
        },
          cluster: true,
  clusterMaxZoom: 14, // Max zoom to cluster points on
  clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

      this.map.addLayer({
        id: 'earthquakes-layer',
        type: 'circle',
        source: 'earthquakes',
        paint: {
          'circle-radius': 4,
          'circle-stroke-width': 2,
          'circle-color': 'red',
          'circle-stroke-color': 'white',
        },
      });

    this.map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'earthquakes',
      filter: ['has', 'point_count'],
      paint: {
      // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750
      'circle-color': [
      'step',
      ['get', 'point_count'],
      '#e77f67',//Rojo Bajo
      10,
      '#cf6a87',
      75,
      '#c44569'
      ],
      'circle-radius': [
      'step',
      ['get', 'point_count'],
      20,
      100,
      30,
      750,
      40
      ]
      }
      });

      this.map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'earthquakes',
      filter: ['has', 'point_count'],
      layout: {
      'text-field': ['get', 'point_count_abbreviated'],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
      }
      ,paint:{
        "text-color": "#ffffff"
      }
      });

      this.map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'earthquakes',
      filter: ['!', ['has', 'point_count']],
      paint: {
      'circle-color': '#e66767',
      'circle-radius': 4,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#fff',

      }
      });
    });

  }

  obtenerAgencias$(): Observable<AppStateEntity<IAgencia[]>> {
    return this.agenciaService.getAgenciesByUserLogged$().pipe(
      map((response) => {
        if (response.data && response.data.length > 1) {
          let consolidado = response.data.map((ag) => ag.id);
          this.paramsToAPI.agenciasId = consolidado.toString()

          response.data.push({
            nombre: 'TODOS',
            id: consolidado.toString(),
          });
        }
        // this.listadoAgencias = response.data!;
        return { state: DataState.LOADED, data: response.data };
      }),
      startWith({ state: DataState.LOADING }),
      catchError((error) => {
        //
        return of({ state: DataState.ERROR, error });
      })
    );
  }

  cambiaEntreOficinas(event: any) {
    this.paramsToAPI.agenciasId = event.target.value;
    this.paramsToAPI.asesorId = null;
  }

  obtenerCuotasVencidas(): void {

    this.suscripcion = this.reportSrv
      .getCuotasVencidas$({ ...this.paramsToAPI })
      .pipe(
        map((response) => {
          const dataSinCoordenadasVacias = response.data?.filter(
            (item) => item.longitud?.length! > 0 && item.latitud?.length! > 0
          );
          return { state: DataState.LOADED, data: dataSinCoordenadasVacias };
        }),
        startWith({ state: DataState.LOADING, data: null }),
        catchError((error) => {
          this.alertSrv.showAlertError(error.message);
          return of({ state: DataState.ERROR, error, data: null });
        })
      )
      .subscribe((val) => {
        this.estadoReporte = val.state
        if (val.data) {
          this.convertirCoordenadasAGeoJson(val.data);
          this.renderMapa();

          //Renderizo el mapa para que cargen las ubicaciones dinamicamente
        }
      });


  }

  async onSubmit() {
    this.obtenerCuotasVencidas();
  }

  renderMapa(){
    (this.map.getSource('earthquakes') as GeoJSONSource).setData({
      type: 'FeatureCollection',
      features: this.features,
    });

  }


  convertirCoordenadasAGeoJson(data: CuotasVencidas[]) {
    this.features = [];
    data.map((item: CuotasVencidas) => {
      this.features.push({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [+item.longitud!, +item.latitud!],
        },
      });
    });

  }
}
