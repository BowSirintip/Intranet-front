import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UploadFormsComponent } from 'src/app/uploadAllFile/upload-forms/upload-forms.component';

@Component({
  selector: 'app-download-commu',
  templateUrl: './download-commu.component.html',
  styleUrls: ['./download-commu.component.css']
})
export class DownloadCommuComponent implements OnInit {

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

  openDialogDown(id) {
    localStorage.setItem("menuID", id);
    localStorage.setItem("hideItem",'1');
    this.dialog.open(UploadFormsComponent, {
    });
  }

}
