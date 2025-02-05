// Данные о сотрудниках
const datee = 25;
const employees = [
    { id: 0, fio: 'Утева Александра', workYears: 22, position: 'Ук', place: 'Цоколь', photo: './img/Tsokol/Uteva.jpg' },
    { id: 0, fio: 'Булатов Ришат', workYears: 22, position: 'СС', place: 'Цоколь', photo: './img/Tsokol/Bulatov.png' },
    { id: 0, fio: 'Эфендиева Аида', workYears: 22, position: 'СС', place: 'Цоколь', photo: './img/Tsokol/Efendieva.jpg' },
    { id: 0, fio: 'Обыденникова Анна', workYears: 23, position: 'СС+', place: 'Цоколь', photo: './img/Tsokol/Obidennikova.jpg' },
    { id: 0, fio: '', workYears: 19, position: '', place: 'Цоколь', photo: './img/.png' },
    { id: 0, fio: '', workYears: 19, position: '', place: 'Цоколь', photo: './img/.png' },
    { id: 0, fio: '', workYears: 19, position: '', place: 'Цоколь', photo: './img/.png' },
    { id: 0, fio: '', workYears: 19, position: '', place: 'Цоколь', photo: './img/.png' },
    { id: 0, fio: '', workYears: 19, position: '', place: 'Цоколь', photo: './img/.png' },
    { id: 0, fio: '', workYears: 19, position: '', place: 'Цоколь', photo: './img/.png' },
    { id: 0, fio: '', workYears: 19, position: '', place: 'Цоколь', photo: './img/.png' },

    { id: 1, fio: 'Петров Петр Петрович', workYears: 7, position: 'Администратор', place: 'Депо', photo: '/path/to/anotherPhoto.jpg' },
    // 0 - цоколь
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const backButton = document.getElementById('backButton');
    
    let isBackMode = false;

    function showMainButton() {
        const mainButton = document.createElement('button');
        mainButton.textContent = 'Нажми меня';
        container.appendChild(mainButton);

        mainButton.addEventListener('click', () => {
            mainButton.remove();
            createButtons();
        });
    }

function createButtons() {
    for (let i = 0; i < 5; i++) {
        const button = document.createElement('button');
        if (i==0) {
            button.textContent = `Цоколь`;
        }
        if (i==1) {
            button.textContent = `Депо`;
        }
        if (i==2) {
            button.textContent = `Щелчок`;
        }
        if (i==3) {
            button.textContent = `Евро 3`;
        }
        if (i==4) {
            button.textContent = `Брянск`;
        }
        // button.textContent = `Цоколь`;
        container.appendChild(button);

        button.addEventListener('click', () => {
            hideButtons();
            showEmployeeList(i);
        });
        
    }
}



    function hideButtons() {
        Array.from(container.children).forEach(child => child.style.display = 'none');
        backButton.style.display = 'block';
    }

    function showEmployeeList(index) {
        const employeeList = document.createElement('div');
        employeeList.classList.add('employee-list');

        for (let j = 0; j < 15; j++) {
            const employeeData = employees[j];
            if (!employeeData) continue;
            if (employeeData.id == index ) {

            const employeeButton = document.createElement('button');
            employeeButton.textContent = `${employeeData.fio}`;
            employeeButton.dataset.employeeId = employeeData.id;
            employeeList.appendChild(employeeButton);

            employeeButton.addEventListener('click', () => {
                saveEmployeeCard(employeeData);
            });}
        }

        container.appendChild(employeeList);
        employeeList.classList.add('show');
    }

    function saveEmployeeCard(employeeData) {
        localStorage.setItem(`employee-${employeeData.id}`, JSON.stringify(employeeData));
        renderSavedCards();
    }
    
    function renderSavedCards() {
        container.innerHTML = '';
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('employee-')) {
                const employeeData = JSON.parse(localStorage.getItem(key));
                const employeeCard = document.createElement('div');
                employeeCard.classList.add('employee-card');
    
                employeeCard.innerHTML = `

                    <h4 class="FIO">${employeeData.fio}</h4>
                    <p class="workplace">${employeeData.place}</p>
    
                    <p>Должность: ${employeeData.position}</p>
                    <p>Стаж: ${datee - employeeData.workYears}</p>

                    <div class="image_place">
                        <div class="photo-container">
                            <img src="${employeeData.photo}" alt="Фото сотрудника" />
                        </div>
                    </div>
                    <button class="delete-button">Удалить</button>
                `;
    
                const deleteButton = employeeCard.querySelector('.delete-button');
                deleteButton.addEventListener('click', () => {
                    localStorage.removeItem(key);
                    renderSavedCards();
                });
    
                container.appendChild(employeeCard);
            }
        });
    }

    backButton.addEventListener('click', () => {
        isBackMode = true;
        resetInterface();
    });

    function resetInterface() {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        backButton.style.display = 'none';
        if (!isBackMode) return;
        showMainButton();
    }

    renderSavedCards(); // Отображаем сохранённые карточки при загрузке страницы
    showMainButton();
});


// function createButtons() {
//     for (let i = 0; i < 5; i++) {
//         const button = document.createElement('button');
//         if (i==0) {
//             button.textContent = `Цоколь`;
//         }
//         if (i==1) {
//             button.textContent = `Депо`;
//         }
//         if (i==2) {
//             button.textContent = `Щелчок`;
//         }
//         if (i==3) {
//             button.textContent = `Евро 3`;
//         }
//         if (i==4) {
//             button.textContent = `Брянск`;
//         }
//         // button.textContent = `Цоколь`;
//         container.appendChild(button);

//         button.addEventListener('click', () => {
//             hideButtons();
//             showEmployeeList(i);
//         });
        
//     }
// }