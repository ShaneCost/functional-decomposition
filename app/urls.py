from django.urls import path

from .views import LandingPageView, LevelZeroDesignPageView, PrintView

urlpatterns = [
    path("level_0_design/print", PrintView.as_view(), name='print'),
    path("level_0_design/", LevelZeroDesignPageView.as_view(), name="level_0_design"),
    path("", LandingPageView.as_view(), name="landing"),
]