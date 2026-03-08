const fs = require('fs');

const fileData = fs.readFileSync('todos.json', 'utf-8');
const parsedData = JSON.parse(fileData);
const todos = parsedData;

const id = JSON.parse(fs.readFileSync('id.json', 'utf-8'));

const type = process.argv[2];
const content = process.argv[3];

if ( type == "add" ) {
    todos.push({ id: id, content: content, isFinished: false });
    const jsonData = JSON.stringify(todos, null, 2);
    const jsonidData = JSON.stringify(id+1, null, 2);
    fs. writeFileSync('todos.json', jsonData);
    fs. writeFileSync('id.json', jsonidData);
    console.log(`Todo가 추가되었습니다: ${content}`);
}

if ( type == `list` && todos.length > 0 ) {
    todos.map((todo, index) => {
        const status = todo.isFinished ? `[x]` : `[ ]`;
        console.log(`${status} ${todo.id}. ${todo.content}`);
    })
} else if ( type == `list` ) {
    console.log('Todo가 없습니다.');
}

if ( type == "done" ) {
    const doneTodo = todos.find(todo => todo.id === Number(content));

    if(doneTodo) {
        doneTodo.isFinished = true;
        console.log(`id ${content}번 항목이 완료되었습니다.`);
        const jsonData = JSON.stringify(todos, null, 2);
        fs. writeFileSync('todos.json', jsonData);
    } else {
        console.log(`해당 id를 찾을 수 없습니다.`);
    }
}

if ( type == "update" ) {
    const updatedTodo = todos.find(todo => todo.id === Number(content));

    if(updatedTodo) {
        const newContent = process.argv[4];
        updatedTodo.content = newContent;
        console.log(`id ${content}번 항목이 수정되었습니다: ${newContent}`);
        const jsonData = JSON.stringify(todos, null, 2);
        fs. writeFileSync('todos.json', jsonData);
    } else {
        console.log(`해당 id를 찾을 수 없습니다.`);
    }
}

if ( type == "delete" ) {
    const deletedTodo = todos.find(todo => todo.id === Number(content));

    if(deletedTodo) {
        const filteredTodos = todos.filter(todo => todo.id !== Number(content))
        console.log(`id ${content}번 항목이 삭제되었습니다.`);
        const jsonData = JSON.stringify(filteredTodos, null, 2);
        fs. writeFileSync('todos.json', jsonData);
    } else {
        console.log(`해당 id를 찾을 수 없습니다.`);
    }
}

console.log("실행 완료!");

// console.table(todos);
