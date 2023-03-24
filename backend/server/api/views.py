from django.shortcuts import render
from django.http import JsonResponse
import csv
from django.shortcuts import render
from .models import Course

def load_courses(request):
    with open('path/to/courses.csv') as f:
        reader = csv.reader(f)
        next(reader) # Skip the header row
        for row in reader:
            title = row[0]
            rating = float(row[1])
            reviews = int(row[2])
            course = Course(title=title, rating=rating, reviews=reviews)
            course.save()

    return render(request, 'courses_loaded.html')




def recommend_courses(request, title):
    # Step 1: Get the input course by title
    try:
        input_course = Course.objects.get(title=title)
    except Course.DoesNotExist:
        return JsonResponse({'error': 'Course not found.'})

    # Step 2: Calculate the similarity scores
    ratings = Course.objects.values_list('rating', 'reviews')
    similarity_matrix = cosine_similarity(ratings)

    # Step 3: Get the indices of the courses similar to the input course
    input_index = input_course.pk - 1
    sim_scores = list(enumerate(similarity_matrix[input_index]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:6] # Get the top 5 similar courses

    # Step 4: Get the recommended courses
    course_indices = [x[0] for x in sim_scores]
    recommended_courses = Course.objects.filter(pk__in=course_indices)

    # Step 5: Return the recommended courses
    data = {
        'input_course': input_course.title,
        'recommended_courses': [c.title for c in recommended_courses]
    }
    return JsonResponse(data)

