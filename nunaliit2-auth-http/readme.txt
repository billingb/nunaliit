AUTH
----

This project implements an authentication process used between a 
web browser and a a web server. This process designed to:

1. Use HTTP authentication
2. Perform form login and prevent the pop-up boxes usually
   associated with HTTP authentication
   
In this effort, authentication dialogs generated by browsers to
capture a user's name and password are avoided at all cost. This is
because form dialogs are customizable by applications and are
therefore preferred.
   
   
Introduction
------------

This project produces two artifacts:
- a JAR file to be employed in a servlet
- a JavaScript file that interacts with the JAR within a
  deployed servlet
  
The design is based on the concepts described below.

:: HTTP Authentication ::

The following sequence diagram shows the requests/responses
between a browser (Client) and a servlet (Server) when a 
protected resource is accessed. 

 |----------|                                        |----------|
 |  Client  |                                        |  Server  |
 |----------|                                        |----------|
      |                                                    |
      |   GET <url>                                        |
      | ------------------------------------------------>  |
      |                                                    |
      |   401 Realm=<realm>                                |
      | <------------------------------------------------  |
      |                                                    |
      V                                                    V

At this point, the client requests credentials (name and
password) from the user. Generally, this is a dialog box generated
by the browser. Once the name and the password have been
obtained, the messages between the Client and Server
continues.

      V                                                    V
      |                                                    |
      |   GET <url> Authenticate <name><password>          |
      | ------------------------------------------------>  |
      |                                                    |
      |   401 Realm=<realm>                                |
      | <------------------------------------------------  |
      |                                                    |
      V                                                    V

The sequence above denotes a situation where the name and/or password
are wrong. In that case, the same error message is sent back and
the client attempts to obtain the name and password again.

      V                                                    V
      |                                                    |
      |                                                    |
      |   GET <url> Authenticate <name><password>          |
      | ------------------------------------------------>  |
      |                                                    |
      |   200 Realm=<realm> <content>                      |
      | <------------------------------------------------  |
      |                                                    |

The sequence above shows the case where the name and password
are valid and which grants the user access to the requested resource. In
this case, the content of the resource is returned. This completes
the HTTP transaction.

At this point, the client records the path to the URL, the name
of the realm associated with it and the credentials that were used
to successfully access the resource. This information is used in
future requests:

1. When the same URL is accessed, the credentials are submitted in the
   first request, saving the need for a second message
   
2. When a different URL is accessed and an error message
   stating that authentication (401) to the same realm is required,
   the browser attempts to reuse the successful credentials prior
   to asking the user for a name and a password.


:: HTTP Authentication with XmlHttpRequest ::

In AJAX, the process used to access resources in the background
(JavaScript) depends on an object called XmlHttpRequest. This
object allows one to retrieve any resource (not only XML resources
as the name implies) without affecting the current context
(without reloading the page).

A call to XmlHttpRequest is generally asynchronous, meaning that
the object is set up to fetch a resource and when the resource
is available (downloaded), a callback function is executed.

When XmlHttpRequest encounters a protected resource, the same messages
as shown in the sequence diagram above are exchanged between the
Client and Server. It is possible, while setting up an instance
of XmlHttpRequest, to specify a user's credential (name,password).

The following sequence diagram depicts the messages exchanged
between a Client and a Server when a protected resource is accessed
while using an instance of XmlHttpRequest that has been set up with
user's credentials:

 |----------|                                        |----------|
 |  Client  |                                        |  Server  |
 |----------|                                        |----------|
      |                                                    |
      |   GET <url>                                        |
      | ------------------------------------------------>  |
      |                                                    |
      |   401 Realm=<realm>                                |
      | <------------------------------------------------  |
      |                                                    |
      |   GET <url> Authenticate <name><password>          |
      | ------------------------------------------------>  |
      V                                                    V

This last message was generated automatically by the browser, and based
on the name and password given while instantiating XmlHttpRequest.
The supplied name and password are used, regardless of previous 
interactions between the Client and the Server.

If the name and password are valid and grant access to the resource,
then the content of the resource is returned

      V                                                    V
      |                                                    |
      |   200 Realm=<realm> <content>                      |
      | <------------------------------------------------  |


However, if the name and password supplied to XmlHttpRequest are not
valid, or if they do not grant access to the resource, then following
occurs: 

      V                                                    V
      |                                                    |
      |   401 Realm=<realm>                                |
      | <------------------------------------------------  |
      V                                                    V

