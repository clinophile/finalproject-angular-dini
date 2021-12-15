import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/shared/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() newTaskEvent =  new EventEmitter<boolean>();

  constructor(public service: PaymentService, public authService: AuthService, private modalService: NgbModal,
    private toastr: ToastrService, public router: Router) { }

  ngOnInit(): void {
  }

  form = {
    inputData: new FormGroup({
      cardOwnerName: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required, Validators.maxLength(16)]),
      expirationDate: new FormControl('', [Validators.required]),
      securityCode: new FormControl('', [Validators.required,Validators.minLength(5)]),
    })
  }

  addPayment(){
    this.service.addPayment(this.form.inputData.value).subscribe((res) => {
      this.form.inputData.reset();
      this.newTaskEvent.emit(true);
      this.toastr.success('Submited successfully', 'Payment Detail Register')
    },
    (err) => {
      alert('Something Went Wrong');
    });
  }

  get cardOwnerName(){
    return (this.form.inputData.get('cardOwnerName'));
  }
  get cardNumber(){
    return (this.form.inputData.get('cardNumber'));
  }
  get expirationDate(){
    return (this.form.inputData.get('expirationDate'));
  }
  get securityCode(){
    return (this.form.inputData.get('securityCode'));
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  logout() {
    this.authService.logOut() ;
    this.router.navigate(['login']);
  }

}
