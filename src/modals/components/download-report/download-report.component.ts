import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {getFormattedDate} from "../../../app/helpers/date.helper";

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.scss']
})
export class DownloadReportComponent implements OnInit {

  dateForm: FormGroup;

  get dateFormData() {
    return {
      start_date: getFormattedDate(this.dateForm.controls['startDate'].value),
      end_date: getFormattedDate(this.dateForm.controls['endDate'].value),
    }
  }

  constructor(
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.dateForm = this.fb.group({
      startDate: new FormControl(new Date(''), [Validators.required]),
      endDate: new FormControl(new Date(), [Validators.required]),
    })
  }

}
