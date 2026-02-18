FROM python:3.12-slim

WORKDIR /app

COPY backend/requiriments.txt .

RUN pip install --no-cache-dir -r requiriments.txt

COPY backend/ .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
