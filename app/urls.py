from django.urls import path

from .views import LandingPageView, LevelZeroDesignPageView

urlpatterns = [
    path("level_0_design/", LevelZeroDesignPageView.as_view(), name="level_0_design"),
    path("", LandingPageView.as_view(), name="landing"),
]