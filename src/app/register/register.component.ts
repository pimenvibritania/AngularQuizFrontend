import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form = {
    grant_type: 'password',
    client_id: '2',
    client_secret: 'FmB5nDAjciADDuQpVsVBCMdsG6lAl6xZuOgtoWna',
    username: null,
    password: null,
  }

  public error = null;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";


  constructor(private quizService : QuizService, private route : Router, private http : HttpClient) { }

  onSubmit(name:string){
    // this.quizService.insertParticipant(name).subscribe(
    //   (data:any) =>{
      //   }
      // )
      return this.http.post('http://localhost:8000/oauth/token', this.form).subscribe(
        (data:any) => {
          localStorage.clear();
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('name', name);
              this.route.navigate(['/quiz']);

      }
    )
  }

  handleError(error){
    this.error = error.error;
  }


  ngOnInit() {
  }

  // OnSubmit(name: string, email:string){
  //   this.quizService.insertParticipant(name,email).subscribe(
  //     (data : any) =>{
  //       localStorage.clear();
  //       localStorage.setItem('participant',JSON.stringify(data));
  //       this.route.navigate(['/quiz']);
  //     }
  //   );
  // }

  

}
