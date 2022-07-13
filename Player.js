function findEntity(EntityPlayerName) {
	var a = world.getPlayerEntities().length;
	while(a--) {
		if(entity_util.getName(world.getPlayerEntities()[a]) == EntityPlayerName) {
			return world.getPlayerEntities()[a];
		};
	};
	return null;
};

function heldItemName(itemName) { try {
	return player.getHeldItemName();
} catch (e) {return "tile.air";};};

function findItem(itemName) {
	var firstSlot = player.getSlot()
	for(var i = 0;i < 9;i++){
		player.setSlot(i);
		connection.sendPacket("0x09",player.getSlot());
		if(heldItemName() == itemName) {
			return [true,firstSlot,player.getSlot(),player.getHeldItem()];
		}
	}
	return [false,firstSlot,player.getSlot(),player.getHeldItem()];
};

function getBow() {
	var response = [false];
	
	if(heldItemName() == "item.bow") {
		var response = [true,"bow",player.getHeldItem()];
		return response;
	}
	
	var firstSlot = player.getSlot()
	for(var i = 0;i < 9;i++){
		player.setSlot(i);
		if(heldItemName() == "item.bow") {
			var response = [true,player.getSlot(),player.getHeldItem(),firstSlot];
			break;
		}
		
	}
	
	player.setSlot(firstSlot);
	return response;
};

function packetDamage() {
	for(var i = 0;i <= 48;i++) {
		connection.sendPacket("0x04",player.getX(),player.getY() + 0.0625,player.getZ(),false);
		connection.sendPacket("0x04",player.getX(),player.getY(),player.getZ(),false);
	}
	connection.sendPacket("0x04",player.getX(),player.getY(),player.getZ(),true);
	return;
};
