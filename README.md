Q: What is this? 

A: This is a simple to-do list that will create, update, read, and delete your todo. It was created using Node.js, PostgreSQL, and Docker on backend whereas on the frontend Jquery, HTML, CSS3, and frameworks such as Bootstrap and Font Awesome were utilized. 

Q: How do I run it? 

A: Here are the steps to run the todo application

To run the application: 

```bash
git clone https://github.com/hsaeed20/todo-exercise.git
cd todo-exercise 
docker-compose up --build 
```

After this is done, open http://localhost:4000 for the todo list and verify the frontend and API work.

Q: How do I stop it? 

A: To stop it there are two ways. 
 
```bash
docker-compose down 
```
- This stops the running containers but keeps your database data for next time.

Or 
```bash
docker-compose down --volumes --remove-orphans
```
 This stops and removes: 
 - Containers
 - Postgres database volume (your data)
 - Any leftover containers not defined in docker-compose.yml.
 
If you want to just stop the app and keep your data, use option 1 (recommended).

If you want a clean test, use option 2.
