from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')

    if not name or not email or not password:
        return Response({'error': 'Por favor, preencha todos os campos.'}, status=400)
    
    if User.objects.filter(username=email).exists():
        return Response({'error': 'Este e-mail já está cadastrado.'}, status=400)

    try:
        user = User.objects.create_user(username=email, email=email, password=password, first_name=name)
        return Response({'message': 'Usuário cadastrado com sucesso!'}, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(username=email, password=password)

    if user is not None:
        login(request, user)
        return Response({
            "message": "Bem-vindo de volta!",
            "user": {
                "id": user.id, 
                "username": user.username, 
                "name": user.first_name
            }
        })
    return Response({"error": "E-mail ou senha incorretos."}, status=400)