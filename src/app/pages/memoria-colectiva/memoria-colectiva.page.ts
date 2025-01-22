import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-memoria-colectiva',
  templateUrl: './memoria-colectiva.page.html',
  styleUrls: ['./memoria-colectiva.page.scss'],
standalone: false,
})
export class MemoriaColectivaPage implements OnInit {

  constructor(private utilitiesService:UtilitiesService) { }

  public memorias_colectivas
  ngOnInit() {
    this.memorias_colectivas = this.utilitiesService.memorias;
  }


  public lessThan(num1:number, num: number){
    return num1 <= num
  }

}
