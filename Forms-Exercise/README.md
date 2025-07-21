# Forms Exercise

## Spacecraft Builder 🛠️

In this exercise, I will practice forms in React by creating a comprehensive Spacecraft Builder application. 🏗️

This project offers a fantastic chance to deepen my grasp of React fundamentals, including component-based architecture, state management, handling user inputs, and managing the interaction between parent and child components. 🌟

My main goal is to develop an application that enables users to design their spacecraft by inputting their items into the inventory. The application also displays inventory, each with detailed information such as the item's name, quantity, and purpose. Users will also be able to delete each item.

## Component Design 🎨

The Spacecraft Builder application will consist of several components, each dedicated to handling a distinct segment of the application's functionality. Here's a breakdown of the components you'll develop and their roles:

- `SpacecraftBuilder` is the pivotal component that maintains the inventory for the spacecraft design process.
- `ItemForm` allows user input for adding items to the inventory. It functions by invoking callback functions handed down from `SpacecraftBuilder`, demonstrating how child components can initiate state changes in the parent.
- `InventoryDisplay` is a stateless component that showcases items in the inventory.
- `ItemCard` provides detailed information about each item, such as its name, quantity, and purpose.
- `ItemAction` enables users to delete an item. It functions by invoking callback functions handed down from `SpacecraftBuilder` to `InventoryDisplay`.
