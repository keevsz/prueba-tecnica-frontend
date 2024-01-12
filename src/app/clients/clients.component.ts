import { Component, OnInit } from '@angular/core';
import { SdkService } from '../sdk.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
  constructor(private sdkService: SdkService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getToken();
  }

  clientForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    token: new FormControl(''),
  });

  getToken() {
    this.sdkService.getToken().subscribe((data: any) => {
      this.clientForm.setValue({
        token: data.value,
        email: '',
        name: '',
      });
    });
  }

  registerClient() {
    this.sdkService
      .registerClient({
        name: this.clientForm.value.name,
        email: this.clientForm.value.email,
        token: this.clientForm.value.token,
      })
      .subscribe({
        next: (data: any) => {
          this.clientForm.setValue({
            token: this.clientForm.value.token!,
            email: '',
            name: '',
          });
          this.toastr.success('Cliente registrado', 'Ok');
        },
        error: (error: any) => {
          if (error.status === 401) {
            this.toastr.error(error.error.message, 'Error');
          } else if (error.status === 400) {
            this.toastr.warning(error.error.message, 'Warning');
          } else {
            console.error('Error:', error);
          }
        },
      });
  }
}
