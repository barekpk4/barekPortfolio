
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {

  contactFormDemo!: FormGroup;

  btnStatus = 'Send Message';
  isSending = false;

  compId = 35;

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.contactFormDemo = this._fb.group({
      id: [0],
      compId: [this.compId],

      yourName: [
        '',
        [Validators.required, Validators.minLength(2)]
      ],

      email: [
        '',
        [Validators.required, Validators.email]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^01[3-9]\d{8}$/)
        ]
      ],

      subject: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],

      message: [
        '',
        [Validators.required, Validators.minLength(10)]
      ]
    });
  }

  // Easy access to form controls
  get f() {
    return this.contactFormDemo.controls;
  }

  onSubmit(): void {

    if (this.isSending) {
      return;
    }

    if (this.contactFormDemo.invalid) {

      this.contactFormDemo.markAllAsTouched();

      this._toastr.warning(
        'Please correct the highlighted fields.',
        'Invalid Form'
      );

      return;
    }

    this.isSending = true;
    this.btnStatus = 'Sending...';

    const formData = this.contactFormDemo.getRawValue();

    // EmailJS template variable names must match
    // the variables configured in your EmailJS template.
    const templateParams = {
      yourName: formData.yourName,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    };

    emailjs.send(
      'service_8psxucb',
      'template_wcggvcq',
      templateParams,
      '7NcGpDKTOm1Z_-gU8'
    )
      .then((response) => {

        console.log('EmailJS response:', response.status);

        this._toastr.success(
          'Your message has been sent successfully!',
          'Success'
        );

        this.reset();

        // Smoothly move the page upward after successful submission
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }, 150);

      })
      .catch((error: unknown) => {

        console.error('EmailJS Error:', error);

        this._toastr.error(
          'Unable to send your message. Please try again.',
          'Sending Failed'
        );

      })
      .finally(() => {

        this.isSending = false;
        this.btnStatus = 'Send Message';

      });
  }

  reset(): void {

    this.contactFormDemo.reset({
      id: 0,
      compId: this.compId,
      yourName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    this.contactFormDemo.markAsPristine();
    this.contactFormDemo.markAsUntouched();

  }
}