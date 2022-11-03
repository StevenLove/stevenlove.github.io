


/*

this line occurs any time we dismiss an AlertDialog
It is not exactly a bug with android, but a logical consequence of some event handling. We can safely ignore it
2022-08-08 15:30:09.176 5107-5217/? W/InputManager-JNI: Input channel object '8cf4152 com.telex.pttoc/net.intracomsystems.webrtc2.webView.WebViewActivity (client)' was disposed without first being removed with the input manager!
https://stackoverflow.com/questions/45272619/dismissing-a-alertdialog-gives-warning-attempted-to-finish-an-input-event-but-th

*/