define(['underscore','backbone'], function(_, Backbone) {
  var S3Credential = Backbone.Model.extend({
    defaults: {
      url:'',
    },
    parse:function (response) {
      console.log(this);
      response.id = response._id;
      return response;
    }
  });
  return S3Credential;
});