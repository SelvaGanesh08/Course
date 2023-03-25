from django.urls import path
from . import views

urlpatterns=[
    path('udemy',views.udemy_load_courses, name="udemy"),
    path('coursera',views.cousera_load_courses,name="coursera"),
    path('recomend/',views.recommend_courses,name="recomend"),
]