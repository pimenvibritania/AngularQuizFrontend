import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {


  constructor(private quizService : QuizService, private router:Router) { }

  ngOnInit() {

    this.quizService.getAnswer().subscribe(
      (data:any) => {
        console.log(this.quizService.correctAnswer)
        
      }
    );
  }

  restart(){
    localStorage.setItem('qnProgress', "0");
    localStorage.setItem('questions', "");
    localStorage.setItem('seconds', "0");
    this.router.navigate(['/quiz']).then(()=> {
      window.location.reload()
    })
  }

}
