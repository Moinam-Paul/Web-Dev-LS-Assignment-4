from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Tweet
from .serializers import TweetSerializer

class TweetViewSet(viewsets.ModelViewSet):
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Tweet.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)