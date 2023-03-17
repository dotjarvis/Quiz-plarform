from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms


from django.core.exceptions import ValidationError
from django.utils import timezone


from .models import *


class PersonForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = Person
        fields = '__all__'
        exclude = ['date_created', 'user']

    def clean_date_of_birth(self):
        date_of_birth = self.cleaned_data['date_of_birth']
        today = timezone.now().date()
        age = today.year - date_of_birth.year - \
            ((today.month, today.day) < (date_of_birth.month, date_of_birth.day))
        if age < 18:
            raise ValidationError(
                "You must be at least 18 years old to register.")
        return date_of_birth

    def save(self, commit=True):
        person = super().save(commit=False)
        user = User.objects.create_user(
            username=self.cleaned_data['username'],
            email=self.cleaned_data['email'],
            password=self.cleaned_data['password']
        )
        person.user = user
        if commit:
            person.save()
        return person


class QuestionForm(forms.ModelForm):
    description = forms.CharField(
        label='Question',
        widget=forms.Textarea(attrs={
            'placeholder': 'What is your question?',
            'rows': 4,
            'class': 'form-control'
        })
    )

    class Meta:
        model = Question
        fields = ('description',)


class AnswerForm(forms.ModelForm):
    class Meta:
        model = Answer
        fields = ['description']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Type your answer here...'})
        }
