import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import styled from 'styled-components'

export const User = ({unit, color}) => {
  const [todos, setTodos] = useState([]);
  const [sortedTodos, setSortedTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [todoLimit, setTodoLimit] = useState('');
  const [now, setNow] = useState(0);

  useEffect(() => {
    // Firebaseからデータを取得
    const getData = async () => {
      const data = await getDocs(collection(db, "data"));
      setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter((data) => data.user === auth.currentUser.uid));
    }
    getData();
    // 現在の時刻を取得
    const d = new Date();
    setNow(d.getTime());
    // Firestoreのリアルタイムアップデート
    onSnapshot(collection(db, "data"), (doc) => {
      setTodos(doc.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter((data) => data.user === auth.currentUser.uid));
    })
  },[])

  useEffect(() => {
    // Todosの中身が変わるたびに時間順でソート
    const newTodos = [...todos]
    newTodos.sort((a,b) => a.timestamp - b.timestamp);
    setSortedTodos(newTodos);  
  },[todos])

  const onChangeText = (e) => {
    setTodoText(e.target.value);
  }

  const onChangeLimit = (e) => {
    setTodoLimit(e.target.value);
  }

  const onClickAdd = async () => {
    let timestamp = 9999999999999;
    if(todoText.length > 24){
      const newTodoText = todoText.substring(0,24) + "...";
      setTodoText(newTodoText);
    }
    if(todoLimit){
      const date = new Date(todoLimit);
      timestamp = date.getTime();
    }
    // Firestoreに追加
    await addDoc(collection(db, "data"), {todo: todoText, limit: todoLimit , timestamp: timestamp, user: auth.currentUser.uid});
    setTodoText('');
    setTodoLimit('');
  }

  const handleDelete = async (id, index) => {
    const newTodos = [...sortedTodos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    // Firestoreから削除
    await deleteDoc(doc(db, "data", id));
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
                {sortedTodos.map((todo, index) => (
                    <li key={todo.id} >
                        <TodoElement color={todo.timestamp - now < 0 ? "red": todo.timestamp - now <= unit ? color : "white"}>
                            {todo.todo} <span>{todo.limit && `期限:${todo.limit}`}</span>
                            <button onClick={() => handleDelete(todo.id, index)}>完了・削除</button>
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
