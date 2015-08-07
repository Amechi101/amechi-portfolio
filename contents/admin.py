from __future__ import unicode_literals

from django.contrib import admin
from contents.models import Project, Role, Technologies, Track


# Inline 
class RoleInline(admin.StackedInline):
    model = Role.project_role.through

class TechnologiesInline(admin.StackedInline):
    model = Technologies.project_tech.through


# Admin
class ProjectAdmin(admin.ModelAdmin):
	list_display = ["project_name"]
	search_fields = ["project_name"]
	list_per_page = 25

	inlines = [
        RoleInline,
        TechnologiesInline,
    ]

class RoleAdmin(admin.ModelAdmin):
	list_display = ("get_parents", "role")

class TechnologiesAdmin(admin.ModelAdmin):
	list_display = ("get_parents", "technologies")


class TrackAdmin(admin.ModelAdmin):
	list_per_page = 10

# Register Models below
admin.site.register(Project, ProjectAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(Technologies, TechnologiesAdmin)
admin.site.register(Track, TrackAdmin)

