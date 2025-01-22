import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-group-item",
  templateUrl: "./group-item.component.html",
  styleUrls: ["./group-item.component.scss"],
standalone: false,
})
export class GroupItemComponent implements OnInit {
  @Input() grupo: any;
  @Output() OnSelected = new EventEmitter<any>();
  @Output() OnTryToJoin = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  clicked() {
    this.OnSelected.emit(this.grupo);
  }
  TriedToJoin() {
    this.OnTryToJoin.emit(this.grupo.id);
  }
}
