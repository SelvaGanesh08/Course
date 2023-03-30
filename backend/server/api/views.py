from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
import csv
from django.db.models import Q
from .models import Course
from sklearn.ensemble import RandomForestRegressor
import pandas as pd
import psycopg2
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import CustomUserSerializer

class RegistrationView(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = CustomUser.objects.filter(email=email).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


def udemy_load_courses(request):
    with open(r'C:\Users\Ganork\Desktop\Course\backend\server\api\data\Course_info.csv','r',encoding='latin-1') as f:
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
    with open(r'C:\Users\Ganork\Desktop\Course\backend\server\api\data\coursera1.csv','r',encoding='latin-1') as f:
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

def recommend_courses(request):
    # Get user query from request object
    query = request.GET.get('q')

   # Retrieve courses similar to user query from database
    courses = Course.objects.filter(title__icontains=query)

    # Train random forest model on all courses in the database
    all_courses = Course.objects.all()
    all_courses_df = pd.DataFrame(list(all_courses.values('rating', 'reviews')))
    X_train = all_courses_df[['rating', 'reviews']]
    y_train = all_courses_df['reviews']
    rf = RandomForestRegressor()
    rf.fit(X_train, y_train)

    # Make predictions on all courses in the database
    courses_df = pd.DataFrame(list(courses.values('rating', 'reviews')))
    X_test = courses_df[['rating', 'reviews']]
    predictions = rf.predict(X_test)
    courses_df['prediction'] = predictions

    # Rank courses by predicted score and return top 10
    ranked_courses = courses_df.sort_values('prediction', ascending=False)[:9]

    # Convert ranked courses to JSON format and return
    courses_list = []
    for index, row in ranked_courses.iterrows():
        course = {}
        course['id'] = courses[index].id
        course['title'] = courses[index].title
        course['rating'] = courses[index].rating
        course['reviews'] = courses[index].reviews
        course['url'] = courses[index].url
        courses_list.append(course)

    return JsonResponse({'courses': courses_list})


