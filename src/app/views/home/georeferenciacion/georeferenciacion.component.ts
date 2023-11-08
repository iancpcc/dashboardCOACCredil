import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-georeferenciacion',
  templateUrl: './georeferenciacion.component.html',
  styleUrls: ['./georeferenciacion.component.css']
})
export class GeoreferenciacionComponent implements OnInit {
  map!: mapboxgl.Map;


  ngOnInit(): void {
    mapboxgl.accessToken = environment.map_box_api;

  }



}
