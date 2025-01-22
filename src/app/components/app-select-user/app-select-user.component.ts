import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-select-user",
  templateUrl: "./app-select-user.component.html",
  styleUrls: ["./app-select-user.component.scss"],
standalone: false,
})
export class AppSelectUserComponent implements OnInit {
  @Input() object: any;
  @Output() OnSelected: EventEmitter<any> = new EventEmitter<any>();
  IsSelectedItem: boolean = false;
  constructor() {}

  ngOnInit() {}

  IsSelected(id,mode) {


    let params={

      id:id,
      mode:mode,
      user:this.object,


    }

    this.OnSelected.emit(params);
  }

  ChangeMode(mode) {

    this.IsSelectedItem = mode;

    let id="custom"+this.object.id;
    let row =document.getElementById(id);

    if (this.IsSelectedItem) {

      row.classList.add("custom");
      this.IsSelected(this.object.id,1);


    }else{

      row.classList.remove("custom");
      this.IsSelected(this.object.id,0);

    }
  }
}
