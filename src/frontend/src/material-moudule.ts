import { NgModule } from "@angular/core";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import{MatInputModule}from"@angular/material/input"
@NgModule(
    {
        exports:[
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatButtonModule,
            MatFormFieldModule,
            MatInputModule,
            
        ]
    }
)

export class MaterialMoudule{ 

}