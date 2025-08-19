from django.db import models

class Modalidade(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome
    
class Aluno(models.Model):
    nome = models.CharField(max_length=100)
    turma = models.CharField(max_length=100)
    telefone = models.CharField(max_length=20)
    email = models.CharField(max_length=100)
    modalidade = models.ForeignKey(Modalidade, related_name='usuario', on_delete=models.CASCADE)
    socio = models.BooleanField(default=False)
    faz_parte_do_time = models.BooleanField(default=False)
    nome_do_time = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.nome