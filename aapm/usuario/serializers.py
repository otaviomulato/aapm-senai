from rest_framework import serializers
from .models import Modalidade, Aluno # Make sure these imports are correct

class ModalidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modalidade
        fields = '__all__'

class AlunoSerializer(serializers.ModelSerializer):
    modalidade = ModalidadeSerializer(read_only=True)
    modalidade_id = serializers.PrimaryKeyRelatedField(queryset=Modalidade.objects.all(), source='modalidade', write_only=True)

    class Meta:
        model = Aluno
        fields = '__all__'