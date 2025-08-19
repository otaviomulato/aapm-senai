from django.urls import path
from . import views

urlpatterns = [
    path('modalidades/', views.ModalidadeList.as_view(), name='modalidade-list'),
    path('modalidades/<int:pk>/', views.ModalidadeDetail.as_view(), name='modalidade-detail'),
    path('alunos/', views.AlunoList.as_view(), name='aluno-list'),
    path('alunos/<int:pk>/', views.AlunoDetail.as_view(), name='aluno-detail'),
]