At this point, the user is prompted by the same dialog box as described
in the first sequence diagram.


:: Funny behaviour with XmlHttpRequest ::

The following describes an interesting situation observed with Safari
4.02 on MAC. At the point of writing this, it is not yet known if this is
a bug. However, the situation is described since it is corrected in the
implementation, and the description of the solution refers to it.

There appears to be situations where when a XmlHttpRequest is instantiated
with a name and a password, the name and password are ignored and
previously acquired credentials are supplied instead. 

In that particular case, the result of the request is does not corresponds
to the provided inputs.


Design
------

Requirements:

1. Use HTTP Authentication
   a. minimize risk to the password since it is managed by browser
   b. allow reuse of realm between multiple pages of a site without
      having to authenticate again
      
2. Prevent browser generated dialog boxes
   a. Use of forms allows greater customization
   b. JavaScript transacted authentication enables change of state in
      the page
      
3. User should need to authenticate only once for a page load

4. Authenticated state should survive a page reload

5. Capability to log out


Solution
--------

A session cookie is installed on the browser to keep track of current
authentication state. This allows an application to find out the state
of a user session without having to enquire to the server. This cookie
is generated by the server and installed on the client, for information
purposes. The server never uses this cookie to infer the state of
authentication.

When a client successfully logs in to the server, a cookie stating that
the user is logged in is installed. When a user fails to authenticate,
or when a user explicitly logs out, a cookie is installed to inform
the browser that the user is logged out.

:: Log In ::

1. When a user performs an action that requires authentication, the JavaScript
   application calls NUNALIIT_AUTH.login()

2. NUNALIIT_AUTH.login() creates a form requesting name and password, displays
   it to the user
   
3. When user submits name and password, control returns to NUNALIIT_AUTH.login().
   A XmlHttpRequest is created, specifying the user's name and password, to
   access /auth/login. In this request, the user's name is sent as a request 
   parameter. 

4. The first time the request is sent to the server, the browser does not
   supply the name and password. The server, upon detecting that no authentication
   tokens were supplied, responds with a 401 (Authentication Required) while
   dictating the realm for which the authentication is valid.
   
   (funny behaviour) Alternatively, if the browser submits credentials that are
   not related to the request, 401 (Authentication Required) is returned as
   well. This situation is detected by the server by comparing the name parameter
   found in the request, and the name in the authentication tokens.
   
5. When the browser receives the 401 error, it resubmits the request with the
   name and password. This is done without user intervention.
   
6. When receiving a login request populated with authentication tokens (name
   and password), the server validates the credentials. At this point, regardless
   of the outcome, the server replies with a successful response. This is crucial
   to prevent the browser from displaying a dialog box. The outcome of the
   validation can be observed two ways:
   a. The reply is a JSON object containing the actual result of the authentication
   b. The cookie installed on the browser (returned from server) states the
      outcome of the authentication.
   Note: At this point, the browser assumes that authentication to the realm
         was successful. Any request to the same realm will be tried using the
         name and password, whether valid or not. Therefore, it is important
         for JavaScript application to predict the need for authentication and
         not attempt to access a protected resource until a valid authentication
         was performed.
         
7. When the response is received by the browser, the XmlHttpRequest object involved
   in the process performs the callback function specified when instantiated. This
   returns control to the NUNALIIT_AUTH.login() function.
   
8. NUNALIIT_AUTH.login() inspect the returned response and calls onSuccess() or
   onError(), depending of the outcome of the authentication.
   
9.a. onSuccess() returns control to the calling application, stating that the
     authentication was valid.
9.b. onError() returns control to the calling application, stating that the
     authentication was a failure.
     
     
:: GetUser :: 

1. When a JavaScript application needs to find the current state of authentication,
   it calls NUNALIIT_AUTH.getUser()

2. NUNALIIT_AUTH.getUser() inspects the cookie installed on the browser and deduces
   the state of authentication from it. Appropriate information is returned to the
   application.
   
   
:: Logout ::

During logout, both the cookie and the authentication information maintained by the
browser must be erased from information pertaining to the current user.

1. A JavaScript application calls NUNALIIT_AUTH.logout()

2. A XmlHttpRequest is created, specifying an invalid name and password, to
   access /auth/logout. In this request, the invalid name is sent as a request 
   parameter.

