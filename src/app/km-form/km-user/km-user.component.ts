import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KmAdminComponent } from '../km-admin/km-admin.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { KmAdminEditComponent } from '../km-admin-edit/km-admin-edit.component';

@Component({
  selector: 'app-km-user',
  templateUrl: './km-user.component.html',
  styleUrls: ['./km-user.component.css']
})
export class KmUserComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) Sort: MatSort;
  searchKey: string;
  data: MatTableDataSource<any>;
  dep_ID;
  array;

  constructor(private http: HttpClient, public dialog: MatDialog, private router: Router) { }


  displayedColumns: string[] = ['title', 'department', 'pdf', 'video', 'btn'];

  ngOnInit(): void {
    this.http.post<any>('/api/UploadFile/GetShowFileKM', {}).subscribe(result => {
      this.array = result;

      this.data = new MatTableDataSource(this.array);
      this.data.sort = this.Sort;
      this.data.paginator = this.paginator;
    })
  }

  reloadCurrentPage() {
    window.location.reload();
  }

  onSearchClear() {
    this.searchKey = "";
    this.reloadCurrentPage();
  }

  applyFilter() {
    this.data.filter = this.searchKey.trim().toLowerCase();
  }

  openDialogKM() {
    this.dialog.open(KmAdminComponent, {
    });
  }

  deleteKM(id) {
    if (id != null) {
      Swal.fire({
        title: 'Do you want to Delete?',
        confirmButtonText: 'OK',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.post<any>('/api/UploadFile/DeleteKM', { id: id }).subscribe(result => {
            if (result == 200) {
              Swal.fire({
                icon: 'success',
                title: 'Deleted Success',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/KmUser']);
                  this.reloadCurrentPage();
                }
              })
            } else {
              Swal.fire('Delete Error!!', '', 'error')
            }
          })
        }
      })
    }
  }

  openDialogKMEdit(id) {
    localStorage.setItem("idItemKM",id);
    this.dialog.open(KmAdminEditComponent, {
    });
  }
}
