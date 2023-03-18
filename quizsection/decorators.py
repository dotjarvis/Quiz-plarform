from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect

def login_required(view_func):
    def new_view_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return view_func(request, *args, **kwargs)
        else:
            return redirect('login')
    
    return new_view_func
