import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-forms',
  templateUrl: './upload-forms.component.html',
  styleUrls: ['./upload-forms.component.css']
})
export class UploadFormsComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  public progress: number;
  public message: string;
  idHRIS;
  showURL = false;
  filePath;
  filename;
  userID;
  URLPath;
  hide;
  txtValue:string = null;

  @Output() public onUploadFinished = new EventEmitter();
  
  ngOnInit(): void {
    this.userID = localStorage.getItem("idemy");
    this.idHRIS = localStorage.getItem("menuID");
    this.hide = localStorage.getItem("hideItem");
  }

  reloadCurrentPage() {
    window.location.reload();
  }

  public uploadFile = (files) => {
    this.showURL = true;
    if (files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post<any>('/api/UploadFile/UploadFilesMenu', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          if (event.body.errorMessage != null) {
            this.showURL = false;
            Swal.fire({
              icon: 'error',
              text: 'Only Upload PDF File!'
            })
          } else {
            this.showURL = false;
            this.filePath = event.body.dbPath;
            this.message = '200';
            this.onUploadFinished.emit(event.body);
            this.filename = event.body.fileName;
          }
        }
      });
  }

  onTextChange(value){
    this.txtValue = value;
  }

  removeValue(){
    localStorage.removeItem("hideItem");
  }

  saveMeneFile(head){
    
    if(this.txtValue == ''){
      this.URLPath = null;
      console.log(" 1 URLPath:"+ this.URLPath);
      
    }else{
      this.URLPath = this.txtValue;
      console.log(" 2 URLPath:"+ this.URLPath);
    }
    console.log("URLPath:"+this.URLPath);
    

    this.http.post<any>('/api/UploadFile/InsertFileMenu',{subject: head.value,urlPath: this.URLPath,filePath: this.filePath,id: this.idHRIS,create_by: this.userID})
    .subscribe(result => {
      if (result == "200") {
        Swal.fire({
          icon: 'success',
          title: 'Save Success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.reloadCurrentPage();
            localStorage.removeItem("menuID");
            localStorage.removeItem("hideItem");
          }
        })
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Save Error!'
        })
      }
    })
  }

}
