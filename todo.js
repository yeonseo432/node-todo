const fs = require('fs');

console.log("저장 테스트 시작!");

const todos = [
    { id: 1, name: "설거지" },
    { id: 2, name: "빨래" }
];

const jsonData = JSON.stringify(todos, null, 2);

fs. writeFileSync('todos.json', jsonData);
console.log("저장 테스트 완료!");

console.log("출력 테스트 시작!");
const fileData = fs.readFileSync('todos.json', 'utf-8');

const parsedData = JSON.parse(fileData);

console.table(parsedData);
console.log("출력 테스트 완료!");