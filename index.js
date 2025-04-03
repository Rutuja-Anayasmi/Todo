import express from 'express';
import pg from 'pg';

const app = express();

const PORT = 3000 ;

const { Pool } = pg;
const pool = new Pool({
    host:"localhost",
    port:5432,
    database:"Todo",
    password:"Yvgx@5678",
    user:"postgres",
});

app.use(express.json()); 

pool.connect().then(console.log("connected"));

app.get('/', (req,res) => {
    res.send("This is home page");
});

//read the records from table

app.get("/todo" , async(req,res) => {
    const sqlQuery = "SELECT * from todo_list";
    const todo = await pool.query(sqlQuery);
    console.log(todo.rows);
    res.json({message:"All Todo List"});
})


//creating new records : todo_list (title : varchar, descrption:varchar )

app.post("/todocreate" , async(req,res) => {
    const newTodo = req.body;
    // console.log({newTodo});
    const sqlQuery = `INSERT into todo_list (title,description) values ('${newTodo.title}','${newTodo.description}')`;
    await pool.query(sqlQuery);
    res.json({message:"creating new Todo item"});
})

app.get("/todo/:id" , async(req,res) => {
    const Todoid = req.params.id;
    const sqlQuery = `SELECT * from todo_list where id = '${Todoid}'`;
    const TodoItem = await pool.query(sqlQuery);
    console.log(TodoItem.rows);
    res.json({message:"View a particular todo item"});
})

//delete record 

app.delete("/todo/:id" , async(req,res) => {
    const Todoid = req.params.id;
    const sqlQuery = `DELETE from todo_list where  id= '${Todoid}'`;
    await pool.query(sqlQuery);
    res.json({message:"delete Todo item "});
})

//update record : update title where id=3

app.post("/todo/update/:id" , async(req,res) => {
    const Todoid = req.params.id;
    const newTodo = req.body;
    const sqlQuery = `UPDATE todo_list SET title = '${newTodo.title}' where  id= '${Todoid}'`;
    await pool.query(sqlQuery);
    res.json({message:"update Todo item "});
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

