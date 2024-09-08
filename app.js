// app.js

// Fonction pour afficher les onglets
const showTab = (tabId) => {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
};

// Ajouter un devoir
document.getElementById('homework-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const subject = document.getElementById('subject').value;
  const task = document.getElementById('task').value;
  const dueDate = document.getElementById('due-date').value;

  const homework = { subject, task, dueDate, id: Date.now() };

  let homeworks = JSON.parse(localStorage.getItem('homeworks')) || [];
  homeworks.push(homework);
  localStorage.setItem('homeworks', JSON.stringify(homeworks));

  document.getElementById('homework-form').reset();
  displayHomeworks();
});

// Afficher les devoirs
const displayHomeworks = () => {
  const homeworkList = document.getElementById('homework-list');
  let homeworks = JSON.parse(localStorage.getItem('homeworks')) || [];

  homeworkList.innerHTML = '';
  homeworks.forEach(hw => {
    homeworkList.innerHTML += `
      <div id="homework-${hw.id}">
        <h3>${hw.subject}</h3>
        <p>${hw.task}</p>
        <p>Date Limite: ${hw.dueDate}</p>
        <button class="edit" onclick="editHomework(${hw.id})">Modifier</button>
        <button class="delete" onclick="deleteHomework(${hw.id})">Supprimer</button>
      </div>
    `;
  });
};

// Ajouter un événement
document.getElementById('event-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('event-title').value;
  const eventDate = document.getElementById('event-date').value;

  const event = { title, eventDate, id: Date.now() };

  let events = JSON.parse(localStorage.getItem('events')) || [];
  events.push(event);
  localStorage.setItem('events', JSON.stringify(events));

  document.getElementById('event-form').reset();
  displayEvents();
});

// Afficher les événements
const displayEvents = () => {
  const eventList = document.getElementById('event-list');
  let events = JSON.parse(localStorage.getItem('events')) || [];

  eventList.innerHTML = '';
  events.forEach(ev => {
    eventList.innerHTML += `
      <div id="event-${ev.id}">
        <h3>${ev.title}</h3>
        <p>Date: ${ev.eventDate}</p>
        <button class="edit" onclick="editEvent(${ev.id})">Modifier</button>
        <button class="delete" onclick="deleteEvent(${ev.id})">Supprimer</button>
      </div>
    `;
  });
};

// Supprimer un devoir
const deleteHomework = (id) => {
  let homeworks = JSON.parse(localStorage.getItem('homeworks')) || [];
  homeworks = homeworks.filter(hw => hw.id !== id);
  localStorage.setItem('homeworks', JSON.stringify(homeworks));
  displayHomeworks();
};

// Modifier un devoir
const editHomework = (id) => {
  let homeworks = JSON.parse(localStorage.getItem('homeworks')) || [];
  const homework = homeworks.find(hw => hw.id === id);

  if (homework) {
    document.getElementById('subject').value = homework.subject;
    document.getElementById('task').value = homework.task;
    document.getElementById('due-date').value = homework.dueDate;

    deleteHomework(id);
  }
};

// Supprimer un événement
const deleteEvent = (id) => {
  let events = JSON.parse(localStorage.getItem('events')) || [];
  events = events.filter(ev => ev.id !== id);
  localStorage.setItem('events', JSON.stringify(events));
  displayEvents();
};

// Modifier un événement
const editEvent = (id) => {
  let events = JSON.parse(localStorage.getItem('events')) || [];
  const event = events.find(ev => ev.id === id);

  if (event) {
    document.getElementById('event-title').value = event.title;
    document.getElementById('event-date').value = event.eventDate;

    deleteEvent(id);
  }
};

// Initialiser l'affichage
displayHomeworks();
displayEvents();
