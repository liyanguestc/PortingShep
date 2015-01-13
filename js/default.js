 var windowWidth = window.innerWidth,
     windowHeight = window.innerHeight;
 var camera, renderer, scene;
 var q = 0;
 head.ready(function() {
     Init();
     animate();
 });

 function Init() {
     LEIA.heightControl = 0;
     scene = new THREE.Scene();

     //setup camera
     camera = new LeiaCamera({
         cameraPosition: new THREE.Vector3(_camPosition.x, _camPosition.y, _camPosition.z),
         targetPosition: new THREE.Vector3(_tarPosition.x, _tarPosition.y, _tarPosition.z)
     });
     scene.add(camera);


     //setup rendering parameter
     renderer = new LeiaWebGLRenderer({
         antialias: true,
         renderMode: _renderMode,
         shaderMode: _nShaderMode,
         colorMode: _colorMode,
         devicePixelRatio: 1
     });
     renderer.Leia_setSize({
         width: windowWidth,
         height: windowHeight,
         autoFit: true
     });
     document.body.appendChild(renderer.domElement);

     //add object to Scene
     addObjectsToScene();

     //add Light
     addLights();

     //add Gyro Monitor
     //addGyroMonitor();

     document.addEventListener('keydown', onDocumentKeyDown, false);
 }

 function animate() {
     requestAnimationFrame(animate);
     //renderer.setClearColor(new THREE.Color().setRGB(1.0, 1.0, 1.0)); 

     LEIA_foregroundPlane.rotation.y = LEIA.heightControl * Math.cos(2 * LEIA.time) / 10 * Math.PI;
     renderer.Leia_render({
         scene: scene,
         camera: camera,
         holoScreenSize: _holoScreenSize,
         holoCamFov: _camFov,
         upclip: _up,
         downclip: _down,
         messageFlag: _messageFlag
     });
 }

 function addObjectsToScene() {
     //Add your objects here
     setForegroundPlane('resource/linestest.jpg');
 }

 function addLights() {
     //Add Lights Here
     var xl = new THREE.DirectionalLight(0xffffff);
     xl.position.set(1, 0, 2);
     scene.add(xl);
     //var pl = new THREE.PointLight(0x111111);
     var pl = new THREE.PointLight(0x555555);
     pl.position.set(-20, 10, 20);
     scene.add(pl);

 }

 function setForegroundPlane(filename) {

     var LEIA_foregroundPlaneTexture = new THREE.ImageUtils.loadTexture(filename);
     LEIA_foregroundPlaneTexture.wrapS = LEIA_foregroundPlaneTexture.wrapT = THREE.RepeatWrapping;
     LEIA_foregroundPlaneTexture.repeat.set(1, 1);
     var LEIA_foregroundPlaneMaterial = new THREE.MeshLambertMaterial({
         map: LEIA_foregroundPlaneTexture,
         transparent: true,
         side: THREE.DoubleSide
     });
     var LEIA_foregroundPlaneGeometry;
     //LEIA_foregroundPlaneGeometry = new THREE.PlaneGeometry(40, 40, 50, 50);
     var l = 57.64;
     //var l = 38.56;
     //LEIA_foregroundPlaneGeometry = new THREE.PlaneGeometry(l, l, 50, 50);
     LEIA_foregroundPlaneGeometry = new THREE.PlaneGeometry(l, 0.75 * l, 10, 10);
     LEIA_foregroundPlane = new THREE.Mesh(LEIA_foregroundPlaneGeometry, LEIA_foregroundPlaneMaterial);
     scene.add(LEIA_foregroundPlane);
 }


 function onDocumentKeyDown(event) {
     var keyCode = event.which;
     var fn = window.location.pathname;

     switch (keyCode) {
         case 53: // numpad 5
             LEIA.heightControl = LEIA.heightControl - 1.0;
             console.log('LEIA.heightControl = ' + LEIA.heightControl);
             break;
         case 54: // numpad 6 
             LEIA.heightControl = LEIA.heightControl + 1.0;
             console.log('LEIA.heightControl = ' + LEIA.heightControl);
             break;
         default:
             break;
     }
 }