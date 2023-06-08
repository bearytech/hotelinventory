import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookingForm !: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }


  constructor(private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomId');
    console.log(roomId);

    this.bookingForm = this.fb.group({
      // roomId: [''],//new FormControl('')
      roomId: new FormControl({ value: roomId, disabled: true }, { validators: [Validators.required] }),
      guestEmail: [
        '',
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.email]
        }
      ],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: ['', { updateOn: 'blur' }],
      guestName: ['', [Validators.required, Validators.minLength(5), CustomValidator.validateName, CustomValidator.validateSpechialChar('*')]],
      address: this.fb.group({
        addressLine1: ['', [Validators.required]],
        addressLine2: [''],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([this.addGuestControl()]),
      tnc: new FormControl(false, { validators: [Validators.requiredTrue] })
    },
      {
        updateOn: 'blur',
        validators: [CustomValidator.validateDate.bind(CustomValidator)]
      }
    )
    this.getBookingData();
    // this.bookingForm.valueChanges.subscribe((data) => {
    //   console.log(data);
    // })
    // this.bookingForm.valueChanges.pipe(
    //   mergeMap((data) => this.bookingService.bookRoom(data))
    // ).subscribe((data) => console.log(data));
    // this.bookingForm.valueChanges.pipe(
    //   switchMap((data) => this.bookingService.bookRoom(data))
    // ).subscribe((data) => console.log(data));
    this.bookingForm.valueChanges.pipe(
      exhaustMap((data) => this.bookingService.bookRoom(data))
    ).subscribe((data) => console.log(data));
  }

  addBooking() {
    // console.log(this.bookingForm.value);
    console.log(this.bookingForm.getRawValue());
    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false
    })
  }

  addGuest() {
    this.guests.push(this.addGuestControl())
  }

  addGuestControl() {
    return this.fb.group({ guestName: ['', [Validators.required]], age: new FormControl('') })
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletedPassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }

  removeGuest(i: number) {
    this.guests.removeAt(i);
  }

  getBookingData() {
    this.bookingForm.patchValue({
      // roomId: '2',
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('02-06-2023'),

      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false
    })
  }
}


