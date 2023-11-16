import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl
  private user?: User;

  constructor(private http: HttpClient) { }
  
}
