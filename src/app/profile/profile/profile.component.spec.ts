import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Title } from '@angular/platform-browser';
import { MasksConstants } from '../../constants/masks-constants';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TextMaskModule } from 'angular2-text-mask';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ProfileService } from '../../profile/profile.service';

import { ProfileComponent } from './profile.component';
import { ChangePassDialogComponent } from '../change-pass-dialog/change-pass-dialog.component';

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TextMaskModule,
                FormsModule,
                ReactiveFormsModule,
                MatInputModule,
                MatFormFieldModule,
                MatSnackBarModule,
                SharedModule.forRoot(),
                MatDialogModule,
                BrowserAnimationsModule,
                RouterTestingModule.withRoutes([])
            ],
            declarations: [
                ProfileComponent,
                ChangePassDialogComponent
            ],
            providers: [
                ProfileService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        router = TestBed.get(Router);
        fixture.detectChanges();
        router.initialNavigation();
    });


    function updateForm(value) {
        component.profileForm.controls.firstName.setValue(value.firstName);
        component.profileForm.controls.lastName.setValue(value.lastName);
        component.profileForm.controls.email.setValue(value.email);
        component.profileForm.controls.phoneNumber.setValue(value.phoneNumber);
    }

    const validData = {
        firstName: 'qwerty',
        lastName: 'qwerty',
        email: 'qwerty@qwerty.com',
        phoneNumber: '+38 (012) 345-6789'
    };

    const invalidData = {
        firstName: 'qwerty',
        lastName: 'qwerty',
        email: 'qwerty',
        phoneNumber: ''
    };

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('page title should be Profile', () => {
        const _title = TestBed.get(Title);
        expect(_title.getTitle()).toBe('Profile');
    });

    it('should have profileForm', () => {
        const profileForm = component.profileForm;
        expect(profileForm).toBeDefined();
    });

    it('should have phoneMask', () => {
        expect(MasksConstants.PHONE).toBeDefined();
    });

    it('should be define create method', () => {
        expect(component.create).toBeDefined();
    });

    it('should be define changePassword method', () => {
        expect(component.changePassword).toBeDefined();
    });

    it('form value should update from form changes', fakeAsync(() => {
        updateForm(validData);
        expect(component.profileForm.value).toEqual(validData);
    }));

    it('isValid should be true when form is valid', fakeAsync(() => {
        spyOn(component.snackBar, 'open');
        updateForm(validData);
        expect(component.profileForm.valid).toBeTruthy();
    }));

    it('isValid should be false when form is invalid', fakeAsync(() => {
        spyOn(component.snackBar, 'open');
        updateForm(invalidData);
        expect(component.profileForm.valid).toBeFalsy();
        const event = new Event('event');
        component.create(event);
        expect(component.snackBar.open).not.toHaveBeenCalled();
    }));
});
