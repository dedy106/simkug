window.app_fileExplorer_dashboard = function(owner,options)
{
	if (owner)
	{
		window.app_fileExplorer_dashboard.prototype.parent.constructor.call(this,owner,options);
		this.className  = "app_fileExplorer_dashboard";
		this.maximize();
		this.itemsValue = new arrayList();		
		this.setColor("");
		try {			
			var namaapp = window.parent && window.parent.app_nama ? window.parent.app_nama : "RRA";																	
			this.tFile = new fileExplorer(this,{bound:[0,0,300,this.height-25],showFile:true, select:[this,"doSelectFile"], dataReady:[this,"doDataReady"],dblClick:[this,"doTreeClick"]});
			this.lvFile = new listView(this,{bound:[300,0,this.width - 300,this.height-25], showIcon:true, dblClick:[this,"doDblClick"]});
			this.fileUtil = this.app._file;
			this.fileUtil.addListener(this);
			this.rootDir = this.tFile.rootDir;		
			//this.fileUtil.setFilename(this.rootDir);		
			this.rootPath = this.rootDir;		
			if (!this.fileUtil.isDir(this.rootDir)){
				this.fileUtil.createDir(undefined, undefined, this);
			}else{
				this.tFile.setUsrRoot(this.app._userLog,"","Source");
			}		
			this.initload();
			this.lvFile.changeView(this.lvFile.viewType);
			this.setTabChildIndex();						
			this.standarLib = new util_standar();													
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_fileExplorer_dashboard.extend(window.childForm);
window.app_fileExplorer_dashboard.implement({	
	refreshScreen: function(width, height){
		this.lvFile.setWidth(width - 320);
		this.lvFile.setHeight(height - 25);
	},
	refresh: function(){
		var item  = this.tFile.getSelectedItem();
		if (this.fileUtil.isDir(item.getPath())){
			item.refresh();
			this.fileUtil.listFolderA(item.getPath(), undefined, this);
		}else {
			this.tFile.getSelectedItem().owner.refresh();
			this.fileUtil.listFolderA(item.owner.getPath(), undefined, this);
		}
	},
	doSelectCell: function(sender, col, row){
		try{			
		}catch(e){
			alert(e);
		}
	},
	doAttachment :function (sender){				
		this.pAttach.setVisible(!this.pAttach.visible);
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{			        	
         }catch(e){
            alert(e+" "+data);
         }
    },
	doClick: function(sender){

	},
	doRequestReady: function(sender, methodName, result, errCode, connection){
		if (sender == this.fileUtil && this == errCode){
				switch (methodName){								
					case "copyFilesTo" : 
					   if ((typeof result == "boolean" && result == false) || result.indexOf("error") != -1){
						   system.alert(this,result,"Upload File gagal");
					   }else{ 
						  system.info(this,"transaksi telah sukses tersimpan ","");
						  this.standarLib.clearByTag(this, ["10","11"],this.pMsg.to);		
						  this.pMsg.grid.clear(1);
						  showProgress("delete temporary...");
						  if (this.saveFiles !="" ) this.fileUtil.deleteFiles(this.saveFiles, undefined, this);
					   }
					 break;
						case "deleteFiles" :
							hideProgress("delete temporary...");
						break;					
					case "listFolder":							
						var fold = result;
						if (fold == undefined) return false;
						if (fold.search(";") == -1)return false;		
						var data = fold.split(";");		
						var node, file,tipe, folder = [], fileList = [];			
						for (var i in data){			
							file = data[i];
							tipe = file.substr(file.lastIndexOf("_")+1);
							file = file.substr(0,file.lastIndexOf("_"));
							file = trim(file);																	
							if (file != "" && file != "." && file != ".." && file != ".svn"){		
								if (tipe == "d") folder[folder.length] = file;								
								if (tipe == "f") fileList[fileList.length] = file;								
							}
						}	
						folder.sort();
						fileList.sort();
						this.lvFile.clearItem();
						for (var i in folder){
							this.lvFile.addItem(i,folder[i],"icon/"+system.getThemes()+"/folder2.png","folder","icon/"+system.getThemes()+"/folder2.png");
						}
						for (var i in fileList){
							var ext = fileList[i].substring(fileList[i].lastIndexOf(".")+1);								
							var tmpPath = this.tFile.getSelectedItem().getRealPath() +"/"+fileList[i];
							tmpPath = tmpPath.substr(1);							
							ext = ext.toLowerCase();
							if (ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "ico" || ext == "bmp" || ext == "gif" || ext == "wbmp"){							
								this.lvFile.addItem(folder.length + i,fileList[i],"icon/explorer/"+ext+".ico","file",tmpPath);
							}else 
								this.lvFile.addItem(folder.length + i,fileList[i],"icon/explorer/"+ext+".ico","file","icon/explorer/large/"+ext+".png");
						}
						this.lvFile.changeView(this.lvFile.viewType);
						//get share file						
					break;
					case "createDir" : 
						this.tFile.setUsrRoot(this.app._userLog,"","Source");
					break;
					case "deleteFile":
						if (result.search("error") != -1){
							systemAPI.alert(result);
						}else{
							if (this.fileUtil.isDir(this.tFile.getSelectedItem().getPath())){
								this.tFile.getSelectedItem().refresh();								
							}else this.tFile.getSelectedItem().owner.refresh();
						}
					break;
					case "copyFileTo":					
						if (typeof result == "string" && result.search("error") != -1){
							systemAPI.alert(result);
						}else{
							if (this.fileUtil.isDir(this.tFile.getSelectedItem().getPath())){
								this.tFile.getSelectedItem().refresh();
								this.copiedFile = undefined;							
							}else this.tFile.getSelectedItem().owner.refresh();
						}
					break;
				}
			}
			return "";
	},	
	eventMouseScrollDown: function(event){
		this.scrollDown = true;
		this.scrollPos = {x:0, y:event.clientY};				
		system.addMouseListener(this);
	},
	eventMouseScrollDown2: function(event){
				
	},
	doSysMouseUp: function(x, y , button, buttonState){
		system.delMouseListener(this);
		this.scrollDown = false;
	},
	doSysMouseMove: function(x, y , button, buttonState){
		try{						
			
		}catch(e){
			alert(e);
		}
	},	
	eventMouseScrollUp: function(event){
		this.scrollDown = false;		
	},
	addInfoItem: function(id, data, detail){		
	},	
	doItemClick: function(event,id){		
	},
	doDataReady: function(sender, items, result){
		try{
			if (this.lvDblClick){
				var folder = items;
				var item;
				for (var i in folder.childsIndex){
					item = system.getResource(folder.childsIndex[i]);
					if (item instanceof fileExplorerItem){
						if (item.getCaption() == this.lvCaption){
							this.tFile.doSelectItem(item);
							return;
						}					
					}
				}
				this.lvDblClick = false;
			}else{
				this.fileUtil.listFolderA(items.getPath(), undefined, this);			
				for (var i in items.childsIndex){
					item = system.getResource(items.childsIndex[i]);
					if (item instanceof fileExplorerItem){						
					}
				}
			}
		}catch(e){
			alert(e);
		}
	},
	doTreeClick: function(sender){				
		if (sender.file.isFile(sender.path)) {
			error_log(sender.getRealPath()+":"+sender.getRealPath().substr(1));
			this.lvFile.getData(sender.getRealPath().substr(1));
		}
	},
	doDblClick: function(sender, id, caption, icon, resId, tipe){
		if (tipe == "folder"){
			var folder = this.tFile.getSelectedItem();
			if (!folder.alreadyList){
				this.lvCaption = caption;
				folder.exploreChild();
				this.lvDblClick = true;
			}else{
				this.lvDblClick = false;
				var item;
				folder.expand();
				for (var i in folder.childsIndex){
					item = system.getResource(folder.childsIndex[i]);
					if (item instanceof fileExplorerItem){
						if (item.getCaption() == caption){
							this.tFile.doSelectItem(item);
							return;
						}					
					}
				}
			}
		}else{			
			this.lvFile.getData(this.tFile.getSelectedItem().getRealPath().substr(1)+"/"+caption);
		}
	},
	doSelectFile: function(sender, item){		
		this.app._mainForm.setFormCaption(item.getRealPath());
		if (item.getPath() == "roojaxnetwork"){
			this.lvFile.clearItem();
			var line, folder;
			for (var i in item.childsIndex){				
				folder = system.getResource(item.childsIndex[i]);
				this.lvFile.addItem(i,folder.getCaption(),"icon/"+system.getThemes()+"/folder2.png","folder","icon/"+system.getThemes()+"/folder2.png");
			}
		}else if (item.getPath() === undefined){
			this.lvFile.clearItem();
			var line, folder;
			for (var i in item.childsIndex){				
				folder = system.getResource(item.childsIndex[i]);
				this.lvFile.addItem(i,folder.getCaption(),"icon/"+system.getThemes()+"/folder2.png","folder","icon/"+system.getThemes()+"/folder2.png");
			}
		}else{			
			if (item.file.isDir(item.path))  this.fileUtil.listFolderA(item.getPath(), undefined, this);
		}
	},		
	doRefreshFile: function(sender){
		this.tFile.setPath(this.ePath.getText());
	},
	initload: function(){
		try{
			this.fileMnu = new PopUpMenu(this);						
				var mnu = new MenuItem(this.fileMnu);
				mnu.setCaption("New");
				var newMnu = mnu;
					mnu = new MenuItem(newMnu);
					mnu.setCaption("Folder");
					mnu.setData("FOLDER","EVENT");
					mnu.onClick.set(this,"doMenuClick");
					mnu = new MenuItem(newMnu);
					mnu.setCaption("File");					
					mnu.setData("FILE","EVENT");
					mnu.onClick.set(this,"doMenuClick");												
				mnu = new MenuItem(this.fileMnu);
				mnu.setCaption("-");
				mnu = new MenuItem(this.fileMnu);
				mnu.setCaption("Copy");
				mnu.setData("COPY","EVENT");
				mnu.onClick.set(this,"doMenuClick");												
				mnu = new MenuItem(this.fileMnu);
				mnu.setCaption("Paste");
				mnu.setData("PASTE","EVENT");
				mnu.onClick.set(this,"doMenuClick");												
				mnu = new MenuItem(this.fileMnu);
				mnu.setCaption("Delete");	
				mnu.setData("DELETE","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				mnu = new MenuItem(this.fileMnu);
				mnu.setCaption("-");
				mnu = new MenuItem(this.fileMnu);
				mnu.setCaption("Refresh");	
				mnu.setData("REFRESH","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				mnu = new MenuItem(this.fileMnu);
				mnu.setCaption("-");
				mnu = new MenuItem(this.fileMnu);
				mnu.setCaption("Add/Remove Share");
				mnu.setData("SHARE","EVENT");
				mnu.onClick.set(this,"doMenuClick");								
				mnu = new MenuItem(this.fileMnu);
				mnu.setCaption("Open");
				mnu.setData("OPEN","EVENT");
				mnu.onClick.set(this,"doMenuClick");								
				mnu = new MenuItem(this.fileMnu);
				mnu.setCaption("Download");
				mnu.setData("DOWNLOAD","EVENT");
				mnu.onClick.set(this,"doMenuClick");								
			this.tFile.setPopUpMenu(this.fileMnu);					
			this.viewMnu = new PopUpMenu(this);
			var mnu = new MenuItem(this.viewMnu);
				mnu.setCaption("New");
				var newMnu = mnu;
					mnu = new MenuItem(newMnu);
					mnu.setCaption("Folder");
					mnu.setData("FOLDER","EVENT");
					mnu.onClick.set(this,"doMenuClick");
					mnu = new MenuItem(newMnu);
					mnu.setCaption("File");					
					mnu.setData("FILE","EVENT");
					mnu.onClick.set(this,"doMenuClick");												
				mnu = new MenuItem(this.viewMnu);
				mnu.setCaption("-");
				mnu = new MenuItem(this.viewMnu);
				mnu.setCaption("Copy");
				mnu.setData("COPY2","EVENT");
				mnu.onClick.set(this,"doMenuClick");												
				mnu = new MenuItem(this.viewMnu);
				mnu.setCaption("Paste");
				mnu.setData("PASTE2","EVENT");
				mnu.onClick.set(this,"doMenuClick");												
				mnu = new MenuItem(this.viewMnu);
				mnu.setCaption("Delete");	
				mnu.setData("DELETE2","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				mnu = new MenuItem(this.viewMnu);
				mnu.setCaption("-");
				mnu = new MenuItem(this.viewMnu);
				mnu.setCaption("Refresh");	
				mnu.setData("REFRESH","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				mnu = new MenuItem(this.viewMnu);
				mnu.setCaption("-");
				mnu = new MenuItem(this.viewMnu);
				mnu.setCaption("Share");
				mnu.setData("SHARE","EVENT");
				mnu.onClick.set(this,"doMenuClick");
				mnu = new MenuItem(this.viewMnu);
				mnu.setCaption("Open");
				mnu.setData("OPEN2","EVENT");
				mnu.onClick.set(this,"doMenuClick");								
				mnu = new MenuItem(this.viewMnu);
				mnu.setCaption("Download");
				mnu.setData("DOWNLOAD2","EVENT");
				mnu.onClick.set(this,"doMenuClick");												
				mnu = new MenuItem(this.viewMnu);
				mnu.setCaption("-");
				mnu = new MenuItem(this.viewMnu);
				mnu.setCaption("List");
				mnu.setData("LIST","EVENT");
				mnu.onClick.set(this,"doMenuClick");								
				mnu = new MenuItem(this.viewMnu);
				mnu.setCaption("Large Icon");
				mnu.setData("LARGE","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				this.lvFile.setPopUpMenu(this.viewMnu);
				
				this.networkPath = new fileExplorerItem(this.tFile);
				this.networkPath.setCaption("Network");							
				this.networkPath.setSeparator("/");
				this.networkPath.setFolderName("");
				this.networkPath.setPath("roojaxnetwork");			
				this.networkPath.iconElm.style.background = "url(icon/explorer/network.png) top left no-repeat";											
				this.networkPath.setPopUpMenu(this.tFile.popUpMenu);				
				this.networkPath.alreadyList = true;
				//this.refreshNetworkShare();
		}catch(e){
			systemAPI.alert(e);
		}
		
	},	
	doMenuClick: function(sender){
		try{
			var data = sender.getData();
			if (this.networkPath == this.tFile.getSelectedItem()) return;
			switch(data){				
				case "FOLDER":
					if (this.pNew === undefined){
						this.pNew = new app_fileExplorer_fUpload(this.owner,{bound:[130,50,400,100],caption:"New Folder"},this);
						this.pNew.uploader.hide();
					}
					this.pNew.setCaption(this.tFile.getSelectedItem().caption);
					this.pNew.eFile.setCaption("Folder");
					this.pNew.eFile.setText("");
					this.pNew.reinit(false, this.tFile.getSelectedItem().getPath());
					this.pNew.show();
					//this.block();
					this.pNew.bringToFront();
				break;
				case "FILE":
					if (this.pNew === undefined){
						this.pNew = new app_fileExplorer_fUpload(this.owner,{bound:[130,50,400,100],caption:"New File"},this);					
					}
					this.pNew.setCaption(this.tFile.getSelectedItem().caption);
					this.pNew.eFile.setCaption("File");
					this.pNew.eFile.setText("");
					this.pNew.reinit(true, this.tFile.getSelectedItem().getPath());
					//this.block();
					this.pNew.show();
					this.pNew.bringToFront();
				break;
				case "COPY":
					var item = this.tFile.getSelectedItem();
				        if (this.tFile.root !=  item && item.getPath() !== undefined && item.getPath() != "roojaxnetwork" && !item.file.isDir(item.path))
						this.copiedFile = this.tFile.getSelectedItem();						
					else systemAPI.alert("Maaf, Untuk copy folder masih belum support...");
				break;
				case "COPY2":				        
					if (this.lvFile.getSelectedItem()[4] == "file")
						this.copiedFile = {path:this.tFile.getSelectedItem().getPath(),filename:this.lvFile.getSelectedItem()[2]};
					else systemAPI.alert("Maaf, Untuk copy folder masih belum support...");
				break;
				case "PASTE":					
					if (this.copiedFile === undefined) return;
					if (this.fileUtil.isDir(this.tFile.getSelectedItem().getPath())){
						if (!this.tFile.getSelectedItem().readOnly){
							if (this.fileUtil.isExist(this.tFile.getSelectedItem().getPath()+"/"+this.copiedFile.getCaption()))
								this.fileUtil.copyFileTo(this.copiedFile.getPath(), this.tFile.getSelectedItem().getPath()+"/copy of "+this.copiedFile.getCaption(), undefined, this);
							else 
								this.fileUtil.copyFileTo(this.copiedFile.getPath(), this.tFile.getSelectedItem().getPath()+"/"+this.copiedFile.getCaption(), undefined, this);
						}else systemAPI.alert("Anda tidak berhak menambah difolder ini.");
					}else {
						if (!this.tFile.getSelectedItem().owner.readOnly){
							if (this.fileUtil.isExist(this.tFile.getSelectedItem().owner.getPath()+"/"+this.copiedFile.getCaption()))
								this.fileUtil.copyFileTo(this.copiedFile.getPath(), this.tFile.getSelectedItem().owner.getPath()+"/copy of "+this.copiedFile.getCaption(), undefined, this);
							else
								this.fileUtil.copyFileTo(this.copiedFile.getPath(), this.tFile.getSelectedItem().owner.getPath()+"/"+this.copiedFile.getCaption(), undefined, this);
						}else systemAPI.alert("Anda tidak berhak menambah difolder ini.");
					}
				break;
				case "PASTE2":					
					if (this.copiedFile === undefined) return;
					
					if (this.fileUtil.isDir(this.tFile.getSelectedItem().getPath())){
						if (!this.tFile.getSelectedItem().readOnly){
							if (this.fileUtil.isExist(this.tFile.getSelectedItem().getPath()+"/"+this.copiedFile.filename))
								this.fileUtil.copyFileTo(this.copiedFile.path+"/"+this.copiedFile.filename, this.tFile.getSelectedItem().getPath()+"/copy of "+this.copiedFile.filename, undefined, this);
							else 
								this.fileUtil.copyFileTo(this.copiedFile.path+"/"+this.copiedFile.filename, this.tFile.getSelectedItem().getPath()+"/"+this.copiedFile.filename, undefined, this);
						}else systemAPI.alert("Anda tidak berhak menambah difolder ini.");
					}else {
						if (!this.tFile.getSelectedItem().owner.readOnly){
							if (this.fileUtil.isExist(this.tFile.getSelectedItem().owner.getPath()+"/"+this.copiedFile.filename))
								this.fileUtil.copyFileTo(this.copiedFile.path+"/"+this.copiedFile.filename, this.tFile.getSelectedItem().owner.getPath()+"/copy of "+this.copiedFile.filename, undefined, this);
							else
								this.fileUtil.copyFileTo(this.copiedFile.path+"/"+this.copiedFile.filename, this.tFile.getSelectedItem().owner.getPath()+"/"+this.copiedFile.filename, undefined, this);
						}else systemAPI.alert("Anda tidak berhak menambah difolder ini.");
					}
				break;
				case "DELETE":
					if (this.tFile.getSelectedItem() != this.tFile.root)
						this.fileUtil.deleteFile(this.tFile.getSelectedItem().getPath(), undefined, this);
					else systemAPI.alert("Root tidak dapat dihapus");
				break;
				case "DELETE2":				
					this.fileUtil.deleteFile(this.tFile.getSelectedItem().getPath()+"/"+this.lvFile.getSelectedItem()[2], undefined, this);					
				break;
				case "REFRESH":
					if (this.tFile.getSelectedItem().getPath() == "roojaxnetwork")
						this.refreshNetworkShare();
					else 
						this.tFile.getSelectedItem().refresh();					
				break;
				case "LIST":
					this.lvFile.changeView("list");
				break;
				case "LARGE":
					this.lvFile.changeView("view");
				break;
				case "OPEN":
					this.lvFile.getData(this.tFile.getSelectedItem().getRealPath());
				break;
				case "OPEN2":
					this.lvFile.getData(this.tFile.getSelectedItem().getRealPath()+"/"+this.lvFile.getSelectedItem()[2]);
				break;
				case "DOWNLOAD":
					this.lvFile.getData(this.tFile.getSelectedItem().getRealPath());
				break;
				case "DOWNLOAD2":
					this.lvFile.getData(this.tFile.getSelectedItem().getRealPath()+"/"+this.lvFile.getSelectedItem()[2]);
				break;
				case "SHARE":					
					if (this.pShare === undefined){						
						this.pShare = new app_fileExplorer_fShare(this.owner,{bound:[130,50,400,100],caption:"Share Folder"},this);	
					}					
					this.pNew.setCaption(this.tFile.getSelectedItem().caption);
					this.pShare.eName.setText("");
					this.pShare.reinit(this.tFile.getSelectedItem().getRealPath(),this.tFile.getSelectedItem());
					//this.block();
					this.pShare.show();
					this.pShare.bringToFront();
				break;
			}
		}catch(e){
			alert(e);
		}
	},
	//refresh: function(){
	//	this.tFile.getSelectedItem().refresh();
	//},
	doModalResult: function(sender, event){
		switch(event){
			case "delete":
				this.fileUtil.deleteFile(this.tFile.getSelectedItem().getPath(), undefined, this);
			break;
		}
	},
	refreshNetworkShare: function(){
		try{
			var data = this.dbLib.getDataProvider("select email, folder, sharename ,statusread from off_sharefile order by email",true);			
			this.shareFile = new arrayMap();
			this.networkPath.clearChild();
			if (typeof data != "string"){
				var line, currentEmail = "";			
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					if (line.email == this.app._userLog){
						this.shareFile.set(line.folder, line.sharename);	
					}
					if (currentEmail != line.email){
						var networkPath = new fileExplorerItem(this.networkPath);
						networkPath.setCaption(line.email);							
						networkPath.setSeparator("/");
						networkPath.setFolderName(undefined);
						networkPath.setPath(undefined);
						networkPath.iconElm.style.background = "url("+networkPath.folderIcon+") top left no-repeat";											
						networkPath.setPopUpMenu(this.tFile.popUpMenu);
						networkPath.alreadyList = true;
						currentEmail = line.email;								
					}
					var share = new fileExplorerItem(networkPath);
					share.setCaption(line.sharename);							
					share.setSeparator("/");
					share.setFolderName(line.folder);
					share.readOnly = line.statusread == "r";
					share.setPath(this.rootDir+"/"+line.folder);
					share.iconElm.style.background = "url("+networkPath.folderIcon+") top left no-repeat";											
					share.setPopUpMenu(this.tFile.popUpMenu);
				}
			}
		}catch(e){
			systemAPI.alert("Get Share network",e);
		}
	}
});

window.app_fileExplorer_fUpload = function(owner, options, parentPanel){
	if (owner){
		window.app_fileExplorer_fUpload.prototype.parent.constructor.call(this,owner,options);
		this.setWidth(400);
		this.setHeight(100);
		this.centerize();
		uses("saiLabelEdit;button;uploader");
		this.eFile = new saiLabelEdit(this,{bound:[10,30,300,20],caption:"File"});
		this.uploader = new uploader(this,{bound:[320,30,70,20],onChange:[this,"doChange"],param1:"uploadTo",param2:"", param3:true,afterUpload:[this,"doAfterUpload"]});
		this.bOk = new button(this,{bound:[this.width - 200,70,80,20],caption:"OK",click:[this,"doClick"]});
		this.bCancel = new button(this,{bound:[this.width - 100,70,80,20],caption:"Cancel",click:[this,"doClick"]});
		
		this.bClose = new imageButton(this,{bound:[this.width - 45,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});
		this.bMin = new imageButton(this,{bound:[this.width - 70,1,27,16],image:"icon/dynpro/pnlmin.png",click:[this,"doClick"]});
		this.parentPanel = parentPanel;
		this.path = parentPanel.tFile.getSelectedItem().getPath();
		this.fileUtil = this.app._file;
		this.fileUtil.addListener(this);
	}
};
window.app_fileExplorer_fUpload.extend(panel);
window.app_fileExplorer_fUpload.implement({
	doClick: function(sender){
		try{
			if (sender == this.bClose || sender == this.bMin || sender == this.bCancel){
				this.hide();
				this.parentPanel.unblock();
			}else if (sender == this.bOk){
				if (this.eFile.getText() != ""){				
					if (this.isUploader)
						this.uploader.upload();
					else 
						this.fileUtil.createDir(this.eFile.getText(), undefined, this);	
				}else systemAPI.alert("Nama folder atau file tidak boleh kosong.");
				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result, callObj){
		try{
			if (sender == this.fileUtil && this == callObj){
				switch(methodName){
					case "createDir":
						if (result) {
							this.parentPanel.unblock();
							this.hide();
							this.parentPanel.refresh();
						}else systemAPI.alert("Eksekusi gagal.", result);
					break;
					case "setFilename":
						//alert("error filename :"+result);
					break;
				}
			}			
		}catch(e){
			alert(e);
		}
	},
	doAfterUpload: function(sender, data, result, filename){		
		if (result){		
			this.parentPanel.refresh();
			this.parentPanel.unblock();
			this.hide();
		}else systemAPI.alert("Gagal upload file");
	},
	centerize: function(){
		this.setLeft(this.owner.width / 2 - this.width / 2);
		this.setTop(this.owner.height / 2 - this.height / 2);
	},
	reinit: function(isUpload, path){
		this.uploader.setVisible(isUpload);
		this.isUploader = isUpload;		
		//this.fileUtil.setFilenameA(path);
		this.path = path;
		if (isUpload){
			this.eFile.setWidth(300);
			this.uploader.setParam2(path+"/");
		}else{
			this.eFile.setWidth(380);
		}
	},
	doChange: function(sender, filename){
		this.eFile.setText(filename);
	}
});

window.app_fileExplorer_fShare = function(owner, options, parentPanel){
	if (owner){
		try{
			window.app_fileExplorer_fShare.prototype.parent.constructor.call(this,owner,options);
			this.setWidth(400);
			this.setHeight(100);
			this.centerize();
			uses("saiLabelEdit;button;checkBox");
			this.eName = new saiLabelEdit(this,{bound:[10,30,300,20],caption:"Share Name"});
			this.rbRead = new checkBox(this,{bound:[20,53,80,20],caption:"writeable"});
			this.bRemove = new button(this,{bound:[this.width - 300,70,80,20],caption:"Remove",click:[this,"doClick"]});
			this.bOk = new button(this,{bound:[this.width - 200,70,80,20],caption:"Apply",click:[this,"doClick"]});
			this.bCancel = new button(this,{bound:[this.width - 100,70,80,20],caption:"Cancel",click:[this,"doClick"]});
			
			this.bClose = new imageButton(this,{bound:[this.width - 45,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});
			this.bMin = new imageButton(this,{bound:[this.width - 70,1,27,16],image:"icon/dynpro/pnlmin.png",click:[this,"doClick"]});
			this.parentPanel = parentPanel;
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);		
		}catch(e){
			alert("fShare :"+e);
		}
	}
};
window.app_fileExplorer_fShare.extend(panel);
window.app_fileExplorer_fShare.implement({
	doClick: function(sender){
		try{
			if (sender == this.bClose || sender == this.bMin || sender == this.bCancel){
				this.hide();
				this.parentPanel.unblock();
			}else if (sender == this.bOk){				
				if (this.eName.getText() != ""){
					if (this.item.share){
						this.eventShare = "notshare";
						this.dbLib.execQuery("delete from  off_sharefile where folder = '"+this.path+"' )");
					} else {
						this.eventShare = "apply";
						this.dbLib.execQuery("insert into off_sharefile(email, folder, sharename, statusread)values('"+this.app._userLog+"','"+this.path+"','"+this.eName.getText()+"','"+(this.rbRead.isSelected() ? "w":"r")+"' )");
					}
				}else systemAPI.alert("Nama <i>share</i> tidak boleh kosong.");				
			}else if (sender == this.bRemove){
				this.eventShare = "remove";
				this.dbLib.execQuery("delete from off_sharefile where email= '"+this.app._userLog+"' and folder = '"+this.path+"' ");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{
			if (sender == this.dbLib){
				switch(methodName){
					case "execQuery":
						if (result.search("error") == -1) {
							this.parentPanel.unblock();
							if(this.eventShare == "notshare")
								this.parentPanel.shareFile.del(this.path);
							else 
								this.parentPanel.shareFile.set(this.path,this.eName.getText());
							this.hide();							
							this.parentPanel.tFile.getSelectedItem().setShare(this.eventShare == "apply",this.eName.getText());
							this.parentPanel.refreshNetworkShare();
						}else systemAPI.alert("Gagal <i>sharing</i>file.", result);
					break;					
				}
			}			
		}catch(e){
			alert(e);
		}
	},
	centerize: function(){
		this.setLeft(this.owner.width / 2 - this.width / 2);
		this.setTop(this.owner.height / 2 - this.height / 2);
	},
	reinit: function(path, item){
		this.path = path;		
		this.item = item;
		this.eName.setText(this.parentPanel.tFile.getSelectedItem().shareName);
		this.bRemove.setEnabled(this.parentPanel.tFile.getSelectedItem().share);		
		this.bOk.setEnabled(!this.parentPanel.tFile.getSelectedItem().share);		
	}
});
