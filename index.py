
from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Database connection
def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            database="todolist",
            user="root",
            
        )
        return conn
    except Error as e:
        print("Error while connecting to database:", e)
        return None

# Insert a new task
@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    id =  data.get('id')
    title = data.get('title')
    description = data.get('description')
   
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tasks (id,title, description) VALUES (%s,%s, %s)", (id,title, description))
    conn.commit()
    
    cursor.close()
    conn.close()
    
    return jsonify({"message": "Task added successfully"}), 201

# Retrieve all tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return jsonify(tasks), 200

# Update a task
@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.json
    title = data.get('title')
    description = data.get('description')
    completed = data.get('completed')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE tasks 
        SET title = %s, description = %s, completed = %s 
        WHERE id = %s
    """, (title, description, completed, id))
    conn.commit()
    
    cursor.close()
    conn.close()
    
    return jsonify({"message": "Task updated successfully"}), 200

# Delete a task
@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = %s", (id,))
    conn.commit()
    
    cursor.close()
    conn.close()
    
    return jsonify({"message": "Task deleted successfully"}), 200

# Search for tasks by title
@app.route('/tasks/search', methods=['GET'])
def search_tasks():
    title_query = request.args.get('title')
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM tasks WHERE title LIKE %s"
    cursor.execute(query, ("%" + title_query + "%",))
    tasks = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return jsonify(tasks), 200

if __name__ == '__main__':
    app.run(debug=True)
