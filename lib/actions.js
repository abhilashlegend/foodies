'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(input) {
  return !input || input.trim().length === 0 || input.trim() === ''; 
}

export async function submitShareMealsForm(prevState, formData) {
  
 const meals = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email')
  }

  if(isInvalidText(meals.title) ||
     isInvalidText(meals.summary) ||
     isInvalidText(meals.instructions) ||
     isInvalidText(meals.creator) ||
     isInvalidText(meals.creator_email) ||
     !meals.creator_email.includes('@') ||
     !meals.image ||
     meals.image.size === 0
    ) {
      /* throw new Error('Invalid input'); */
      return {
        message: 'Invalid input'
      }
    }
  
  await saveMeal(meals);

  revalidatePath('/meals');
  redirect('/meals');

}