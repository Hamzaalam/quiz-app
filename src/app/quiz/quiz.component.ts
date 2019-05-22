import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router:Router , private service:UserService) { }

  ngOnInit() {
    if (parseInt(localStorage.getItem('seconds')) > 0) {
      this.service.seconds = parseInt(localStorage.getItem('seconds'));
      this.service.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.service.qns = JSON.parse(localStorage.getItem('qns'));
      if (this.service.qnProgress == 10)
        this.router.navigate(['/result']);
      else
        this.startTimer();
    }
    else {
      this.service.seconds = 0;
      this.service.qnProgress = 0;
      this.service.getQuestions().subscribe(
        (data: any) => {
          this.service.qns = data;
          this.startTimer();
        }
      );
    }
  }
  startTimer() {
    this.service.timer = setInterval(() => {
      this.service.seconds++;
      localStorage.setItem('seconds', this.service.seconds.toString());
    }, 1000);
  }

  Answer(qID, choice) {
    console.log(qID,choice);
    this.service.qns[this.service.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.service.qns));
    this.service.qnProgress++;
    localStorage.setItem('qnProgress', this.service.qnProgress.toString());
    if (this.service.qnProgress == 10) {
      clearInterval(this.service.timer);
      this.router.navigate(['/result']);
    }
  }
  
  next(){
   if(this.service.qnProgress >= 0 && this.service.qnProgress <=10)
    this.service.qnProgress++;
    
  }
  back(){
    if(this.service.qnProgress >= 0 && this.service.qnProgress <=10)
    this.service.qnProgress--; 
  }
}


