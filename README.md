# didactalia_app_interface
AFEL Didactalia App interface

This is the interface of the AFEL application for Didactalia. It shows tag clouds for access resources and lists of games played for the logged in user, assuming the user has had activities recorded through the Post API, and the Get API is in place.
It is a set of php scripts and html/css code.

It is assuming that: 
   - the Get API is on localhost:8202
   - that the Game API is on localhost:8073
   - that ElasticSearch (for logging and others)
   - that the recommender services are available at http://afel-rec.know-center.tugraz.at/afel/
   
All of this can be changed easily. The user ID is stored in a session variable "afeluserid" currently set by the login.php script, to which the app redirects when the variable is not set.

