import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Models/Client';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/Services/clients.service';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import Quagga from 'quagga'; // ES6

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.sass']
})
export class EditClientComponent implements OnInit {

  _scannerIsRunning;
  public client:Client;
  public categoryes:any;
  private categoryesSubscription: Subscription;
  public isUpdate:boolean;
  registerForm: FormGroup;
  submitted = false;
  heading;
  subheading = '';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
 

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private _location: Location,
    public _clientsService:ClientsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { 
    this.client = new Client();    
    this.categoryes = [];
    this._scannerIsRunning = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [this.route.snapshot.params.name, Validators.required],
      address: [this.route.snapshot.params.address],
      phone_number: [this.route.snapshot.params.phone_number],
      email: [this.route.snapshot.params.email],
      description: [this.route.snapshot.params.description],
      img: [this.route.snapshot.params.img],
    });

    if(this.route.snapshot.params.id == undefined){
      this.isUpdate = false;
      this.heading = "Nuevo Cliente";
    }
    else{
      this.isUpdate = true;
      this.heading ="Editar Cliente";
    }
  }

  
  ngOnDestroy() {
    
  }

  Cancelar(){
    this._location.back();
  }

  get f() { return this.registerForm.controls; }

  Guardar(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.client.id = this.route.snapshot.params.id;
    this.client.name = this.registerForm.controls.name.value;
    this.client.img = this.registerForm.controls.img.value;
    this.client.address = this.registerForm.controls.address.value;
    this.client.phone_number = this.registerForm.controls.phone_number.value;
    this.client.email = this.registerForm.controls.email.value;
    this.client.description = this.registerForm.controls.description.value;
   
    if(this.isUpdate){
      //Update
      console.log(this.client);
      this._clientsService.update(this.client).subscribe(
        response=>{
          console.log(response);

          this.toastr.success(this.client.name+' ha sido actualizado!','Cliente Actualizado', {
            timeOut: 5000,
          });

          this._location.back();
        }
      )
    }
    else{
      this._clientsService.add(this.client).subscribe(
        response=>{
          console.log(response);
          this.toastr.success(this.client.name+' ha sido creado!','Cliente Creado', {
            timeOut: 5000,
          });
          this._location.back();
        }
      )
     
    }
  }


  public iniciar(){
    if (this._scannerIsRunning) {
      Quagga.stop();
      this._scannerIsRunning = false;
    } else {
        this._scannerIsRunning = true;
        this.startScanner();
    }
  }
  public startScanner() {
      Quagga.init({
          inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: document.querySelector('#scanner-container'),
              constraints: {
                  width: 400,
                  height: 300,
                  facingMode: 'environment'
              },
          },
          decoder: {
              readers: [
                  'code_128_reader',
                  'ean_reader',
                  'ean_8_reader',
                  'code_39_reader',
                  'code_39_vin_reader',
                  'codabar_reader',
                  'upc_reader',
                  'upc_e_reader',
                  'i2of5_reader'
              ],
              debug: {
                  showCanvas: true,
                  showPatches: true,
                  showFoundPatches: true,
                  showSkeleton: true,
                  showLabels: true,
                  showPatchLabels: true,
                  showRemainingPatchLabels: true,
                  boxFromPatches: {
                      showTransformed: true,
                      showTransformedBox: true,
                      showBB: true
                  }
              }
          },

      }, function (err) {
          if (err) {
              console.log(err);
              return;
          }
          Quagga.start();
      });

      Quagga.onProcessed(function (result) {
          var drawingCtx = Quagga.canvas.ctx.overlay,
          drawingCanvas = Quagga.canvas.dom.overlay;

          if (result) {
              if (result.boxes) {
                  drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')));
                  result.boxes.filter(function (box) {
                      return box !== result.box;
                  }).forEach(function (box) {
                      Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'green', lineWidth: 2 });
                  });
              }

              if (result.box) {
                  Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 });
              }

              if (result.codeResult && result.codeResult.code) {
                  Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 10 });
              }
          }
      });

      Quagga.onDetected(function (result) {
          console.log(result);
      });
  }

}
