"use strict";
/**
 * Created by fanggjie on 2014/5/30.
 */

var TimeTunnel = {reversion: '1.0'};

TimeTunnel.View = function(width, height, container) {
    this.FOV = 45;
    this.NEAR = 1;
    this.FAR = 5000;

    this._container = container;

    this._viewWidth = width;
    this._viewheight =  height;
    this._aspect = width / height;

    //this.__calculateXYWH();

    this._camera = new THREE.PerspectiveCamera(this.FOV, this._aspect, this.NEAR, this.FAR);
    this._lookAtPoint = new THREE.Vector3(0, 0, -this.FAR);

    this._scene = new THREE.Scene();

    var pattern = new TimeTunnel.TunnelPattern(this);
    pattern.initialize();

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
    constructor: TimeTunnel.View,

    setSize: function(width, height) {
        this._viewWidth = width;
        this._viewheight =  height;
        this._aspect = width / height;

        //this.__calculateXYWH();

        if (this._renderer instanceof THREE.WebGLRenderer) {
            this._renderer.setSize(width, height);
        }

        if (this._camera instanceof THREE.PerspectiveCamera) {
            this._camera.aspect = this._aspect;
            this._camera.updateProjectionMatrix();
        }
    },

    render: function() {
        this._camera.lookAt(this._lookAtPoint);
        this._renderer.render(this._scene, this._camera);
    },

    __calculateXYWH: function(){
        this._x = - Math.tan(this.FOV * Math.PI / 360) * this.NEAR;
        this._y = Math.abs(this._x) / this._aspect;
        this._w = 2 * Math.abs(this._x);
        this._h = 2 * this._y;

        console.log("x=" + this._x);
        console.log("y=" + this._y);
        console.log("w=" + this._w);
        console.log("h=" + this._h);
    },
    __createTunnel: function(){
        var materialBottom = new THREE.MeshPhongMaterial({
            color: 0xffcccc,
            specular: 0xffffff,
            shininess: 100,
            vertexColors: THREE.NoColors,
            shading: THREE.FlatShading
        });
        var planeGeometry = new THREE.BoxGeometry( this._w, 2 , 0.01);
        var meshBottom = new THREE.Mesh(planeGeometry, materialBottom);
        meshBottom.rotateX(Math.PI / 2);
        meshBottom.position.set(0,  -this._y -0.1, -1);
        this._scene.add(meshBottom);

        var light = new THREE.PointLight( 0xffffff );
        light.position.set(0, 0, 1 );
        this._scene.add( light );
    }
};