"use strict";
/**
 * Created by fanggjie on 2014/5/30.
 */

var TimeTunnel = {reversion: '1.0'};

TimeTunnel.View = function(width, height, container) {
    this.FOV = 30;
    this.NEAR = 1;
    this.FAR = 5000;

    this._container = container;

    this._viewWidth = width;
    this._viewheight =  height;
    this._aspect = width / height;

    this._camera = new THREE.PerspectiveCamera(this.FOV, this._aspect, this.NEAR, this.FAR);
    this._camera.position.set(0, 0, this.calculateCameraPositionZ());
    this._lookAtPoint = new THREE.Vector3(0, 0, 0);

    this._scene = new THREE.Scene();

    this.__createTunnelShape();

    this._renderer = new THREE.WebGLRenderer({antialias: true});
    this._renderer.setSize(this._viewWidth, this._viewheight);
    this._renderer.setClearColor(0x000000, 1);
    this._renderer.autoClear = false;
    this._renderer.domElement.style.position = "absolute";
    this._renderer.domElement.style.left = 0;
    this._renderer.domElement.style.top = 0;

    this._container.appendChild(this._renderer.domElement);
};

TimeTunnel.View.prototype = {

    setSize: function(width, height) {
        this._viewWidth = width;
        this._viewheight =  height;
        this._aspect = width / height;

        if (this._renderer instanceof THREE.WebGLRenderer) {
            this._renderer.setSize(width, height);
        }

        if (this._camera instanceof THREE.PerspectiveCamera) {
            this._camera.aspect = this._aspect;
            this._camera.position.z = this.calculateCameraPositionZ();
            this._camera.updateProjectionMatrix();
        }
    },

    render: function() {
        this._camera.lookAt(this._lookAtPoint);
        this._renderer.render(this._scene, this._camera);
    },

    calculateCameraPositionZ: function(){
        return 1 / Math.tan( this.FOV * Math.PI / 360) * this._aspect;
    },

    __createTunnelShape: function(){
        var tunnelShape = new THREE.Shape();
        tunnelShape.moveTo(-1, -1);
        tunnelShape.lineTo(1, -1);
        tunnelShape.lineTo(1, 0.5);
        tunnelShape.quadraticCurveTo(1, 1, 0, 1);
        tunnelShape.quadraticCurveTo(-1, 1, -1, 0.5);
        tunnelShape.lineTo(-1, -1);

        var points = tunnelShape.createSpacedPointsGeometry(100);

        var geometry = new THREE.ExtrudeGeometry(tunnelShape, {amount: 20});

        var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, [
            new THREE.MeshLambertMaterial({color: 0xffcccc}),
            new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true, transparent: true})
        ]);

        mesh.position.set(-1, 1, 200);
        var obj = new THREE.Object3D();
        obj.add(mesh);
        obj.position.z = -300;
        this._scene.add(obj);
    }
};