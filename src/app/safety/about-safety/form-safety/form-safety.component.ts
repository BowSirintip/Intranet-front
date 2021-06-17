import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UploadFormsComponent } from 'src/app/uploadAllFile/upload-forms/upload-forms.component';

@Component({
  selector: 'app-form-safety',
  templateUrl: './form-safety.component.html',
  styleUrls: ['./form-safety.component.css']
})
export class FormSafetyComponent implements OnInit {

  constructor(private http: HttpClient, public dialog: MatDialog, private route: ActivatedRoute) { }

  id;
  data;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })

    this.http.post<any>('/api/UploadFile/GetFileMenu', { id: this.id }).subscribe(result => {
      this.data = result;
    })
  }

  openDialogFormSafe(id) {
    localStorage.setItem("menuID", id);
    localStorage.setItem("hideItem",'1');
    this.dialog.open(UploadFormsComponent, {
    });
  }


}
