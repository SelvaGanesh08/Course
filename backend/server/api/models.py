from django.db import models


class Course(models.Model):
    title = models.CharField(max_length=255)
    rating = models.FloatField()
    reviews = models.IntegerField()
    url = models.URLField(max_length=255)
    

    class Meta:
        db_table = 'courses'

    def __str__(self):
        return self.title

