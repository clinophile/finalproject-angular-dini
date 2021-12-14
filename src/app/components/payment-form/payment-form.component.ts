import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/shared/payment.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  listOfPayment: Payment[] = [];

  currentPayment: Payment = {} as Payment;
  
  constructor(public service: PaymentService, private modalService: NgbModal, 
    private toastr: ToastrService, public router: Router) { 
      
  }
  
  
  getAllPayment(){
    this.service.getPayment().subscribe((dataSource: Payment[]) => {
      this.listOfPayment = dataSource
    });
  };

  form = {
    updateData: new FormGroup({
      paymentDetailId: new FormControl(),
      cardOwnerName: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required, Validators.maxLength(16)]),
      expirationDate: new FormControl('', [Validators.required]),
      securityCode: new FormControl('', [Validators.required,Validators.minLength(5)]),
    })
  }
  
  get cardOwnerName(){
    return (this.form.updateData.get('cardOwnerName'));
  }
  get cardNumber(){
    return (this.form.updateData.get('cardNumber'));
  }
  get expirationDate(){
    return (this.form.updateData.get('expirationDate'));
  }
  get securityCode(){
    return (this.form.updateData.get('securityCode'));
  }

  ngOnInit(): void {
    this.getAllPayment();

  }

  refreshList() {
    this.getAllPayment()
  }
 
  updatePayment(){
    this.service.updatePayment(this.form.updateData.value, this.currentPayment.paymentDetailId).subscribe((res) => {
      this.getAllPayment();
      this.toastr.info('Update Successfully', 'Manage Payment')
    }
    );
 }

  deletePayment(id: number){    
    this.service.deletePayment(id).subscribe((res) => {
       this.getAllPayment();
       this.toastr.warning('Delete Successfully', 'Manage Payment');
       this.router.navigate(['payment']);
       this.modalService.dismissAll();
    }
    );
  }


  open(content: any, payment: Payment) {
    this.modalService.open(content, { size: 'xl' });
    this.currentPayment = payment ;
    
    this.form.updateData.patchValue({
      paymentDetailId : this.currentPayment.paymentDetailId,
      cardOwnerName : this.currentPayment.cardOwnerName,
      cardNumber: this.currentPayment.cardNumber,
      expirationDate: this.currentPayment.expirationDate,
      securityCode : this.currentPayment.securityCode
     });
  }
}
