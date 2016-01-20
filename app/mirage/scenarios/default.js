export default function(server) {
	// this bit generates (x) car models
	server.createList('car', 10);
	server.loadFixtures();
}
