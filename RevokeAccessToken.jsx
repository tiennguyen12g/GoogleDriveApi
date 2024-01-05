function RevokeAccessToken(accessToken) {
    // Google's OAuth 2.0 endpoint for revoking access tokens.
    var revokeTokenEndpoint = 'https://oauth2.googleapis.com/revoke';
  
    // Create <form> element to use to POST data to the OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', revokeTokenEndpoint);
  
    // Add access token to the form so it is set as value of 'token' parameter.
    // This corresponds to the sample curl request, where the URL is:
    //      https://oauth2.googleapis.com/revoke?token={token}
    var tokenField = document.createElement('input');
    tokenField.setAttribute('type', 'hidden');
    tokenField.setAttribute('name', 'token');
    tokenField.setAttribute('value', accessToken);
    form.appendChild(tokenField);
  
    // Add form to page and submit it to actually revoke the token.
    document.body.appendChild(form);
    form.submit();
  }
export default RevokeAccessToken;