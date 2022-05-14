from django.urls import path
from app1 import views

urlpatterns = [
    path('home/', views.index, name='index'),
    path('handle_crud_actions/', views.handle_crud_actions, name='handle_crud_actions'),
    path('loader/', views.loader, name='loader'),
]
