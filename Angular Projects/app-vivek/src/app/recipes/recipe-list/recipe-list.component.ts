import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'this is a simply test', 'https://assets.epicurious.com/photos/62d6c513077a952f4a8c338c/1:1/w_1920,c_limit/PannaCotta_RECIPE_04142022_9822_final.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
