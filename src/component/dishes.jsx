import React, { useEffect, useState } from "react";
import dish1 from "../assets/dish1.svg";
import dish2 from "../assets/dish2.svg";
import dish3 from "../assets/dish3.svg";
import dish4 from "../assets/dish4.svg";
import dish5 from "../assets/dish5.svg";


const dishes = [
  { id: 1, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish1, category: "today", dine: ["Dine In", "Take Away"] },
  { id: 2, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish2, category: "south", dine: ["Take Away"] },
  { id: 3, name: "Spicy instant noodle with omelette", oldPrice: 42, newPrice: 32.89, available: "17 Bowls available", image: dish3, category: "today", dine: ["Dine In"] },
  { id: 4, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish4, category: "today", dine: ["Take Away"] },
  { id: 5, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish5, category: "south", dine: ["Dine In"] },
  { id: 6, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish1, category: "today", dine: ["Take Away"] },
  { id: 7, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish2, category: "today", dine: ["Dine In"] },
  { id: 8, name: "Spicy instant noodle with omelette", oldPrice: 42, newPrice: 32.89, available: "17 Bowls available", image: dish3, category: "south", dine: ["Take Away"] },
  { id: 9, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish4, category: "our", dine: ["Dine In"] },
  { id: 10, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish5, category: "today", dine: ["Dine In"] },
  { id: 11, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish2, category: "south", dine: ["Dine In"] },
  { id: 12, name: "Spicy instant noodle with omelette", oldPrice: 42, newPrice: 32.89, available: "17 Bowls available", image: dish3, category: "our", dine: ["Take Away"] },
  { id: 13, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish4, category: "today", dine: ["Dine In", "Take Away"] },
  { id: 14, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish5, category: "south", dine: ["Dine In", "Take Away"] },
  { id: 15, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish1, category: "our", dine: ["Dine In", "Take Away"] },
  { id: 16, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish2, category: "today", dine: ["Dine In", "Take Away"] },
  { id: 17, name: "Spicy instant noodle with omelette", oldPrice: 42, newPrice: 32.89, available: "17 Bowls available", image: dish3, category: "south", dine: ["Dine In", "Take Away"] },
  { id: 18, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish4, category: "our", dine: ["Dine In", "Take Away"] },
  { id: 19, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish5, category: "today", dine: ["Dine In", "Take Away"] },
];

export default dishes;