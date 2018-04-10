angular.module('templates-main', ['views/list.html', 'views/note/edit.html', 'views/note/view.html']);

angular.module('views/list.html', []).run(['$templateCache', function ($templateCache) {
  'use strict';
  $templateCache.put('views/list.html',
    '<div id="ownnote"><div class="view-container"><div class="view-left"><div id="controls"><div id="new" class="button indent" ng-click="newNote()">New</div><div id="newfile" class="newfile indent"><form id="createform" class="note-title-form"><input type="text" class="newfileinput" id="newfilename" value="note title" style="color: rgb(160, 160, 160)"><select id="groupname"><option value="">Not grouped</option><option value="_new">New group</option></select><input type="text" class="newgroupinput" id="newgroupname" placeholder="group title"> <button id="create" class="button">Create</button><div id="cancel" class="button">Cancel</div></form></div><div class="view-modes visible-lg"><div class="button view-mode-col" ng-class="{\'active\': app_config.user.view_mode ==\'col\'}"><i class="fa fa-columns"></i></div><div class="button view-mode-single" ng-class="{\'active\': app_config.user.view_mode ==\'single\'}"><i class="fa fa-arrows-h"></i></div></div></div><table class="listingSort"><thead><tr><th class="notename filesort notesort"><div class="pointer sorttitle" id="sortname" ng-click="list_sorting.what = \'name\'; list_sorting.reverse = !list_sorting.reverse; ">Name</div><div class="sortarrow" ng-show="list_sorting.what === \'name\'" ng-class="{\'sortup\': list_sorting.reverse, \'sortdown\': !list_sorting.reverse }"></div></th><th class="actions"></th><th class="info modified notesort"><span class="pointer" ng-click="list_sorting.what = \'mtime\'; list_sorting.reverse = !list_sorting.reverse; ">Modified</span><div class="sortarrow" ng-show="list_sorting.what === \'mtime\'" ng-class="{\'sortup\': list_sorting.reverse === true, \'sortdown\': !list_sorting.reverse }"></div></th></tr></thead><tbody><tr class="listing" ng-repeat="note in localNoteList | noteGroupFilter:noteGroupFilter | filter:list_filter | orderBy:list_sorting.what:list_sorting.reverse"><td title="{{ note.title }}" p="undefined" class="file pointer" ng-if="hasPermission(note, \'update\')" ng-click="editNote(note)"><div>{{note.title}}</div><div class="caption"><small>{{ note.content_plain.substr(0, 500) | htmlToPlaintext}}</small></div></td><td title="{{ note.title }}" p="undefined" class="file pointer" ng-if="!hasPermission(note, \'update\')" ng-click="viewNote(note)">{{ note.title }} <small>{{ note.content_plain.substr(0, 500) | htmlToPlaintext}}</small></td><td class="actions" ng-if="list_filter.deleted === 0"><div class=""><div id="note-{{ note.id }}-sdelete" class="buttons delete-note" ng-if="hasPermission(note, \'delete\')" ng-click="deleteNote(note)"><span tooltip="Delete note" class="pointer buttons delete"></span></div><div id="note-{{ note.id }}-edit" class="buttons edit-note" ng-if="hasPermission(note, \'update\')" ng-click="editNote(note)"><span class="pointer buttons edit" tooltip="Edit note"></span></div><div id="note-{{ note.id }}-share" class="share-note share pointer" ng-click="shareNote(note)"><a class="share" data-item-type="nextnote" data-item="{{ note.id }}" data-possible-permissions="{{ note.permissions }}" data-path="{{ note.id }}"><div class="buttons share shared share-note pointer" ng-if="(note.shared_with | objectKeysLength) > 0 && note.owner.uid === OC.currentUser">Shared</div><div class="buttons share shared share-note pointer" ng-if="(note.shared_with | objectKeysLength) > 0 && note.owner.uid !== OC.currentUser" tooltip="Shared with you by {{ note.owner.display_name }}">{{ note.owner.display_name }}</div><div id="note-{{ note.id }}" class="buttons share share-note pointer" tooltip="Share note" ng-if="note.shared_with.length === 0"></div></a></div></div></td><td class="actions" ng-if="list_filter.deleted === 1"><div id="note-{{ note.id }}-delete" class="buttons delete pointer" ng-if="hasPermission(note, \'delete\')" ng-click="deleteNote(note)"><span tooltip="Delete note" class="delete-note"></span></div><div id="note-{{ note.id }}-restore" class="buttons pointer restore-note" ng-if="hasPermission(note, \'delete\')" tooltip="Restore note" ng-click="resotoreNote(note)"></div></td><td class="info"><div class="modified"><span tooltip="{{ note.mtime | date:dateFormatLong}}">{{ note.mtime | timeAgo}}</span></div></td></tr></tbody></table></div><div class="view-right"><ng-view></ng-view></div></div></div>');
}]);

angular.module('views/note/edit.html', []).run(['$templateCache', function ($templateCache) {
  'use strict';
  $templateCache.put('views/note/edit.html',
    '<div id="ownnote" class="edit-note-container"><div class="controls"><span id="newfile" class="indent"><span ng-if="hasPermission(noteShadowCopy, \'update\')">Name: <input type="text" class="fileinput" ng-model="$parent.noteShadowCopy.title"><select ng-model="$parent.noteShadowCopy.notebook" ng-options="group.name for group in local_notebooks track by group.id"><option value="">Not grouped</option></select><input type="text" placeholder="group title" ng-show="noteShadowCopy.notebook.id === \'_new\'" ng-model="$parent.new_group"><div class="button" ng-click="saveNote()">Save</div></span><span ng-if="!hasPermission(noteShadowCopy, \'update\')" style="padding-right: 10px"><b>{{ noteShadowCopy.title }}</b> You don\'t have permissions to edit this note</span><div id="canceledit" class="button">Back</div><div class="pull-right autosave" ng-class="{\'shown\': autoSaved }">Saved!</div></span></div><textarea ui-tinymce="tinymceOptions" ng-model="noteShadowCopy.content" ng-disabled="!hasPermission(noteShadowCopy, \'update\')">\n' +
    '\n' +
    '	</textarea></div>');
}]);

angular.module('views/note/view.html', []).run(['$templateCache', function ($templateCache) {
  'use strict';
  $templateCache.put('views/note/view.html',
    '<div id="ownnote" class="view-note-container"><div id="controls"><span class="indent"><div class="button" ng-click="goBack()">Go back</div></span></div><div class="listingBlank"></div><h1><b>{{ note.title }}</b></h1><div ng-bind-html="note.content | trusted" class="noteContent"></div></div>');
}]);
