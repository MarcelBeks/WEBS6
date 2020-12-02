import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { ChangeDetectorRef } from '@angular/core';
import { Sprint } from 'src/app/models/sprint';
import { Project } from 'src/app/models/project';
import { Subscription } from 'rxjs';
import { StoryService } from 'src/app/services/story.service';
import { map } from 'rxjs/operators';
import { Story } from 'src/app/models/story';

@Component({
  selector: 'app-sprint-burndownchart',
  templateUrl: './sprint-burndownchart.component.html',
  styleUrls: ['./sprint-burndownchart.component.css']
})
export class SprintBurndownchartComponent implements OnInit, OnChanges, AfterViewInit {

  chart: Chart;
  idealLineData: number[];
  sprintLineData: number[];

  private subscriptions: Subscription[] = [];

  @Input()
  public sprint: Sprint;
  @Input()
  public project: Project;
  @Input()
  public stories: Story[];

  completedStories: Story[];
  completedStoriesAtDate: Array<object>;
  totalPoints: number;

  @ViewChild('canvas') canvas: ElementRef;
    public context: CanvasRenderingContext2D;

  constructor(private cdRef:ChangeDetectorRef, private storyService: StoryService) { }

  ngOnInit(): void {
    this.orderStories(this.stories);
    this.completedStoriesAtDate = this.getCompletedStoriesAtDate(this.sprint.dates, this.completedStories);
    this.idealLineData = this.getIdealLineData(this.sprint.dates, this.totalPoints);
    this.sprintLineData = this.getSprintLineData(this.sprint.dates, this.totalPoints, this.completedStories);
  }

  ngOnChanges(): void {
    if(this.chart){
      this.orderStories(this.stories);
      this.completedStoriesAtDate = this.getCompletedStoriesAtDate(this.sprint.dates, this.completedStories);
      this.chart.config.data.datasets[0].data = this.sprintLineData = this.getSprintLineData(this.sprint.dates, this.totalPoints, this.completedStories);
      this.chart.config.data.datasets[1].data = this.idealLineData = this.getIdealLineData(this.sprint.dates, this.totalPoints);      

      this.chart.config.data.labels = this.sprint.dates;

      this.chart.update();
    }
  }

  ngAfterViewInit(): void {
    var self = this;
    this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
    this.chart = new Chart(this.context, {
      type: 'line',
      data: {
        labels: this.sprint.dates,
        datasets: [
          {
            label: 'Current remaining story points',
            data: this.sprintLineData,
            borderColor: '#ffcc00',
            backgroundColor: '#ffcc00',
            fill: false,
            lineTension: 0.2
          },
          {
            label: 'Ideal remaining story points',
            data: this.idealLineData,
            borderColor: 'green',
            backgroundColor: 'green',
            fill: false,
            lineTension: 0.2,
          }
        ]
      },
      options: {
        tooltips: {
          titleFontSize: 15,
          bodyFontSize: 15,
          displayColors: false,
          callbacks: {
              afterBody: function(tooltipItem, chart) {
                if (tooltipItem['0'].datasetIndex == 0) {
                  let returnString = `Completed stories on this date: ${self.completedStoriesAtDate[tooltipItem['0'].index]['completedStories'].toString()} (${self.completedStoriesAtDate[tooltipItem['0'].index]['completedPoints'].toString()} points)`
                  return returnString;
                }
              }
          }
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            fontColor: 'black'
          }
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              fontColor: 'black',
              fontSize: 12,
              beginAtZero: true
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              fontColor: 'black',
              fontSize: 12,
              beginAtZero: true
            }
          }]
        }
      }
    })
    this.cdRef.detectChanges();
  }

  orderStories(stories: Story[]) {
    this.completedStories = [];
    this.totalPoints = 0;
    stories.forEach(story => {
      if(story.points != null) this.totalPoints += parseInt(story.points);
      if(story.status == 'done') this.completedStories.push(story);      
    })
  }

  getIdealLineData(dates: string[], totalPoints: number) {
    let steps: number[] = [];
    for(let x = 0; x < dates.length; x++) {
      steps.push(totalPoints - parseInt((((totalPoints / (dates.length - 1)) * x)).toString()));
    }
    return steps;
  }

  getSprintLineData(dates: string[], totalPoints: number, completedStories: Story[]) {
    let steps: number[] = [];
    let remainingPoints = totalPoints;
    for(let x = 0; x < dates.length; x++) {
      completedStories.forEach(story => {
        if(dates[x] == story.doneAt.toString()) {
          remainingPoints -= parseInt(story.points);
        }
      })
      steps.push(remainingPoints);
    }
    return steps;
  }

  getCompletedStoriesAtDate(dates: string[], completedStories: Story[]) {
    let steps: Array<object> = [];
    for(let x = 0; x < dates.length; x++) {
      let completedThisDate = 0;
      let completedPoints: number = 0
      completedStories.forEach(story => {
        if(dates[x] == story.doneAt.toString()) {
          completedThisDate++;
          completedPoints += parseInt(story.points);
        }
      })
      steps.push({ completedStories: completedThisDate, completedPoints:  completedPoints});
    }
    return steps;
  }

}
