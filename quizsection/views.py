from .forms import QuestionForm
from .models import Question, Answer

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib import messages
from django.http import HttpResponse

from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404

from .decorators import login_required


from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout, authenticate


from quizsection.forms import *

# Create your views here.


def registerPage(request):
    if request.method == 'POST':
        form = PersonForm(request.POST)
        if form.is_valid():
            # Save the form data
            user = form.save()
            username = form.cleaned_data.get('username')

            # messages.success(request, 'Account was created for ' + username)
            return redirect('login')
    else:
        form = PersonForm()

    context = {'form': form}
    return render(request, 'quizsection/register.html', context)


def loginPage(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')
    else:
        form = AuthenticationForm()

    context = {'form': form}

    return render(request, 'quizsection/login.html', context)


@login_required
def home(request):

    return render(request, 'quizsection/home.html')


def logoutUser(request):
    logout(request)
    return redirect('login')


@csrf_exempt
@login_required
def post_question(request):
    # Post a question
    if request.method == 'POST':
        form = QuestionForm(request.POST)
        if form.is_valid():
            question = form.save(commit=False)
            question.person = request.user
            question.save()
            return JsonResponse({'success': True, 'message': 'Question posted successfully.'})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid form submission.'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method.'})


@csrf_exempt
def get_questions(request):
    # all questions
    if request.method == 'GET':
        questions = Question.objects.all()
        data = []
        for question in questions:
            answers = Answer.objects.filter(question=question)
            data.append({
                'id': question.id,
                'description': question.description,
                'person': question.person.username,
                'answers': [{'id': answer.id, 'description': answer.description, 'person': answer.person.username} for answer in answers]
            })
        return JsonResponse({'success': True, 'data': data})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method.'})


@csrf_exempt
def get_question(request, question_id):
    # One specific question
    try:
        question = Question.objects.get(id=question_id)
        answers = Answer.objects.filter(question=question)
        data = {
            'id': question.id,
            'description': question.description,
            'person': question.person,
            'answers': [{'id': answer.id, 'description': answer.description, 'person': answer.person.user.userusername} for answer in answers]
        }
        return JsonResponse({'success': True, 'data': data})
    except Question.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Question does not exist.'})
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)})


@login_required
@csrf_exempt
def delete_question(request, question_id):
    question = get_object_or_404(Question, id=question_id)

    if question.person != request.user:
        return JsonResponse({'success': False, 'message': 'You are not authorized to delete this question.'})

    question.delete()

    return JsonResponse({'success': True, 'message': 'Question deleted successfully.'})


@login_required
def post_answer(request, question_id):
    # get the question object
    question = get_object_or_404(Question, pk=question_id)

    if request.method == 'POST':
        # create a new AnswerForm with the POST data
        form = AnswerForm(request.POST)

        if form.is_valid():
            # create a new answer object with the form data
            answer = form.save(commit=False)
            answer.question = question
            answer.person = request.user
            answer.save()

            # return a success response
            return JsonResponse({'success': True, 'message': 'Answer posted successfully.'})
        else:
            # return a validation error response
            return JsonResponse({'success': False, 'message': 'Invalid form data.'})

    else:
        # return an error response for invalid request method
        return JsonResponse({'success': False, 'message': 'Invalid request method.'})


@csrf_exempt
@login_required
def update_answer(request, questionId, answerId):
    try:
        answer = Answer.objects.get(id=answerId, question_id=questionId)
    except Answer.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Answer not found.'}, status=404)

    if request.method == 'PUT':
        if answer.person != request.user.person:
            return JsonResponse({'success': False, 'message': 'You are not authorized to update this answer.'}, status=401)

        form = AnswerForm(request.POST, instance=answer)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True, 'message': 'Answer updated successfully.'})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid input data.'}, status=400)

    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=405)


@csrf_exempt
@login_required
def delete_answer(request, question_id, answer_id):
    answer = get_object_or_404(
        Answer, id=answer_id, question_id=question_id, person=request.user.person)

    if request.method == 'DELETE':
        answer.delete()
        return JsonResponse({'success': True, 'message': 'Answer deleted successfully'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method.'})
