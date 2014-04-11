App = Ember.Application.create();

// Task model
App.Task = Ember.Object.extend({
  finish: function(){ this.set('done',true); },
  reopen: function(){ this.set('done',false); }
});
App.Task.reopenClass({
  getTasks: function(){
    var tasks = [];
    for(i=0;i<10;i++){
      var random = Math.floor(Math.random()*10);
      tasks.push(App.Task.create({title: "Do something " + i, done: (random < 5)}));
    }
    return tasks;
  }
});

// router.js
App.Router.map(function() {
  // put your routes here
});

App.IndexController = Ember.ArrayController.extend({
  actions: {
    add: function(){
      this.get('content').push(this.get('new-task'));
      this.set('new-task',App.Task.create());
    }
  }
})
// routes/index_route.js
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.Task.getTasks();
  },
  setupController: function(controller,model){
    this._super.apply(this,arguments);
    controller.set('new-task',App.Task.create({title: "from controller"}));
  }
});

App.TaskViewComponent = Ember.Component.extend({
  didInsertElement: function(){
    console.log("I am called");
  },
  actions: {
    finish: function(){ this.get('item').finish() },
    reopen: function(){ this.get('item').reopen() },
  }
});
