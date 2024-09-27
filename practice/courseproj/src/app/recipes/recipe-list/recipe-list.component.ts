import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      'Pork Sinigang',
      'Stew with sour and meaty taste from pork with chinese spinach, tomato, chili peppers, and more.',
      'https://assets.unileversolutions.com/recipes-v2/214408.png'
    ),
  ];
}
