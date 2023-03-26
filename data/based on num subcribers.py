# views.py

from django.shortcuts import render
from sklearn.ensemble import RandomForestRegressor
import pandas as pd
import psycopg2

def course_recommendations(request):
    # Get the user's search query from the request
    query = request.GET.get('q', '')
    
    # Connect to the Postgres database
    conn = psycopg2.connect(database="your_database_name", user="your_username", password="your_password", host="your_host", port="your_port")
    
    # Get all the courses from the database
    courses_df = pd.read_sql_query("SELECT * FROM courses", conn)
    
    # Initialize the random forest model
    rf = RandomForestRegressor(n_estimators=100, random_state=42)
    
    # Fit the model on the course data
    X = courses_df[['rating', 'subscribers']]
    y = courses_df['id']
    rf.fit(X, y)
    
    # Use the model to predict the rankings for the user's query
    query_courses = courses_df[courses_df['title'].str.contains(query)]
    X_query = query_courses[['rating', 'subscribers']]
    query_courses['rank'] = rf.predict(X_query)
    ranked_courses = query_courses.sort_values('rank', ascending=False)
    
    # Pass the ranked courses to the template for display
    context = {'courses': ranked_courses}
    return render(request, 'recommendations.html', context)
