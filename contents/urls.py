from __future__ import unicode_literals

from django.conf.urls import include, url
from django.views.generic import TemplateView

# from contents.views import TrackView, PhotographyView

urlpatterns = [
	url(r'^about/$', TemplateView.as_view(template_name="_about.html")),
	url(r'^projects/$', TemplateView.as_view(template_name="_projects.html")),
	# url(r'^photography/$', PhotographyView.as_view(), name="photography"),
	# url(r'^track/$', TrackView.as_view(), name="track"),
]


