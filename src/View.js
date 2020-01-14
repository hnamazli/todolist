class View {
    constructor(model) {
        this._root = document.getElementById('root');
        this.init();
        this._model = model;
        this._model.subscribe(this.taskListRender);

        this.taskListRender();
    }

    init = () => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');

        const header = document.createElement('header');
        wrapper.append(header);

        const headerText = document.createElement('h1');
        headerText.innerText = 'ToDo List';
        header.append(headerText);

        const inputText = document.createElement('input');
        inputText.setAttribute('type', 'text');
        inputText.setAttribute('value', '');
        inputText.setAttribute('id', 'add');
        inputText.setAttribute('placeholder', 'What needs to be done?');
        inputText.addEventListener('keyup', this.taskAdd);
        header.append(inputText);

        const body = document.createElement('main');
        wrapper.append(body);

        const ul = document.createElement('ul');
        ul.setAttribute('id', 'list');
        body.append(ul);

        this._root.append(wrapper);
    };

    taskListRender = () => {
        list.innerHTML = '';

        const arr = this._model.getState();

        arr.forEach(item => {
            const li = document.createElement('li');
            const div = document.createElement('div');
            const input = document.createElement('input');
            const label = document.createElement('label');
            const button = document.createElement('button');

            input.setAttribute('type', 'checkbox');
            input.addEventListener('click', this.completeTask);
            item.completed && input.setAttribute('checked', 'checked');
            label.innerText = item.text;
            button.setAttribute('id', item.id);
            button.setAttribute('class', 'destroy');
            button.addEventListener('click', this.destroyTask);

            li.append(div);
            div.append(input);
            div.append(label);
            div.append(button);
            list.append(li);
        });
    };

    taskAdd = e => {
        if (e.keyCode === 13 && e.target.value) {
            e.preventDefault();
            this._model.dispatch({
                type: 'ADD_TODO',
                payload: e.target.value
            });

            e.target.value = '';
        }
    };

    destroyTask = e => {
        this._model.dispatch({
            type: 'DELETE_TODO',
            payload: e.target.id
        })
    };

    completeTask = e => {
        this._model.dispatch({
            type: 'COMPLETE_TODO',
            payload: e.target.parentNode.lastChild.id
        })
    }
}

export default View;