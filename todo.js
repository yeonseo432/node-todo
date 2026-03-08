const fs = require(`fs`);
const db = require(`./database`)

const todos = db.loadData(`todos.json`);
const id = db.loadData(`id.json`);

const type = process.argv[2];
const content = process.argv[3];

if ( type == `add` ) {
    todos.push({ id: id, content: content, done: false });
    db.saveData(`todos.json`, todos);
    fs. writeFileSync(`id.json`, JSON.stringify(id+1));
    console.log(`Todo가 추가되었습니다: ${content}`);
}

if ( type == `list` && todos.length > 0 ) {
    todos.map((todo, index) => {
        const status = todo.done ? `[x]` : `[ ]`;
        console.log(`${status} ${todo.id}. ${todo.content}`);
    })
} else if ( type == `list` ) {
    console.log(`Todo가 없습니다.`);
}

if ( type == `done` ) {
    const doneTodo = todos.find(todo => todo.id === Number(content));

    if(doneTodo) {
        if (doneTodo.done === false) {
            doneTodo.done = true;
            db.saveData(`todos.json`, todos);
            console.log(`id ${content}번 항목이 완료되었습니다.`);
        } else {
            console.log(`이미 완료된 항목입니다.`);
        }
    } else {
        console.log(`해당 id를 찾을 수 없습니다.`);
    }
}

if ( type == `update` ) {
    const updatedTodo = todos.find(todo => todo.id === Number(content));

    if(updatedTodo) {
        const newContent = process.argv[4];
        updatedTodo.content = newContent;
        db.saveData(`todos.json`, todos);
        console.log(`id ${content}번 항목이 수정되었습니다: ${newContent}`);
    } else {
        console.log(`해당 id를 찾을 수 없습니다.`);
    }
}

if ( type == `delete` ) {
    const deletedTodo = todos.find(todo => todo.id === Number(content));

    if(deletedTodo) {
        const filteredTodos = todos.filter(todo => todo.id !== Number(content))
        db.saveData(`todos.json`, filteredTodos);
        console.log(`id ${content}번 항목이 삭제되었습니다.`);
    } else {
        console.log(`해당 id를 찾을 수 없습니다.`);
    }
}

if ( type == `clear` ) {
    db.saveData(`todos.json`, []);
    fs. writeFileSync(`id.json`, JSON.stringify(1));
    console.log(`초기화되었습니다.`);
}