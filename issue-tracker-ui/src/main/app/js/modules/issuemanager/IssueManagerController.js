IssueTrackerApp.module('IssueManager', 
	function(IssueManager, IssueTrackerApp, Backbone, Marionette, $, _) {


// Define the AppRouter for the IssueManager module
  var IssueManagerRouter = Marionette.AppRouter.extend({

    appRoutes: {
      'issues': 'list'  //http://host[:port]/[path/]page.html[#hash][?param=value]
    }


  });

  var IssueManagerController = Marionette.Controller.extend({

  	  list: function(collection) {
      	logger.debug("IssueManagerController.list");

      	var displayListView = function(issueCollection) {
        	var listView = new IssueManager.IssueListView({
          	collection: issueCollection
        	});

        	logger.debug("Show IssueListView in IssueTrackerApp.mainRegion");
        	
			IssueTrackerApp.mainRegion.show(listView);
		};
		
		if(collection){
			displayListView(collection);
		}else{
			var fetchingIssues = IssueTrackerApp.request('issue:entities');
			$.when(fetchingIssues).done(function(issues) {
          		displayListView(issues);
        	});
		}

      }

  });

  //crear la instancia
  var controller = new IssueManagerController();

});

