import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UploadFormsComponent } from 'src/app/uploadAllFile/upload-forms/upload-forms.component';

@Component({
  selector: 'app-welfare',
  templateUrl: './welfare.component.html',
  styleUrls: ['./welfare.component.css']
})
export class WelfareComponent implements OnInit {

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

  openDialogFare(id){
    localStorage.setItem("menuID", id);
    this.dialog.open(UploadFormsComponent, {
    });
  }
}
