from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(course1, course2):
    ratings = [[course1.rating, course1.reviews], [course2.rating, course2.reviews]]
    sim = cosine_similarity(ratings)
    return sim[0][1]
