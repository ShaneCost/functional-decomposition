from django.urls import path

from .views import LandingPageView, LevelZeroDesignPageView, PrintView, save_data, LevelOneDesignPageView

urlpatterns = [
    path("level_1_design/", LevelOneDesignPageView.as_view(), name="level_1_design"),
    path("save_data/", save_data, name='save_data'),
    path("level_0_design/print", PrintView.as_view(), name='print'),
    path("level_0_design/", LevelZeroDesignPageView.as_view(), name="level_0_design"),
    path("", LandingPageView.as_view(), name="landing"),
]