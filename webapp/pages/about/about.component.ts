import {Component, OnInit} from "@angular/core";

@Component({
    templateUrl: 'about.html'
})
export class AboutComponent implements OnInit {

    ngOnInit() {
    	console.log("about");
    }
}