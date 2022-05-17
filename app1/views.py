import json
from logging import basicConfig, info, DEBUG

from django.contrib.auth.models import User
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import JsonResponse
from django.shortcuts import render
from django.template.loader import render_to_string
from django.views.decorators.csrf import csrf_exempt


# Create your views here.


def index(request):
    """
        This function is used to return  the all user objects list.
     """
    user_list = User.objects.all().order_by('id')
    page = request.GET.get('page', 1)
    paginator = Paginator(user_list, 4)
    try:
        users = paginator.page(page)

    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)

    return render(request, 'app1/index.html', {'users': users})


@csrf_exempt
def handle_crud_actions(request):
    """
        This function is used to handle ajax request for crud operation.
        """
    logging(request)
    response = {}
    flag = None
    if request.method == "GET":
        if request.GET.get("operation-type") == "get-operation":
            try:
                user_object = User.objects.get(id=request.GET.get("id"))
                result = json.dumps({'username': user_object.username,
                                     'firstname': user_object.first_name,
                                     'lastname': user_object.last_name,
                                     'email': user_object.email,
                                     })
                flag = True
            except:
                result = request.GET.get("id") + ' ' + 'Id does not exists!'
                flag = False
            response = {'result': result, 'flag': flag}
    elif request.method == "POST":
        if request.POST.get("operation-type") == "post-operation":
            try:
                user_object = User.objects.create_user(username=request.POST.get("username"),
                                                       first_name=request.POST.get("firstname"),
                                                       last_name=request.POST.get("lastname"),
                                                       email=request.POST.get("email"),
                                                       password=request.POST.get("password"))
                result = json.dumps({'username': user_object.username,
                                     'firstname': user_object.first_name,
                                     'lastname': user_object.last_name,
                                     'email': user_object.email,
                                     })
                flag = True
            except:
                result = 'username and password should be in correct format'
                flag = False
            response = {'result': result, 'flag': flag}
        elif request.POST.get("operation-type") == "put-operation":

            try:
                user_object = User.objects.get(id=request.POST.get("id"))
                user_object.username = request.POST.get("username")
                user_object.first_name = request.POST.get("firstname")
                user_object.last_name = request.POST.get("lastname")
                user_object.email = request.POST.get("email")
                user_object.save()
                result = json.dumps({'username': user_object.username,
                                     'firstname': user_object.first_name,
                                     'lastname': user_object.last_name,
                                     'email': user_object.email,
                                     })
            except:
                result = 'ID or Username does not match!'
            response = {'result': result}
        elif request.POST.get("operation-type") == "delete-operation":
            try:
                user_object = User.objects.get(id=request.POST.get("id"))
                user_object.delete()
                result = json.dumps({'output': 'id ' + request.POST.get("id") + ' ' + 'has been removed '
                                                                                      'successfully'})
                flag = True
            except:

                result = request.POST.get("id") + ' ' + 'Id does not exists!'
                flag = False
            response = {'result': result, 'flag': flag}

    return JsonResponse(response)


def loader(request):
    """
        This function is used to handle pagination ajax request.
    """
    response = {}
    # Next = False
    # Previous = False
    # next_value = None
    # previous_value = None
    user_list = User.objects.all().order_by('id')
    page = request.GET.get('page', 1)
    print('pageee',page)
    paginator = Paginator(user_list, 4)
    # testing code start
    users = paginator.page(page)
    context = {'users': users}
    x = render_to_string('app1/test.html', context)
    # print(x)
    response = {'x': x}
    # testing code end
    # try:
    #     users = list(paginator.page(page).object_list.values('id', 'username', 'email', 'first_name', 'last_name'))
    #     if paginator.page(page).has_next():
    #         Next = True
    #         next_value = paginator.page(page).next_page_number()
    #     if paginator.page(page).has_previous():
    #         Previous = True
    #         previous_value = paginator.page(page).previous_page_number()
    # except PageNotAnInteger:
    #     users = paginator.page(1)
    # except EmptyPage:
    #     users = paginator.page(paginator.num_pages)
    # response = {'users': users, 'Next': Next, 'Previous': Previous, 'next_value': next_value,
    #             'previous_value': previous_value}
    return JsonResponse(response)


def show_logs(request):
    """
    This function extract log information from log_files.log and render
    log information to the template.
    :param request: object to pass the state. When page/url is requested by user
    """
    file1 = open('request_log.log', 'r')
    log_value = file1.readlines()
    return render(request, 'app1/log.html', {'log': log_value})


def logging(logs):
    """
    This function creates log files.
    """
    LOG_FORMAT = '%(asctime)s  //  %(message)s  //  %(lineno)d'
    basicConfig(filename='request_log.log', level=DEBUG, filemode='a', format=LOG_FORMAT)
    info('' + str(logs))
