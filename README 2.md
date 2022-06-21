# Sortable-Calendar

---

Title: Work Day Scheduler

---

Purpose: Help schedule and organise tasks thoughout the day

---

Description: An updateable series of forms that allows the user to input tasks for the day. Moment.js is used to update the current time and this in turn updates the CSS to change the background color of the form elements.

---

Ideal execution: The current time is diplayed. Background form colors update based on current time. User inputs text into form fields. When save btn is pressed, the form data is saved to local storage. When the page is reloaded, the data is displayed in the form fields

---

Actual fuction: Functions as expected. Each save btn saves all the data on the screen. ideally, they should only save the input field they are refering to. This could be fixed with more code (adding an ID to all save btns and writing independent functions for all save btns), but unless I can compact the current JS with for loops, the code would start to get very long!

Because of the large and complex JS code (much of it executed via brute force, not clean simple fucntions), there is a lag and the background colors CSS takes a second to load.

---

Deployment: When the HTML, CSS and JS files are displayed by any browser the code should appear as indicated by this example image: ![example](./assets/Media/example.png)
The page can also be access via the folowing url: https://wollemipines.github.io/Sortable-Calendar/

---

Changes: None, this is the first edtion.
