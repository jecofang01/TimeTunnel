"use strict";
/**
 * File: Patterns.js
 * Author: Jeco Fang
 * Email: jeco.fang@163.com
 * Date: 2014/6/4.
 */

TimeTunnel.TunnelPattern = function(view){
    this._view = view;

    this._container = new THREE.Object3D();
    this._meshArray = [];
    this._container.name = "TunnelPattern";
};

TimeTunnel.TunnelPattern.prototype = {
    constructor: TimeTunnel.TunnelPattern,

    initialize: function() {
        this.createBottom();
        this.createLeft();
        this.createRight();
        this.createTop();
        this.createLight();

        this._view._scene.add(this._container);
    },

    loadFloorTexture: function() {
        var texture = THREE.ImageUtils.loadTexture("res/floor.jpg");
        texture.mapping = THREE.UVMapping;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);

        return texture;
    },

    createBottom: function() {
        var scope = this;
        var material = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture("res/floor.jpg", THREE.UVMapping, function(texture){
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                material.needsUpdate = true;
                scope._view.render();
            })
        });

        var geometry = new THREE.PlaneGeometry(this._view._viewWidth, 5000, 20, 40);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotateX( -Math.PI / 2);
        mesh.position.set(0, -this._view._viewheight * 0.99 /2  , -this._view.FAR / 2);

        var light = new THREE.PointLight(0xffffff);
        light.physicalAttenuation = true;
        light.position.set(0, 0, -500);
        this._container.add(light);

        this._meshArray.push(mesh);
        this._container.add(mesh);
    },

    createLeft: function() {
        var material = new THREE.MeshPhongMaterial({
            color: 0xffcccc,
            specular: 0xffffff,
            vertexColors: THREE.NoColors,
            shading: THREE.FlatShading
        });

        var geometry = new THREE.BoxGeometry(this._view._viewWidth * 0.01, this._view._viewheight, 5000);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(-this._view._viewWidth * 0.99 / 2, 0  , -this._view.FAR / 2);

        this._meshArray.push(mesh);
        this._container.add(mesh);
    },

    createRight: function() {
        var material = new THREE.MeshPhongMaterial({
            color: 0xffcccc,
            specular: 0xffffff,
            vertexColors: THREE.NoColors,
            shading: THREE.FlatShading
        });

        var geometry = new THREE.BoxGeometry(this._view._viewWidth * 0.01, this._view._viewheight, 5000);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(this._view._viewWidth * 0.99 / 2, 0  , -this._view.FAR / 2);

        this._meshArray.push(mesh);
        this._container.add(mesh);
    },

    createTop: function() {
        var material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            vertexColors: THREE.NoColors,
            shading: THREE.FlatShading
        });

        var geometry = new THREE.BoxGeometry(this._view._viewWidth, this._view._viewheight * 0.01, 5000);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, this._view._viewheight * 0.99 /2  , -this._view.FAR / 2);

        var light = new THREE.PointLight(0xffffff);
        light.physicalAttenuation = true;
        light.position.set(0, this._view._viewheight * 0.99 /2 , -500);
        this._container.add(light);

        this._meshArray.push(mesh);
        this._container.add(mesh);
    },

    createLight: function() {
        var light = new THREE.PointLight(0xffffff);
        light.physicalAttenuation = true;
        light.position.set(0, 0, -5500);

        this._container.add(light);
    }
};