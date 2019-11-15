import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'; 


@Injectable({
  providedIn: 'root'
})
export class QuizService {


  readonly rootUrl = 'http://localhost:8000/';
  questions: any[];
  seconds: number;
  timer;
  timeSpent;
  qnProgress: number;
  correctAnswer: number = 0;

  
  constructor( private http : HttpClient) { }


  displayTime(){
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds /60) + ':' + Math.floor(this.seconds % 60)
  }



  // insertParticipant(name: string){
  //   var body ={
  //     Name: name,
      
  //   }
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization':'Bearer '+localStorage.getItem('access_token')
  //     })
  //   }

  //   console.log(name);

  //   return this.http.post(this.rootUrl + 'api/participant', body, httpOptions);
  // }

  getQuestions(){
    return this.http.get(this.rootUrl + 'api/questions');
  }

  getParticipant(){
    var participant =localStorage.getItem('name');
    console.log(participant);
    return participant
  }

  getAnswer(){
    this.questions.forEach((e,i)=>{
      if(e.answer == e.choice)
      this.correctAnswer++;
    })

    var body = {
      score: this.correctAnswer,
      timeSpent: this.seconds
    }
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer '+localStorage.getItem('access_token')
      })
    }
    return this.http.post(this.rootUrl + 'api/penilaian', body, httpOptions);
  }
}
