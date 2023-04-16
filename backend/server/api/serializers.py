from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser
from .models import Course
class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'name', 'password', 'password2')
        extra_kwargs = {
            'name': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(
            email=validated_data['email'],
            name=validated_data['name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    # Add 'is_favorited' field to the serializer
    is_favorited = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'rating', 'reviews', 'url', 'is_favorited']

    def get_is_favorited(self, obj):
        # Get user_id from request context
        user_id = self.context['request'].query_params.get('user_id')
        try:
            # Get user object from user_id
            user = CustomUser.objects.get(id=user_id)
            # Check if course is in user's favorite courses
            return obj in user.favorite_courses.all()
        except CustomUser.DoesNotExist:
            return False
