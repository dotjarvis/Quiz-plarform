from django.utils import timezone
from datetime import date, datetime
from django.db import models

from django.contrib.auth.models import User

# Create your models here.


class Person(models.Model):
    GENDER = (
        ("Male", "Male"),
        ("Female", "Female"),
        ("Prefer not to say", "Prefer not to say"),
    )
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30, null=True)
    last_name = models.CharField(max_length=30, null=True)
    date_of_birth = models.DateField(null=True)
    phone_number = models.IntegerField()
    email = models.CharField(max_length=50, unique=True)
    county = models.CharField(max_length=30, null=True)
    gender = models.CharField(max_length=200, choices=GENDER)
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=50)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        today = date.today()
        age = today.year - self.date_of_birth.year - \
            ((today.month, today.day) <
             (self.date_of_birth.month, self.date_of_birth.day))
        if age < 18:
            raise ValueError("You must be at least 18 years old to register.")
        super().save(*args, **kwargs)


class Question(models.Model):
    person = models.ForeignKey(Person, null=True, on_delete=models.SET_NULL)
    description = models.TextField(max_length=400)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description



class Answer(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name='answers')
    person = models.ForeignKey(
        Person, on_delete=models.CASCADE, related_name='answers')
    description = models.TextField(max_length=200)
    date_ans = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description
