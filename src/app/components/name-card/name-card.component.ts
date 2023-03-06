import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef, EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {Person} from "../../data-entities/Person";

@Component({
  selector: 'app-name-card',
  templateUrl: './name-card.component.html',
  styleUrls: ['./name-card.component.scss']
})

export class NameCardComponent implements
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
{

  @Input() public person: Person;
  @Output() public personEmitter: EventEmitter<Person> = new EventEmitter<Person>();
  @Input() public testInput: string;
  @ViewChild("otherNationality") elementRef: ElementRef<HTMLLIElement>;
  public valueToChange: string = "default value";


  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges", changes)
  }

  ngOnInit(): void {
    console.log("ngOnInit")
  }

  ngDoCheck(): void {
    console.log("ngDoCheck")
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit")
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked")
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit(")
    this.elementRef.nativeElement.textContent = `Other: ${1 - this.person.nationality
      .reduce((acc, s) => acc += s.probability, 0)}`;
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked")
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy")
  }

  changeValueTest(){
    this.valueToChange = "value changed";
  }
  destroyPerson(){
    this.personEmitter.emit(this.person);
  }
}
