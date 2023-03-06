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

export class NameCardComponent implements AfterViewInit {

  @Input() public person: Person;
  @Output() public personEmitter: EventEmitter<Person> = new EventEmitter<Person>();
  @ViewChild("otherNationality") elementRef: ElementRef<HTMLLIElement>;

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.textContent = `Other: ${Math.trunc(100*(1 - this.person.nationality
      .reduce((acc, s) => acc += s.probability, 0))) / 100}`;
  }
  destroyPerson(){
    this.personEmitter.emit(this.person);
  }
}
