from django.test import TestCase, Client
from django.utils import timezone
from datetime import date, datetime


from .models import Person, Question, Answer
from django.urls import reverse

from django.contrib.auth.models import User
from quizsection.forms import QuestionForm, AnswerForm


class PersonTestCase(TestCase):
    def setUp(self):
        Person.objects.create(
            first_name="John", 
            last_name="Doe", 
            date_of_birth=date(2000, 1, 1), 
            phone_number=1234567890, 
            email="johndoe@example.com", 
            county="Some County", 
            gender="Male", 
            username="johndoe", 
            password="password123"
        )

    def test_age_under_18(self):
        john = Person.objects.get(username="johndoe")
        john.date_of_birth = date(2010, 1, 1)
        with self.assertRaises(ValueError):
            john.save()

    def test_age_over_18(self):
        john = Person.objects.get(username="johndoe")
        john.date_of_birth = date(1980, 1, 1)
        john.save()
        self.assertEqual(john.username, "johndoe")



class TestViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass123'
        )
        self.question = Question.objects.create(
            description='What is the capital of France?',
            author=self.user
        )
        self.answer = Answer.objects.create(
            description='Paris is the capital of France.',
            question=self.question,
            author=self.user
        )

    def test_register_view(self):
        response = self.client.get(reverse('register'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'quizsection/register.html')
        self.assertContains(response, '<h2>Create an Account</h2>')
        self.assertContains(response, '<label for="id_username">Username:</label>')
        self.assertContains(response, '<label for="id_email">Email:</label>')
        self.assertContains(response, '<label for="id_password1">Password:</label>')
        self.assertContains(response, '<label for="id_password2">Confirm Password:</label>')
        self.assertContains(response, '<input type="submit" value="Sign Up">')

    def test_login_view(self):
        response = self.client.get(reverse('login'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'quizsection/login.html')
        self.assertContains(response, '<h2>Log In</h2>')
        self.assertContains(response, '<label for="id_username">Username:</label>')
        self.assertContains(response, '<label for="id_password">Password:</label>')
        self.assertContains(response, '<input type="submit" value="Log In">')

    def test_home_view(self):
        self.client.login(username='testuser', password='testpass123')
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'quizsection/home.html')
        self.assertContains(response, '<h2>Welcome to the Quiz Section!</h2>')
        self.assertContains(response, '<p>You are logged in as testuser.</p>')
        self.assertContains(response, '<a href="/logout/">Logout</a>')

    def test_post_question_view(self):
        self.client.login(username='testuser', password='testpass123')
        form_data = {
            'description': 'What is the capital of Italy?',
        }
        response = self.client.post(reverse('post_question'), form_data)
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {'success': True, 'message': 'Question posted successfully.'})
        self.assertEqual(Question.objects.count(), 2)
        self.assertEqual(Question.objects.last().description, 'What is the capital of Italy?')

    def test_get_questions_view(self):
        response = self.client.get(reverse('get_questions'))
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {'success': True, 'data': [{
            'id': self.question.id,
            'description': 'What is the capital of France?',
            'author': 'testuser',
            'answers': [{
                'id': self.answer.id,
                'description': 'Paris is the capital of France.',
                'author': 'testuser'
            }]
        }]})

