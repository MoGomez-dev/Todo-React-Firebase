import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export const Guest = ({unit, color}) => {
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState('');
    const [todoLimit, setTodoLimit] = useState('');
    const [now, setNow] = useState(0);

    // 現在の時刻を取得
    useEffect(() => {
        const d = new Date();
        setNow(d.getTime());
    },[])

    const onChangeText = (e) => {
        setTodoText(e.target.value);
    }

    const onChangeLimit = (e) => {
        setTodoLimit(e.target.value);
    }

    const onClickAdd = () => {
        let timestamp = 9999999999999;
        let displayTodoText = todoText;
        if(todoText.length > 24){
            displayTodoText = todoText.substring(0,24) + "...";
        }
        if(todoLimit){
            const date = new Date(todoLimit);
            timestamp = date.getTime();
        }
        const todo = {todo: displayTodoText, limit: todoLimit , timestamp: timestamp};
        const newTodos = [...todos, todo];
        newTodos.sort((a,b) => a.timestamp - b.timestamp);
        setTodos(newTodos);
        setTodoText('');
        setTodoLimit('');
    }

    const handleDelete = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    return (
        <div>
            <InputArea>
                ToDo:<input type='text' placeholder='*必須' value={todoText} onChange={onChangeText} />
                期限:<input type="datetime-local" step='600' min='2023-12-01T00:00' value={todoLimit} onChange={onChangeLimit} />
                <button onClick={onClickAdd} disabled={todoText == ''} >追加</button>
            </InputArea>
            <TodoArea>
                <h2>ToDo</h2>
                <ul>
                    {todos.map((todo, index) => (
                        <li key={index} >
                            <TodoElement color={todo.timestamp - now < 0 ? "red": todo.timestamp - now <= unit ? color : "white"}>
                                {todo.todo} <span>{todo.limit && `期限:${todo.limit}`}</span>
                                <button onClick={() => handleDelete(index)}>完了・削除</button>
                            </TodoElement>
                        </li>
                    ))}
                </ul>
            </TodoArea>
        </div>
      )
    }
    
    const InputArea = styled.div`
        padding: 30px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        font-size: 20px;
    
        input {
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 20px;
        }
    
        button {
            padding: 5px 10px;
            border-radius: 5px;
            background-color: #f1cfcf;
            font-size: 20px;
        }
    `
    
    const TodoArea = styled.div`
        height: 480px;
        width: 80%;
        margin: 0 auto;
        border: 2px solid;
        border-radius: 20px;
        background-color: rgb(60,100,80);
    
        h2 {
            text-align: center;
            font-size: 40px;
            margin: 15px 0;
            color: white;
        }
    
        ul li {
            padding: 5px 10px;
            font-size: 25px;
            font-weight: bold;
            margin-left: 50px;
            list-style: none;
            position: relative;
            padding-left: 1em;
    
            &:before {
              border-radius: 50%; 
              width: 10px; 
              height: 10px; 
              display: block;
              position: absolute; 
              left: 0; 
              top: 0.75em; 
              content: "";
              background: white; 
            }
    
            span {
              padding-left: 30px;
            }
    
            button {
              padding: 5px 10px;
              margin-left: 20px;
              font-size: 15px;
              background-color: #cbf5d6;
              border: 1px solid;
              border-radius: 5px; 
            }
        }
    `
    
    const TodoElement = styled.div`
      color: ${(props) => props.color};
    `
    