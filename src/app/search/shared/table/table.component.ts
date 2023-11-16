import { Component, EventEmitter, Input, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'shared-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {

  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Inicializar MatTableDataSource

  @Input() pageSizeOptions: number[] = [];
  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() columnNames: { [key: string]: string } = {}; // New input for custom column names

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }

  get filterValue(): string {
    return this.dataSource.filter || '';
  }

  emitFilterEvent(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
