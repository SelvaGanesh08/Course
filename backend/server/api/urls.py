from django.urls import path
from . import views
from .views import RegistrationView,LoginView,AddToFavoritesView,FavoriteCoursesView


urlpatterns=[
    path('udemy',views.udemy_load_courses, name="udemy"),
    path('coursera',views.cousera_load_courses,name="coursera"),
    path('search/',views.recommend_courses,name="search"),
    path('register', RegistrationView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('add-to-favorites/', AddToFavoritesView.as_view(), name='add_to_favorites'),
    path('favorite-courses/', FavoriteCoursesView.as_view(), name='favorite_courses'),
]