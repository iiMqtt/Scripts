/** eval(file_util.readFile("utils/Utils.js")); */
/** @author ezMatt#9161 */

function Module(name,category) {
	java.lang.Runtime.getRuntime().exec('cmd /c mkdir "C:\Users\User\Desktop\Test"');
	if(arguments.length !== 2) {
		client.print(Colour.AQUA + "Script" + Colour.WHITE + " » Not enough args specified (" + arguments.length + "), TWO (2) required.");
		client.print(Colour.AQUA + "Script" + Colour.WHITE + " » Passing random args");
		
		this.name = "Module" + Math.floor(Math.random() * (9999 - 0) + 0);
		MODULE = script.registerModule(this.name, EXPLOITS);
		
	} else {
	
		this.name = name;
		MODULE = script.registerModule(this.name, category);
		
	}
	
	this.hide = function() {
		player.sendMessage(".hide " + this.name);
	}
	this.toggle = function() {
		client.toggleModule(this.name)
	}
	this.bind = function(key) {
		player.sendMessage(".bind " + this.name + " " + key)
	}
	
	
	this.onEnable = function(fn) {
		MODULE.onEvent("enable", fn);
	}
	
	this.onDisable = function(fn) {
		MODULE.onEvent("disable", fn);
	}
	
	this.onUpdate = function(fn) {
		MODULE.onEvent("playerUpdateEvent", fn);
	}
	
	this.onPreUpdate = function(fn) {
		MODULE.onEvent("playerPreUpdateEvent", fn);
	}
	
	this.onPostUpdate = function(fn) {
		MODULE.onEvent("playerPostUpdateEvent", fn);
	}
	
	this.onMove = function(fn) {
		MODULE.onEvent("moveEvent", fn);
	}
	
	this.onRender2D = function(fn) {
		MODULE.onEvent("render2DEvent", fn);
	}
	
	this.onRender3D = function(fn) {
		MODULE.onEvent("render3DEvent", fn);
	}
	
	this.onWorldLoad = function(fn) {
		MODULE.onEvent("loadWorldEvent", fn);
	}
	
	this.onPacketSend = function(fn) {
		MODULE.onEvent("packetSendEvent", fn);
	}
	
	this.onPacketReceive = function(fn) {
		MODULE.onEvent("packetReceiveEvent", fn);
	}
};



function BooleanSetting(name, defaultValue) {
	
	MODULE.addBooleanProperty(name, name, defaultValue);
	
	return function() {
		return MODULE.getProperty(name).getBoolean();
	}
}

function IntegerSetting(name, defaultValue, min, max, increment) {
	
	MODULE.addIntegerProperty(name, name, defaultValue, min, max, increment)
	
	return function() {
		return MODULE.getProperty(name).getInteger();
	}
}

function FloatSetting(name, defaultValue, min, max, increment) {
	
	MODULE.addFloatProperty(name, name, defaultValue, min, max, increment)
	
	return function() {
		return MODULE.getProperty(name).getFloat();
	}
}

function DoubleSetting(name, defaultValue, min, max, increment) {
	
	MODULE.addDoubleProperty(name, name, defaultValue, min, max, increment)
	
	return function() {
		return MODULE.getProperty(name).getDouble();
	}
}

/** @todo
function StringSetting(MODULE, name, defaultValue, acceptedValues) {
	MODULE.addStringProperty(name, name, defaultValue, args)
	return function() {
		return MODULE.getProperty(name).getString();
	}
}

function ListSetting(MODULE, name, defaultValue, acceptedValues) {
	MODULE.addListProperty(name, name, defaultValue, Array.from(acceptedValues))
	return function() {
		return MODULE.getProperty(name).getList();
	}
}
*/

String.prototype.setState = function(state) {
	if(client.isEnabled(this) == !state) {
		client.toggleMODULE(this);
	}
};

Array.prototype.contains = function(obj) {
	var i = this.length;
	while(i--) {
		if(this[i]===obj) {
			return true;
		};
	};
	return false;
};

// don't make fun of me for this
function async(_callback) {
	new java.lang.Thread(function() {
		_callback();
	}).start();
}

// skidded
(function(context) {
  'use strict';
 
  var Timer = Java.type('java.util.Timer');
  var Phaser = Java.type('java.util.concurrent.Phaser');

  var timer = new Timer('jsEventLoop', false);
  var phaser = new Phaser();
 
  var onTaskFinished = function() {
    phaser.arriveAndDeregister();
  };
 
  context.setTimeout = function(fn, millis /* [, args...] */) {
    var args = [].slice.call(arguments, 2, arguments.length);
 
    var phase = phaser.register();
    var canceled = false;
    timer.schedule(function() {
      if (canceled) {
        return;
      }
 
      try {
        fn.apply(context, args);
      } catch (e) {
        print(e);
      } finally {
        onTaskFinished();
      }
    }, millis);
 
    return function() {
      onTaskFinished();
      canceled = true;
    };
  };
 
  context.clearTimeout = function(cancel) {
    cancel();
  };
 
  context.setInterval = function(fn, delay /* [, args...] */) {
    var args = [].slice.call(arguments, 2, arguments.length);
 
    var cancel = null;
 
    var loop = function() {
      cancel = context.setTimeout(loop, delay);
      fn.apply(context, args);
    };
 
    cancel = context.setTimeout(loop, delay);
    return function() {
      cancel();
    };
  };
 
  context.clearInterval = function(cancel) {
    cancel();
  };
 
})(this);
