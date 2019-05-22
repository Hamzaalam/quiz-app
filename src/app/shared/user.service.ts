import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // readonly BaseURL ="http://localhost:35257";
  readonly BaseURL ="http://localhost:35257";
  UserName : string;
  Email : string;
  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;
  constructor(private http: HttpClient) { }

    displayTimeElapsed() {
      return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
   }
  
   registration(formData) {
    return this.http.post(this.BaseURL + '/api/User/Register', formData);
  }
    login(userName, password) {
      var data = "username=" + userName + "&password=" + password + "&grant_type=password";
      var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
      return this.http.post(this.BaseURL + '/token', data, { headers: reqHeader });
    }

    getUserClaims(){
      var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
      return  this.http.get(this.BaseURL+'/api/GetUserClaims',{headers:tokenHeader});
     }

     getQuestions() {
      var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
      return this.http.get(this.BaseURL+'/api/Questions',{headers:tokenHeader});
    }

    getAnswers() {
      var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
      var body = this.qns.map(x => x.QnID);
      return this.http.post(this.BaseURL + '/api/Answers', body, {headers:tokenHeader});
    }

    submitScore() {
    var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
    var body = JSON.parse('{"UserName":"","Email":"","Score":0, "TimeSpent":0}');
      body.Score = this.correctAnswerCount;
      body.TimeSpent = this.seconds;
      body.UserName = this.UserName;
      body.Email = this.Email;
      return this.http.post(this.BaseURL + "/api/Result", body,{headers:tokenHeader});
    }
   
  
}
