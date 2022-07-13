function d2r(degrees) {
	return degrees * (Math.PI/180);
};

function toDegrees(radians) {
	return radians / (Math.PI/180);
};

function distance2D(posx, posz) {
	return Math.sqrt(Math.pow(posx - player.x,2) + Math.pow(posz - player.z,2));
};

function distance3D(posx, posy, posz) {
	return Math.sqrt(Math.pow(posx - player.x,2) + Math.pow(posy - player.y,2) + Math.pow(posz - player.z,2));
};

function lastDist2D(entity) {
	return Math.sqrt(Math.pow(entity.lastTickPosX - entity.posX,2) + Math.pow(entity.lastTickPosZ - entity.posZ,2));
};

function lastDist3D(entity) {
	return Math.sqrt(Math.pow(entity.lastTickPosX - entity.posX,2) + Math.pow(entity.lastTickPosY - entity.posY,2) + Math.pow(entity.lastTickPosZ - entity.posZ,2));
};
