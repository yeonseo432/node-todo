const fs = require('fs');

const fileData = fs.readFileSync('todos.json', 'utf-8');
const parsedData = JSON.parse(fileData);
const todos = parsedData;

const type = process.argv[2];
const content = process.argv[3];

if ( type == "add" ) {
    todos.push({ content: content, isFinished: false });
    const jsonData = JSON.stringify(todos, null, 2);
    fs. writeFileSync('todos.json', jsonData);
    console.log(`Todo가 추가되었습니다: ${content}`);
}

if ( type == `list` && todos.length > 0 ) {
    todos.map((todo, index) => {
        const status = todo.isFinished ? `[x]` : `[ ]`;
        console.log(`${status} ${index + 1}. ${todo.content}`);
    })
} else if ( type == `list` ) {
    console.log('Todo가 없습니다.');
}

console.log("실행 완료!");

// console.table(todos);
