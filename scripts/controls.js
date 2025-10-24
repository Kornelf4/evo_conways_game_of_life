function moveCamera() {
    if(pressedKeys.w) camera.y -= cameraSpeed;
    if(pressedKeys.a) camera.x -= cameraSpeed;
    if(pressedKeys.s) camera.y += cameraSpeed;
    if(pressedKeys.d) camera.x += cameraSpeed;
}