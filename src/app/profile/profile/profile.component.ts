import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { ProfileService } from '../../profile/profile.service';
import { Profile } from '../../profile/profile';

import { MasksConstants } from '../../constants/masks-constants';
import { PatternsConstants } from '../../constants/patterns-constants';

import { ChangePassDialogComponent } from '../change-pass-dialog/change-pass-dialog.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'clever-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public phoneMask:     (string | RegExp)[] = MasksConstants.PHONE;
  public phonePattern:  RegExp = PatternsConstants.PHONE;
  public matcher:       MyErrorStateMatcher;

  public profileForm:           FormGroup;
  public firstNameFormControl:  FormControl;
  public lastNameFormControl:   FormControl;
  public emailFormControl:      FormControl;
  public phoneFormControl:      FormControl;

  constructor(
    private _router:          Router,
    private _profileService:  ProfileService,
    private _title:           Title,
    public dialog:            MatDialog,
    public snackBar:          MatSnackBar
  ) {
    this._title.setTitle('Profile');
    this.matcher = new MyErrorStateMatcher();
  }

  private _createFormControls(): void {

    const profile: Profile = this._profileService.getProfile();

    this.firstNameFormControl = new FormControl(profile ? profile.firstName : '', [
      Validators.maxLength(255)
    ]);
    this.lastNameFormControl = new FormControl(profile ? profile.lastName : '', [
      Validators.maxLength(255)
    ]);
    this.emailFormControl = new FormControl(profile ? profile.email : '', [
      Validators.required,
      Validators.email,
    ]);
    this.phoneFormControl = new FormControl(profile ? profile.phoneNumber : '', [
      Validators.pattern(this.phonePattern)
    ]);
  }

  private _createForm(): void {
    this.profileForm = new FormGroup({
      firstName:    this.firstNameFormControl,
      lastName:     this.lastNameFormControl,
      email:        this.emailFormControl,
      phoneNumber:  this.phoneFormControl,
    });
  }

  public ngOnInit() {
    this._createFormControls();
    this._createForm();
  }

  public changePassword() {
    const dialogRef = this.dialog.open(ChangePassDialogComponent, {
      width:  '550px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public create(event: Event): void {
    if (this.profileForm.valid) {
      this._profileService.setProfile(this.profileForm.value);
      this.snackBar.open('Profile updated.', `Done!`, { duration: 5000 });
    } else {
      this.emailFormControl.markAsTouched();
    }
  }

}
