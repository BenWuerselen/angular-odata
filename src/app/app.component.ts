import { Component, VERSION } from "@angular/core";
import { ODataClient, ODataServiceFactory } from "angular-odata";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  constructor(private factory: ODataServiceFactory) {
    this.queries();
  }

  queries() {
    // Use OData Service Factory
    let airportsService = this.factory.entity<Airport>("Airports");
    let peopleService = this.factory.entity<Person>("People");

    let airports = airportsService.entities();

    // Fetch all airports
    airports.all().subscribe(aports => console.log("All: ", aports));
  }
}

export interface Person {
  UserName: string;
  FirstName: string;
  LastName: string;
  Emails?: string[];
  Gender?: PersonGender;
  Friends?: Person[];
  Trips?: Trip[];
  Photo?: Photo;
}

export interface Trip {
  TripId: number;
  ShareId?: string;
  Description?: string;
  Name: string;
  Budget: number;
  StartsAt: Date;
  EndsAt: Date;
  Tags: string[];
  Photos?: Photo[];
  PlanItems?: PlanItem[];
}

export interface Photo {
  Id: number;
  Name?: string;
}

export interface PlanItem {
  PlanItemId: number;
  ConfirmationCode?: string;
  StartsAt?: Date;
  EndsAt?: Date;
  Duration?: string;
}

export enum PersonGender {
  Male = 0,
  Female = 1,
  Unknown = 2
}
