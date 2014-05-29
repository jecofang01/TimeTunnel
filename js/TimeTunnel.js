"use strict";
/**
 * File: TimeTunnel.js
 * Author: Jeco Fang
 * Email: jeco.fang@163.com
 * Date: 2014/5/23.
 */

var JFrame = JFrame || {};

JFrame.TimeTunnelView = function(width, height, container){
    this.FOV = 20;
    this.NEAR = 1;
    this.FAR = 5000;

    this._viewWidth = width;
    this._viewHeight = height;
    this._aspect = this._viewWidth / this._viewHeight;

    this._camera = new THREE.PerspectiveCamera(this.FOV, this._aspect, this.NEAR, this.FAR);
    this._camera.position.z = this.calculateCameraPositionZ();
    this._cameraTarget = new THREE.Vector3(0, 0, 0);

    this._scene = new THREE.Scene();
    this._scene.fog = new THREE.Fog(0x000000, 2000, 4000);

    this._renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    this._renderer.setSize(this._viewWidth, this._viewHeight);

    container.appendChild(this._renderer.domElement);
};

JFrame.TimeTunnelView.prototype = {
    constructor: JFrame.TimeTunnelView,

    calculateCameraPositionZ: function(){
        return 1 / Math.tan(this.FOV * Math.PI / 360) * this._aspect;
    },

    setViewSize: function(width, height) {
        this._viewWidth = width;
        this._viewHeight = height;
        this._aspect = width / height;

        this._camera.aspect = this._aspect;
        this._camera.position.z = this.calculateCameraPositionZ();
    },

    render: function(){
        this._camera.lookAt(this._cameraTarget);
        this._renderer.render(this._scene, this._camera);
    }
};