"""Django's command-line utility for administrative tasks."""
import os
import sys

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Não foi possível importar o Django. Você tem certeza que ele está instalado "
            "e que você ativou o seu ambiente virtual (venv)?"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()