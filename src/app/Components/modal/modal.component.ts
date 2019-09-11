import { Component, OnInit ,Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {

  @Input() title = `Information`;

  constructor(
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
  }

}
