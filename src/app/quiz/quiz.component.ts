import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  

  constructor(private router : Router, private quizService : QuizService) { }

  ngOnInit() {
    // window.location.reload()
    this.quizService.seconds = 0;
    this.quizService.qnProgress = 0;
    this.quizService.getQuestions().subscribe(
      (data : any) =>{
        this.quizService.questions = data.data;
        this.startTime();
        // console.log(data);
      }
    )
    
  }

  startTime(){
    this.quizService.timer = setInterval(()=>
    {this.quizService.seconds++;
    }, 1000);
  }

  Answer(id,choice){
    this.quizService.questions[this.quizService.qnProgress].choice = choice;
    this.quizService.qnProgress++;
    if(this.quizService.qnProgress == 10){
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }

}
