from __future__ import unicode_literals

from django.contrib import admin
from photography.models import Photography, Photo


# Admin
class PhotographyAdmin(admin.ModelAdmin):
	list_display = ["album_name"]
	search_fields = ["album_name"]
	list_per_page = 10


class PhotoAdmin(admin.ModelAdmin):
	list_display = ["photo_location"]
	search_fields = ["photo_location"]
	list_per_page = 10


# Register Models below
admin.site.register(Photography, PhotographyAdmin)
admin.site.register(Photo, PhotoAdmin)


