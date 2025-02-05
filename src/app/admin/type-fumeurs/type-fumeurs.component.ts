import { Component, OnInit } from '@angular/core';
import { FumeurTypeService } from '../../../core/services/fumeur-type.service';
import { FumeurTypeEntity } from '../../../core/entity/fumeur-type.entity';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-type-fumeurs',
  imports: [NgFor],
  templateUrl: './type-fumeurs.component.html',
  styleUrl: './type-fumeurs.component.scss'
})
export class TypeFumeursComponent implements OnInit{
  types: FumeurTypeEntity[]= []

  constructor(private fumeurTypeService: FumeurTypeService){}

  ngOnInit(): void {
    this.fumeurTypeService.getType().subscribe(res => {this.types = res})  
  }

}
