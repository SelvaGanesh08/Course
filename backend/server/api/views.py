from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
import csv
from .models import Course
from sklearn.ensemble import RandomForestRegressor
import pandas as pd
from .models import CustomUser
from .serializers import CustomUserSerializer
from .serializers import CourseSerializer
import jwt
from datetime import datetime, timedelta
from django.conf import settings

class RegistrationView(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh_token = self.generate_refresh_token(user)
            access_token = self.generate_access_token(user)
            return Response({
                'refresh': refresh_token,
                'access': access_token,
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def generate_refresh_token(self, user):
        refresh_token_payload = {
            'user_id': user.id,
            'user_name':user.name,
            'exp': datetime.utcnow() + timedelta(days=1),  # Set expiration time for refresh token
        }
        refresh_token = jwt.encode(refresh_token_payload, settings.SECRET_KEY, algorithm='HS256')
        return refresh_token

    def generate_access_token(self, user):
        access_token_payload = {
            'user_id': user.id,
            'user_name':user.name,
            'exp': datetime.utcnow() + timedelta(hours=1000),  # Set expiration time for access token
        }
        access_token = jwt.encode(access_token_payload, settings.SECRET_KEY, algorithm='HS256')
        return access_token

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = CustomUser.objects.filter(email=email).first()
        if user and user.check_password(password):
            refresh_token = self.generate_refresh_token(user)
            access_token = self.generate_access_token(user)
            return Response({
                'refresh': refresh_token,
                'access': access_token,
            })
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    def generate_refresh_token(self, user):
        refresh_token_payload = {
            'user_id': user.id,
            'user_name':user.name,
            'exp': datetime.utcnow() + timedelta(days=1),  # Set expiration time for refresh token
        }
        refresh_token = jwt.encode(refresh_token_payload, settings.SECRET_KEY, algorithm='HS256')
        return refresh_token

    def generate_access_token(self, user):
        access_token_payload = {
            'user_id': user.id,
            'user_name':user.name,
            'exp': datetime.utcnow() + timedelta(hours=100),  # Set expiration time for access token
        }
        access_token = jwt.encode(access_token_payload, settings.SECRET_KEY, algorithm='HS256')
        return access_token


class AddToFavoritesView(APIView):
    def post(self, request):
        course_id = request.data.get('course_id')
        user_id = request.data.get('user_id')
        print(user_id )
        try:
            course = Course.objects.get(id=course_id)
            user = CustomUser.objects.get(id=user_id)
            if course in user.favorite_courses.all():
                user.favorite_courses.remove(course)
                return Response({'detail': 'Course removed from favorites.'}, status=status.HTTP_200_OK)
            else:
                user.favorite_courses.add(course)
                return Response({'detail': 'Course added to favorites.'}, status=status.HTTP_200_OK)
        except Course.DoesNotExist:
            return Response({'detail': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)


class FavoriteCoursesView(APIView):
    def get(self, request):
        user_id = request.query_params.get('user_id') 
        print(user_id)
        try:
            user = CustomUser.objects.get(id=user_id)
            favorite_courses = user.favorite_courses.all()
            # Serialize and return the favorite courses data as JSON
            serialized_favorite_courses = CourseSerializer(favorite_courses, many=True, context={'request': request})
            favorite_courses_data = serialized_favorite_courses.data
            return Response({'favorite_courses': favorite_courses_data}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        
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
    user_id = request.GET.get('user_id')
    print(user_id)
    if(user_id):
        user = CustomUser.objects.get(id=user_id)
        courses_list = []
        for index, row in ranked_courses.iterrows():
            course = {}
            course['id'] = courses[index].id
            course['title'] = courses[index].title
            course['rating'] = courses[index].rating
            course['reviews'] = courses[index].reviews
            course['url'] = courses[index].url
            course['is_favorited'] =  user.favorite_courses.filter(id=courses[index].id).exists() if user else False
            courses_list.append(course)
    else:
        courses_list = []
        for index, row in ranked_courses.iterrows():
            course = {}
            course['id'] = courses[index].id
            course['title'] = courses[index].title
            course['rating'] = courses[index].rating
            course['reviews'] = courses[index].reviews
            course['url'] = courses[index].url
            courses_list.append(course)
    

    response_data = {'courses': courses_list}
    response = Response(response_data)
    response['Access-Control-Allow-Origin'] = 'https://coursecuer.netlify.app'
    return response


