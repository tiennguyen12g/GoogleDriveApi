import { useEffect } from "react";

export default function OAuthSignin({CLIENT_ID, SECRET_ID, Redirect_URL,API_KEY}) {
  /*
   * Create form to request access token from Google's OAuth 2.0 server.
   */

  function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      client_id: CLIENT_ID ,
      redirect_uri: Redirect_URL,
      response_type: "token",
      scope: "https://www.googleapis.com/auth/drive",
      include_granted_scopes: "true",
      state: "pass-through value",
    };

    // Add form parameters as hidden input values.
    for (const param in params) {
      if (Object.prototype.hasOwnProperty.call(params, param)) {
        const input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", param);
        input.setAttribute("value", params[param]);
        form.appendChild(input);
      }
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }
  return (
    <div>
      <button onClick={oauthSignIn}>Login</button>
    </div>
  );
}
