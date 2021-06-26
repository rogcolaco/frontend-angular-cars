import { Component, OnInit } from '@angular/core';
import { Car } from '../Car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-card-car',
  templateUrl: './card-car.component.html',
  styleUrls: ['./card-car.component.less']
})
export class CardCarComponent implements OnInit {

  carList: Car[] = [];

  loadCars(): void {
    this.carService.getCars().subscribe( res => {
      this.carList = res;
    });
  }

  selectCar(car: Car): void{
    location.assign('/frontend-angular-cars/selected/' + car._id);
  }

  constructor(
    private carService: CarService) { }

  ngOnInit(): void {
    this.loadCars();
  }

}