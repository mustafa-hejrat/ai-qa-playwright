# Bug Report: Forgot Password Navigation Error on Android

## 1. Bug Summary

**Bug ID:** MANUAL-001  
**Application:** thePersonal mobile app  
**Platform:** Android  
**Module:** Document Editing / Document Download  
**Bug Type:** Functional / Navigation  
**Severity:** Medium (proposed)  
**Priority:** P2 (proposed)  
**Status:** New

## 2. Description

When a user attempts to edit or download a document and enters an incorrect password, tapping **"I Forgot My Password"** displays a "Web page not available" error instead of opening the password recovery page.

The issue occurs in both the Edit and Documents sections.

## 3. Preconditions

- The thePersonal app is installed on an Android device.
- The user can access the Edit and Documents sections.
- A password prompt appears when attempting to edit or download a document.

## 4. Steps to Reproduce

1. Open the thePersonal app on an Android device.
2. Navigate to the Edit section.
3. Enter an incorrect password.
4. Tap **"I Forgot My Password."**
5. Observe the resulting screen.
6. Repeat steps 2–5 in the Documents section.

## 5. Expected Result

The app should open the password recovery page and allow the user to begin resetting their password.

## 6. Actual Result

The app displays a "Web page not available" screen instead of opening the password recovery page.

**Error message:**

```text
Web page not available

The web page at ca.dgag.webviow://open ExternalBrowseraction=forgotpassword could not be loaded because:

net::ERR_UNKNOWN_URL_SCHEME
```

## 7. User Impact

Users who forget their password may be unable to access the password recovery flow from the Edit and Documents sections. This may prevent them from completing document-related tasks.

## 8. Technical Investigation Note

The `net::ERR_UNKNOWN_URL_SCHEME` error suggests that the Android WebView is attempting to open a URL scheme it does not recognize or handle.

The development team should investigate the password recovery link format and the app's handling of this navigation action.

## 9. Suggested Regression Test

Verify that tapping **"I Forgot My Password"** from both the Edit and Documents sections opens the correct password recovery page without displaying a WebView navigation error.

## 10. Test Evidence

- **Evidence type:** Screenshot
- **Platform:** Android
- **Observed error:** `net::ERR_UNKNOWN_URL_SCHEME`
- **Attachment:** [View screenshot](Screenshot_forgot-password-error.jpg)

## 11. Notes

Severity and priority are preliminary assessments and may be adjusted by the development team based on business impact and the availability of alternative password recovery methods.