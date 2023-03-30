from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
import csv
from django.db.models import Q
from .models import Course
from sklearn.ensemble import RandomForestRegressor
import pandas as pd
import psycopg2

def udemy_load_courses(request):
    with open(r'C:\Users\Students\Desktop\Course\backend\server\api\data\Course_info.csv','r',encoding='latin-1') as f:
        reader = csv.reader(f)
        next(reader) 
        for row in reader:
            title = row[0]
            rating = float(row[1])
            reviews = int(row[2])
            url ='https://www.udemy.com'+row[3]
            course = Course(title=title, rating=rating, reviews=reviews,url = url)
            course.save()

    return HttpResponse(row)

def cousera_load_courses(request):
    with open(r'C:\Users\Students\Desktop\Course\backend\server\api\data\coursera1.csv','r',encoding='latin-1') as f:
        reader = csv.reader(f)
        next(reader) 
        for row in reader:
            if row[0]!='' and row[1]!='' and  row[2]!='' and row[2]!='':
                title = row[0]
                rating = float(row[1])
                reviews = int(row[2]) 
                url = row[3]
                course = Course(title=title, rating=rating, reviews=reviews,url=url)
                course.save()
            else:
                None
    return HttpResponse(row)

# def recommend_courses(request):
    course_title = request.GET.get('q')
    # Get the course object for the given title
    course = Course.objects.filter(Q(title__icontains=course_title)).values().first()

   
    # Find courses that are similar to the given course
    similar_courses = Course.objects.filter(
        ~Q(title__icontains=course_title),  # Exclude the original course
        rating__gte=course.get('rating') - 0.5,
        rating__lte=course.get('rating') + 0.5,
        reviews__gte=course.get('reviews') - 50,
        reviews__lte=course.get('reviews') + 50
    ).values()

    # Calculate the similarity score for each similar course
    recommendations = []
    for similar_course in similar_courses:
        similarity = 0
        if similar_course.get('rating') == course.get('rating'):
            similarity += 1
        if abs(similar_course.get('reviews') - course.get('reviews')) <= 50:
            similarity += 1
        print(similarity)

    # Sort the recommendations by similarity score
    recommendations = sorted(recommendations, key=lambda x: x.similarity, reverse=True)

    # Render the template with the recommendations
    return HttpResponse(recommendations)


# def recommend_courses(request):
    query = request.GET.get('q')
    courses = Course.objects.filter(
        Q(title__icontains=query) |
        Q(url__icontains=query)
    ).order_by('-rating', '-reviews')
    course_list = list(courses.values())  # Convert QuerySet to list of dictionaries
    return JsonResponse( course_list,safe=False)

def recommend_courses(request):
    # Get user query from request object
    query = request.GET.get('q')

    # Connect to PostgreSQL database
    conn = psycopg2.connect(database="CourseCuer", user="postgres", password="root", host="localhost", port="5432")
    cur = conn.cursor()

    # Retrieve courses similar to user query from database
    cur.execute("SELECT * FROM courses WHERE title ILIKE %s", ('%' + query + '%',))
    courses = cur.fetchall()

    # Convert courses to pandas dataframe
    courses_df = pd.DataFrame(courses, columns=['id', 'title', 'rating', 'reviews', 'url'])

    # Train random forest model on all courses in the database
    cur.execute("SELECT * FROM courses")
    all_courses = cur.fetchall()
    all_courses_df = pd.DataFrame(all_courses, columns=['id', 'title', 'rating', 'reviews', 'url'])
    X_train = all_courses_df[['rating', 'reviews']]
    y_train = all_courses_df['reviews']
    rf = RandomForestRegressor()
    rf.fit(X_train, y_train)

    # Make predictions on all courses in the database
    X_test = courses_df[['rating', 'reviews']]
    predictions = rf.predict(X_test)
    courses_df['prediction'] = predictions

    # Rank courses by predicted score and return top 10
    ranked_courses = courses_df.sort_values('prediction', ascending=False)[:9]

    # Convert ranked courses to JSON format and return
    courses_list = []
    for index, row in ranked_courses.iterrows():
        course = {}
        course['id'] = row['id']
        course['title'] = row['title']
        course['rating'] = row['rating']
        course['reviews'] = row['reviews']
        course['url'] = row['url']
        courses_list.append(course)

    return JsonResponse({'courses': courses_list})
