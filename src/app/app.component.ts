import {Component, ElementRef, ViewChild} from '@angular/core';
import {PersonInfoService} from "./services/person-info.service";
import {ApiNames} from "./models/ApiNames";
import {Person} from "./data-entities/Person";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  public inputName: string;
  public people: Person[] = [];

  @ViewChild("nameInput") public inputElem: ElementRef<HTMLInputElement>;

  constructor(private personInfoService: PersonInfoService) {}

  public parseName(){
    const element = this.inputElem.nativeElement;
    const elementValue = element.value.trim();
    if(elementValue !== "") {
      this.initialisePerson(elementValue);
      element.value = "";
    }
    else
      alert("Incorrect Name!")
    this.inputElem.nativeElement.focus();
  }

  private initialisePerson(name: string){
    let person = {name: name} as Person;
    this.personInfoService.getInfoByName(name)
      .subscribe(tuple => {
        this.checkResponseType(tuple, person);
        if(person.age && person.gender && person.nationality)
          this.people.unshift(person);
        });
  }

  private checkResponseType(tuple: any[], person: Person){
    if(tuple[1] === ApiNames.agify)
      person.age = tuple[0].age;
    else if(tuple[1] === ApiNames.genderize)
      person.gender = tuple[0];
    else
      person.nationality = tuple[0].country;
  }

  public removePerson(personToRemove: Person){
    this.people = this.people.filter(p => p !== personToRemove);
  }
}
