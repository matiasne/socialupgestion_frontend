import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.sass']
})
export class ImageSelectComponent implements OnInit {

  @ViewChild('content') content: any;
  
  imageChangedEvent: any = '';
  croppedImage: any = '';
  closeResult: string;
  @Input() aspectRatio_Y = '';
  @Input() aspectRatio_X = '';
  @Input() resizeToWidth = '350';

  @Input() titulo:any='';
  @Output() public imagenBase64 = new EventEmitter<string>();

  public paso1 = true;
  public paso2 = false;
  public paso3 = false;


  constructor(
      
    private modalService: NgbModal, 
  ) { }

  ngOnInit() {
  }

 
  openModal(content){
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){     
        this.imagenBase64.emit(this.croppedImage);
        this.paso1 = true;
        this.paso2 = false;
        this.paso3 = false;
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

    
  fileChangeEvent(event: any): void {
      console.log(event);
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  public files: NgxFileDropEntry[] = [];
 
 
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

  public dropped(event: any) {
    this.nextStep();
   
    event[0].fileEntry.file(
        (ev) => {
            this.imageChangedEvent = {target: {files: [ev]}}
        },
        () => console.log('Failed to load image')
    );
  }

  

  public nextStep(){
    console.log("next")
    if(this.paso1){
        console.log("paso2")
        this.paso1 = false;
        this.paso2 = true;
        this.paso3 = false;
    }
    else if(this.paso2){
        console.log("paso3")
        this.paso1 = false;
        this.paso2 = false;
        this.paso3 = true;
    }
      
  }

  public backStep(){
    
    if(this.paso2){
        this.paso1 = true;
        this.paso2 = false;
        this.paso3 = false;
    }
    else if(this.paso3){
        this.paso1 = false;
        this.paso2 = true;
        this.paso3 = false;
    }        
    
  }

}