3. The first time the request is sent to the server, the browser does not
   supply the name and password. The server, upon detecting that
   no authentication tokens were supplied, responds with a 401 (Authentication 
   Required) while informing the browser of the realm.
   
   (funny behaviour) Alternatively, if the browser submits credentials that are
   not related to the request, 401 (Authentication Required) is returned as
   well. This situation is detected by the server by comparing the name parameter
   found in the request, and the name in the authentication tokens.
   
4. When the browser receives the 401 error, it resubmits the request with the
   invalid name and password. This is done without user intervention.
   
5. When receiving a logout request populated with authentication tokens (name
   and password), the server ignores the credentials. The server replies with 
   a successful response. This is crucial to prevent the browser from displaying 
   a dialog box. The outcome of the logout can be observed in two ways:
   a. The reply is a JSON object stating that the user is logged out
   b. The cookie installed on the browser (returned from server) states the
      user is logged out.
   Note: At this point, the browser assumes that authentication to the realm
         was successful. Any request to the same realm will be tried using the
         invalid name and password. Therefore, it is important for JavaScript 
         applications to predict the need for authentication and not attempt to 
         access a protected resource until the user has successfully logged in.
         
6. When the response is received by the browser, the XmlHttpRequest object involved
   in the process performs the callback function specified when instantiated. This
   returns control to the NUNALIIT_AUTH.logout() function.
   
7. NUNALIIT_AUTH.logout() inspect the returned response and calls onSuccess() or
   onError()
   
   
:: Init ::
   
Although this call is performed first by an application, it is described last for
ease of comprehension.

NUNALIIT_AUTH.init() performs an important task: it calls the server in an attempt
to synchronize the browser's knowledge of authentication to a realm and the cookies
currently installed.

In general, authentication tokens are valid for a session. The same is true for
session cookies. However, there are circumstances where one type of information
outlasts the other. For example, if Firefox crashes and is
restarted specifying "Restore Session", then the cookie survives the crash while
the authentication does not.

In NUNALIIT_AUTH.init(), we take advantage of the fact that a browser, for efficiency
reason, submits authentication tokens to server while accessing a known protected
resource without waiting for a 401 error.

1. A JavaScript application calls NUNALIIT_AUTH.init()

2. A XmlHttpRequest is created, WITHOUT specifying any name nor password, to
   access /auth/login?adjustCookies=1

3. If /auth/login was previously accessed and the browser obtained
   authentication tokens for it, it will submit them right away. Remember
   that those credentials may or may not be valid, depending on the
   previous process path (logout installs invalid credentials). If the
   browser does not remember authentication tokens associated with
   /auth/login, then none will be submited.
   
4. When receiving a login request with 'adjustCookies' set, the server inspects
   if any credentials were submitted.
   a. If no credentials were submitted, then a successful response is replied
      along with a cookie. Both specify that the user is logged out. After this,
      the cookie and the browser's authentication state reflect the same 
      condition.
   b. If credentials were submitted, then they are inspected.
      i.  If the credentials are not valid, then a successful response is returned
          along with a cookie. Both specify that the user is logged out. After this,
          the cookie and the browser's authentication state reflect the same 
          condition.
      ii. If the credentials are valid, then a successful response is returned
          along with a cookie. Both specify that the user is logged in. After this,
          the cookie and the browser's authentication state reflect the same 
          condition.
5. When the response is received by the browser, the XmlHttpRequest object involved
   in the process performs the callback function specified when instantiated. This
   returns control to the NUNALIIT_AUTH.init() function.
   
6. NUNALIIT_AUTH.init() informs listeners of the current state.
  
  
Questions and Answers
---------------------

Q: Since the credentials are now stored in the javascript and not in the browser, is there 
   any way that javascript injected into the app can access the credentials?

A: The credentials are *handled* by JavaScript but stored internally by the browser using the same
   method as protecting credentials obtained by the dialog box. Unless the credentials 
   were intercepted by another script (lifted from the form), there is no way for the script to 
   access them.


Q: I see the reason why you have a "logged out" cookie for login state synchronization after a 
   crash, but it seems odd to have a cookie indicating that you are logged out rather than the 
   absence of a "logged in" cookie.
   
A: The cookie is a duplication of the answer being returned by the server. However, unlike the 
   reply, it is accessible by all pages from the same domain and survives page reloads. Deleting 
   the cookie might be sufficient, but more information is available via the cookie than by its 
   absence.
