'use strict';

class ToDoList {
    constructor(wrapper) {
        this.wrapperElement = document.querySelector(wrapper);

        this.uncompleted = this.wrapperElement.querySelector('.tasks__uncompleted');
        this.uncompletedList = this.uncompleted.querySelector('.task__list');

        this.completed = this.wrapperElement.querySelector('.tasks__completed');
        this.completedList = this.completed.querySelector('.task__list');

        this.disableEditing();
    }

    isInputEmpty(inputElement) {
        let inputLength = inputElement.nextElementSibling.value.length;
        return inputLength < 1;
    }

    removeCompletedTask(e) {
        if (e.target.matches('.fa-circle-minus')) {
            let taskItem = e.target.closest('.task__item--done');
            
            if (taskItem.parentElement.children.length <= 1) {
                this.completed.style.display = 'none';
            }
            
            taskItem.remove();
        }
    }

    markTaskAsCompleted(e) {
        if (e.target.matches('.icon-holder--undone')) {
            if (this.isInputEmpty(e.target)) {
                return;
            }

            this.completed.style.display = null;

            let taskElement = e.target.closest('.task__item--undone');
            let cloneTask = taskElement.cloneNode(true);

            cloneTask.classList.replace('task__item--undone', 'task__item--done');
            cloneTask.querySelector('.icon-holder--undone').classList.replace('icon-holder--undone', 'icon-holder--done');
            cloneTask.querySelector('.icon-holder--done').innerHTML = '<i class="fa-solid fa-circle-check"></i>';
            cloneTask.querySelector('.icon-holder--add-btn').classList.replace('icon-holder--add-btn', 'icon-holder--del-btn');
            cloneTask.querySelector('.icon-holder--del-btn').innerHTML = '<i class="fa-solid fa-circle-minus"></i>';

            this.completedList.insertAdjacentElement('beforeend', cloneTask);

            if (taskElement.parentElement.children.length > 1) {
                taskElement.remove();
            } else {
                e.target.nextElementSibling.value = '';
            }
            this.disableEditing();
        }
    }
    
    addEmptyTaskListItem(e) {
        if (e.target.matches('.fa-circle-plus')) {
            let cloneTask = e.target.closest('.task__item').cloneNode(true);
            cloneTask.querySelector('.task__input').value = null;

            this.uncompletedList.insertAdjacentElement('beforeend', cloneTask);
        }
    }

    disableEditing() {
        const completedTasks = this.completedList.querySelectorAll('.task__input');
        completedTasks.forEach(input => {
            input.setAttribute('readonly', 'true');
        });
    }

    init() {
        this.completed.style.display = 'none';
        this.uncompletedList.addEventListener('click', this.addEmptyTaskListItem.bind(this));
        this.uncompletedList.addEventListener('click', this.markTaskAsCompleted.bind(this));
        this.completedList.addEventListener('click', this.removeCompletedTask.bind(this));
    }
}