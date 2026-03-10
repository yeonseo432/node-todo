const fs = require(`fs`);
const db = require(`./database`)

const todos = db.loadData(`todos.json`);
const id = db.loadData(`id.json`);

// type: add, list, done, update, delete, clear와 같은 명령어
const type = process.argv[2];
// content: 추가할 항목의 내용, 완료할 항목의 id 등등 다양한 내용
const content = process.argv[3];

// 1. add "새로운 할 일" : 할 일 추가하기
if ( type == `add` ) {
    todos.push({ id: id, content: content, done: false });
    db.saveData(`todos.json`, todos);

    // id를 1 더해서 다시 저장
    fs. writeFileSync(`id.json`, JSON.stringify(id+1));
    console.log(`Todo가 추가되었습니다: ${content}`);
}

// 2. list : 모든 할 일 보여주기
if ( type == `list` ) {
    if ( todos.length > 0 ) {
        todos.map((todo, index) => {
            // todo.done 값이 true라면 [x] 반환, false라면 [ ]를 반환
            const status = todo.done ? `[x]` : `[ ]`;
            console.log(`${status} ${todo.id}. ${todo.content}`);
        })
    } else if ( todos.length == 0 ) {
        console.log(`Todo가 없습니다.`);
    }
}

// 3. done [id] : 해당 id의 할 일 완료하기
if ( type == `done` ) {
    // `===` 이 기호는 값 뿐만 아니라 형식도 모두 똑같아야 ture를 반환
    // 그래서 터미널로 입력된 문자열을 Number를 이용해 숫자로 변환
    const doneTodo = todos.find(todo => todo.id === Number(content));

    if(doneTodo) {
        if (doneTodo.done === false) {
            doneTodo.done = true;

            // js에서 리스트는 객체를 참조
            // 객체만 잘 수정하면 리스트에 자동으로 반영됨.
            db.saveData(`todos.json`, todos);
            console.log(`id ${content}번 항목이 완료되었습니다.`);
        } else if ( doneTodo.done === true ) {
            console.log(`이미 완료된 항목입니다.`);
        }
    } else {
        console.log(`해당 id를 찾을 수 없습니다.`);
    }
}

// 4. update [id] "바뀐 할 일" : 해당 id의 할 일 내용 변경하기
if ( type == `update` ) {
    const updatedTodo = todos.find(todo => todo.id === Number(content));

    if(updatedTodo) {
        // update의 경우에는 터미널 입력에서 인자를 하나 더 받아야 함.
        const newContent = process.argv[4];
        updatedTodo.content = newContent;
        db.saveData(`todos.json`, todos);
        console.log(`id ${content}번 항목이 수정되었습니다: ${newContent}`);
    } else {
        console.log(`해당 id를 찾을 수 없습니다.`);
    }
}

// 5. delete [id] : 해당 id의 할 일 지우기
if ( type == `delete` ) {
    // deletedTodo 객체를 직접 사용하진 않지만 존재성을 보장하기 위해서 done, update와 비슷한 방법 사용.
    const deletedTodo = todos.find(todo => todo.id === Number(content));

    if(deletedTodo) {
        // filter를 이용해 지울 항목만 빼고 나머지를 이용해 새로운 filteredTodos를 만듦.
        const filteredTodos = todos.filter(todo => todo.id !== Number(content))
        db.saveData(`todos.json`, filteredTodos);
        console.log(`id ${content}번 항목이 삭제되었습니다.`);
    } else {
        console.log(`해당 id를 찾을 수 없습니다.`);
    }
}

// 6. clear : 모든 할 일 목록 지우고 id 1로 초기화하기
// 구현 요구사항은 아니었지만 테스트할 때 편리할 것 같아서 임의로 추가
if ( type == `clear` ) {
    // todos.json에 빈 리스트 저장
    db.saveData(`todos.json`, []);
    // id.json에 1 저장
    fs. writeFileSync(`id.json`, JSON.stringify(1));
    console.log(`초기화되었습니다.`);
}