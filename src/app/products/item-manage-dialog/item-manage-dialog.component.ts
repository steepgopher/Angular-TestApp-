import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';

import { Product } from '../product';
import { PatternsConstants } from '../../constants/patterns-constants';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'clever-item-manage-dialog',
  templateUrl: './item-manage-dialog.component.html',
  styleUrls: ['./item-manage-dialog.component.css']
})
export class ItemManageDialogComponent implements OnInit {

  public itemForm:          FormGroup;
  public nameFormControl:   FormControl;
  public priceFormControl:  FormControl;
  public descFormControl:   FormControl;
  public matcher:           MyErrorStateMatcher;
  public currencyPattern:   RegExp = PatternsConstants.CURRENCY;

  constructor(
    public dialogRef:   MatDialogRef<ItemManageDialogComponent>,
    public snackBar:    MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.matcher = new MyErrorStateMatcher();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private _createFormControls(): void {
    this.nameFormControl = new FormControl(this.data ? this.data.name : '', [
      Validators.maxLength(255),
      Validators.required
    ]);
    this.priceFormControl = new FormControl(this.data ? this.data.price : '', [
      Validators.required,
      Validators.pattern(this.currencyPattern)
    ]);
    this.descFormControl = new FormControl(this.data ? this.data.desc : '', [
      Validators.required,
      Validators.maxLength(1000)
    ]);
  }

  private _createForm(): void {
    this.itemForm = new FormGroup({
      price:  this.priceFormControl,
      name:   this.nameFormControl,
      desc:   this.descFormControl
    });
  }

  public ngOnInit() {
    this._createFormControls();
    this._createForm();
  }

  public apply(event: Event): void {
    if (this.itemForm.valid) {
      if (this.data) {
        this.itemForm.value._id     = this.data._id;
        this.itemForm.value.date    = this.data.date;
        this.itemForm.value.number  = this.data.number;
        this.snackBar.open('Product updated.', `Done!`, { duration: 5000 });
        this.dialogRef.close(this.itemForm.value);
      } else {
        const product = new Product(this.itemForm.value);
        this.snackBar.open('Product created.', `Done!`, { duration: 5000 });
        this.dialogRef.close(product);
      }
    } else {
      this.nameFormControl.markAsTouched();
      this.priceFormControl.markAsTouched();
      this.descFormControl.markAsTouched();
    }
  }

}
