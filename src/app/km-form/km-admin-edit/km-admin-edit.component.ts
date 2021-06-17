import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-km-admin-edit',
  templateUrl: './km-admin-edit.component.html',
  styleUrls: ['./km-admin-edit.component.css']
})
export class KmAdminEditComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  
  @Output() public onUploadFinished = new EventEmitter();

  public progress: number;
  public message: string;

  myFiles: string[] = [];
  imgPath;
  imgPath2;
  filename;
  filename2;
  userID;
  value;
  idKM;

  show = false;
  showPdf = false;
  checkPdf = false;
  checkVideo = false;
  urls = [];
  kmSubject;
  kmdetail;
  kmFaction;
  kmpdf;
  kmvideo;

  ngOnInit(): void {
    this.userID = localStorage.getItem("idemy");
    this.idKM = localStorage.getItem("idItemKM");

    this.http.post<any>('/api/Questions/GetDepartment', {})
      .subscribe(result => {
        this.value = result;
      })

    this.http.post<any>('/api/UploadFile/GetDataKM', { id: this.idKM }).subscribe(data => {
      this.kmSubject = data[0].subject_km;
      this.kmdetail = data[0].detail_km;
      this.kmFaction = data[0].depID;

      if(data[0].pdfPath != null){
      var res = data[0].pdfPath;
      this.kmpdf = res.substring(16);
      }

      if(data[0].videoPath != null){
        var video =  data[0].videoPath;
        this.kmvideo = video.substring(16);
      }

    })
  }

 

  reloadCurrentPage() {
    window.location.reload();
  }


  public uploadFile = (files) => {
    this.showPdf = true;
    if (files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post<any>('/api/UploadFile', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          if (event.body.errorMessage != null) {
            this.showPdf = false;
            Swal.fire({
              icon: 'error',
              text: 'Only Upload PDF File!'
            })
          } else {
            this.showPdf = false;
            this.imgPath = event.body.dbPath;
            this.message = '200';
            this.onUploadFinished.emit(event.body);
            this.filename = event.body.fileName;
          }
        }
      });
  }

  public uploadFileVideo = (files) => {
    this.show = true;
    this.checkVideo = true;

    if (files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const frmData = new FormData();
    frmData.append('file', fileToUpload, fileToUpload.name);

    this.http.post<any>('/api/UploadFile/UploadVideo', frmData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          if (event.body.errorMessage == "500") {
            this.show = false;
            Swal.fire({
              icon: 'error',
              text: 'Only Upload VIDEO File!'
            })
          } else if (event.body.errorMessage == "413") {
            this.show = false;
            Swal.fire({
              icon: 'error',
              text: 'File size Over limit 50MB!!'
            })
          } else {
            this.imgPath2 = event.body.dbPath;
            this.message = '200';
            this.show = false;
            this.onUploadFinished.emit(event.body);
            this.filename2 = event.body.fileName;
          }
        }
      });
  }

  updateKMFile(topic, detail, dep) {
    if (topic.value == '') {
      Swal.fire({
        icon: 'warning',
        text: 'กรุณากรอกหัวข้อเรื่อง!'
      })
    } else if (detail.value == '') {
      Swal.fire({
        icon: 'warning',
        text: 'กรุณากรอกรายละเอียด!'
      })
    } else if (this.message != "200") {
      Swal.fire({
        icon: 'warning',
        text: 'กรุณาเลือกไฟล์แนบ!'
      })
    }else{

    }
  }
}
