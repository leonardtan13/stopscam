app_folder = "stopscam-app"
install:
	cd "${app_folder}" && npm i

dev: format lint
	cd "${app_folder}" && npm run dev
	
lint: 
	cd ${app_folder} && npm run lint

format:
	cd ${app_folder} && npm run format
