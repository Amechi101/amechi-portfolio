from __future__ import unicode_literals 

from django.utils.translation import ugettext_lazy as _
from django.views.generic import ListView
from django.views.generic.detail import SingleObjectMixin
from photography.models import Photography, Photo


class PhotographyView(ListView):

	template_name = '_photography.html'
	
	model = Photography

	def get_context_data(self, **kwargs):
		context = super(PhotographyView, self).get_context_data(**kwargs)
		context['album_list'] = Photography.objects.all()
		
		return context

class PhotographyDetailView(SingleObjectMixin, ListView):
	
	template_name = 'photos/_photo.html'

	
	def get(self, request, *args, **kwargs):
		self.object = self.get_object(queryset=Photography.objects.all())

		return super(PhotographyDetailView, self).get(request, *args, **kwargs)

	def get_context_data(self, **kwargs):

		ctx = super(PhotographyDetailView, self).get_context_data(**kwargs)
		
		ctx['album_detail'] = self.object
		ctx['photo_list'] = Photo.objects.filter(photography=self.object)
		
		return ctx

	def get_queryset(self, **kwargs):
		return self.object



		