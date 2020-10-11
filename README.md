# Strapi application

A quick description of your strapi application.

### CKEditor

I've switched the default DraftJS editor to CKEditor. This can be found at `ossi-dev-strapi/extensions/content-manager/admin/src/components` folder.

There are some minor issues with this which I have not been able to resolve.

- Base64 encoded image insertion does not work anymore. It did, but it doesn't anymore and I don't know why. I circumvented this by inserting images via the Media Library to the editor,
but the paths are relative so that means the front-end app has to append the API URL in front of any image src attribute. This is not nice, but that's what you get when you host those images locally.
- Images which are inserted via Media Lib are placed at the bottom of the editor and you have to manually move them. This is quite annoying, but workable.
- I've removed the `autoformat` feature which crashed the entire editor any time markdown was converted to HTML
- The editor still keeps crashing the entire page randomly and I haven't figured out why

### Articles

I've created a custom content type named `Articles` which is simply a model for Medium.com articles that I fetch from my RSS feed and cache locally for ~3 hours max. I skip over any comments in the feed and only grab articles.
