from django.urls import path
from . import views
from .views import RegistrationView,LoginView

urlpatterns=[
    path('udemy',views.udemy_load_courses, name="udemy"),
    path('coursera',views.cousera_load_courses,name="coursera"),
    path('search/',views.recommend_courses,name="search"),
    path('register', RegistrationView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
]