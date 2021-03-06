import { CarService } from './../car.service';
import { Component, OnInit } from '@angular/core';
import { Car } from '../Car';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})

export class FormComponent implements OnInit {

  carForm : FormGroup;

  selectedId: string;

  selectedCarById: Car;

  constructor(private carService: CarService, public router: Router) { }

  newCar(): void{
    if (this.checkForm()){
      this.carService.addCar(this.carForm.value).subscribe( res => {
        res.ok ? alert ('Veículo Cadastrado com Sucesso.') : alert ('Falha ao Acessar Banco de Dados.');
        location.assign('/frontend-angular-cars/');
      });
    }
  }

  updateCar(): void{
    if (this.checkForm()){
      this.carService.update(this.carForm.value, this.selectedCarById._id).subscribe( res => {
        res.ok ? alert ('Registro Alterado com Sucesso') : alert('Falha ao Alterar Registro');
        location.assign('/frontend-angular-cars/');
      });
    }
  }

  deleteCar(): void{
    this.carService.delete(this.selectedCarById._id).subscribe( res => {
      res.ok ? alert('Registro Deletado com Sucesso') : alert('Falha ao Apagar Registro');
      location.assign('/frontend-angular-cars/');
    });
  }

  getId(): void {
    this.selectedId = (this.router.url.split('/')[2]);
    this.carService.getCar(this.selectedId).subscribe((car: Car) => {
      this.selectedCarById = car;
      this.carForm.setValue ({
        model: this.selectedCarById.model,
        color: this.selectedCarById.color,
        plate: this.selectedCarById.plate,
        km: this.selectedCarById.km,
      });
    });
  }

  initForm(): void{
    this.carForm = new FormGroup ({
      model: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-zÀ-ü0-9]+')]),
      color: new FormControl (null, [Validators.required, Validators.pattern('[A-Za-zÀ-ü]+')]),
      plate: new FormControl (null, [Validators.required, Validators.pattern('[A-Z]{3}[0-9][0-9A-Z][0-9]{2}')]),
      km: new FormControl(0, [Validators.min(0), Validators.pattern('[0-9]+')]),
    });
  }

  checkForm(): boolean{
    let erros = [];
    if (this.carForm.valid){
      return true;
    } else {
      /* if(this.carForm.errors === null ){
        alert('Preencha todos os campos dos fomulário');
      } 
      console.log(this.carForm.errors); */
      alert('Precha o formulário com valores válidos');
      return false;
    }
  }

  onSubmit(): void{
    console.log(this.carForm.value);
  }

  ngOnInit(): void {
    this.initForm();
    if (this.router.url !== '/frontend-angular-cars/cadastro'){
      this.getId();
    }
  }
}
