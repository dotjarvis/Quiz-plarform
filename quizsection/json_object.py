from django.shortcuts import render
# from .models import Person
import json

from quizsection.models import Person

person_dict = Person.__dict__
json_data = json.dumps(person_dict)
