import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { MemberService } from "../../../generated/api";
import { HttpErrorResponse } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  imageFile: File | null = null;

  constructor(private fb: FormBuilder, private memberService: MemberService) {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      name: ['', Validators.required],  
      surname: ['', Validators.required],  
      city: ['', [Validators.required]], 
      phoneNumber: ['', Validators.required], 
      gender: ['Male', Validators.required],  
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

  public async onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const formData = new FormData();
    const { email, name, surname, city, phoneNumber, gender } = this.profileForm.value;

    formData.append('id', '1'); 
    formData.append('memberId', '1'); 
    formData.append('userId', '1b829f4e-42c5-4d77-b711-a4d8faae4460');
    formData.append('email', email);
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('city', city);
    formData.append('phoneNumber', phoneNumber);
    formData.append('gender', gender);

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    try {
      const response = await lastValueFrom(
          this.memberService.memberEditProfileIdPut(
              1, 1, '1b829f4e-42c5-4d77-b711-a4d8faae4460',
              email, name, surname, city, phoneNumber, gender,
              undefined, undefined, undefined, undefined,
              this.imageFile ?? undefined // ✅ Fix here
          )
      );


      console.log("Profile updated successfully", response);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.errorMessage = `Error: ${error.status} - ${error.message}`;
      } else {
        this.errorMessage = "An unknown error occurred.";
      }
      console.error("Profile update failed", error);
    } finally {
      this.isSubmitting = false;
    }
  }
}
