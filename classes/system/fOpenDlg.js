window.system_fOpenDlg = function(owner, options){
	if (owner){
		window.system_fOpenDlg.prototype.parent.constructor.call(this,owner, options);				
		uses("portalui_fileExplorer;portalui_listView;util_file;util_dbLib");
		this.tFile = new portalui_fileExplorer(this,{bound:[10,10,300,this.height - 35],showFile:true, select:[this,"doSelectFile"], dataReady:[this,"doDataReady"],dblClick:[this,"doTreeClick"]});
		this.lvFile = new portalui_listView(this,{bound:[320,10,this.width - 330,this.height - 80], showIcon:true, dblClick:[this,"doDblClick"]});
		this.bOk = new portalui_button(this,{bound:[this.width - 190,this.height - 50,80,20],caption:"Open",click:[this,"doClick"]});
		this.bCancel = new portalui_button(this,{bound:[this.width - 100,this.height - 50,80,20],caption:"Cancel",click:[this,"doClick"]});
		this.fileUtil = new util_file(undefined);		
		this.fileUtil.addListener(this);
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.systemDir = this.tFile.rootDir;		
		this.userDefined = options.user;
		if (options.root !== undefined){
    		this.fileUtil.setFilename(this.systemDir + "/"+options.root);		
    		this.rootPath = this.systemDir + "/"+options.root;		
    		if (!this.fileUtil.isDir()){
    			this.fileUtil.createDir();
    		}else{
    			this.tFile.setUsrRoot(this.userDefined,options.root,"Project");
    		}	
    		this.root = options.root;
    		this.rootCaption= this.root;
		}
		if (options.rootCaption !== undefined){
		   this.rootCaption = options.rootCaption;
        }        
        this.shareFile = new portalui_arrayMap();	
		this.initload();
	}
};
window.system_fOpenDlg.extend(portalui_sysForm);
window.system_fOpenDlg.implement({
	doDataReady: function(sender, items, result){
		try{
			if (this.lvDblClick){
				var folder = items;
				var item;
				for (var i in folder.childsIndex){
					item = system.getResource(folder.childsIndex[i]);
					if (item instanceof portalui_fileExplorerItem){
						if (item.getCaption() == this.lvCaption){
							this.tFile.doSelectItem(item);
							return;
						}					
					}
				}
				this.lvDblClick = false;
			}else{
				this.fileUtil.listFolderA(items.getPath());			
				for (var i in items.childsIndex){
					item = system.getResource(items.childsIndex[i]);
					if (item instanceof portalui_fileExplorerItem){
						if (this.shareFile.get(item.getRealPath()) !== undefined){
							item.setShare(true, this.shareFile.get(item.getRealPath()));						
						}
					}
				}
			}
		}catch(e){
			alert(e);
		}
	},
	doTreeClick: function(sender){				
		if (sender.file.isFile()) {
            if (this.requester !== undefined && this.requester.doModalResult) {
                this.requester.doModalResult(this.objRequestor,"open",mrOk,sender.getRealPath());
                this.onModal = false;
        		this.close();
        		var app = this.getApplication();
        		app.setActiveForm(this.formRequester);
        		this.formRequester.unblock();
            }
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
					if (item instanceof portalui_fileExplorerItem){
						if (item.getCaption() == caption){
							this.tFile.doSelectItem(item);
							return;
						}					
					}
				}
			}
		}else{
			//this.lvFile.getData(this.tFile.getSelectedItem().getRealPath()+"/"+caption);			
            if (this.requester !== undefined && this.requester.doModalResult) {
                this.requester.doModalResult(this.objRequestor,"open",mrOk,this.tFile.getSelectedItem().getRealPath()+"/"+caption);
                this.onModal = false;
        		this.close();
        		var app = this.getApplication();
        		app.setActiveForm(this.formRequester);
        		this.formRequester.unblock();
            }
		}
	},
	doSelectFile: function(sender, item){		
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
			if (item.file.isDir())  this.fileUtil.listFolderA(item.getPath());
		}
	},
	doClick: function(sender){
	    try{
    		if (sender == this.bOk) {
                if (this.tFile.getSelectedItem().file.isDir()){
                   if (this.requester !== undefined && this.requester.doModalResult) {
                        var tipe = this.lvFile.getSelectedItem()[4];
                        var caption = this.lvFile.getSelectedItem()[2];
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
                					if (item instanceof portalui_fileExplorerItem){
                						if (item.getCaption() == caption){
                							this.tFile.doSelectItem(item);
                							break;
                						}					
                					}
                				}
                			}             
                		}else
                            this.requester.doModalResult(this.objRequestor,"open",mrOk,this.tFile.getSelectedItem().getRealPath()+"/"+this.lvFile.getSelectedItem()[2]);                                       
                    }
                }else {
                    if (this.requester !== undefined && this.requester.doModalResult) {
                        this.requester.doModalResult(this.objRequestor,"open",mrOk,this.tFile.getSelectedItem().getRealPath());                
                    }            
                }
    		}else {
    		  
            }
    		//this.hide();
    		this.onModal = false;
    		this.close();
    		var app = this.getApplication();
    		app.setActiveForm(this.formRequester);
    		this.formRequester.unblock();
   		}catch(e){
   		   alert(e);
        }
	},
	doAfterResize: function(width, height){
		this.tFile.setHeight(height - 35);		
		this.lvFile.setHeight(height - 80);
		this.lvFile.setWidth(width - 330);
		this.bOk.setLeft(width - 190);
		this.bOk.setTop(height - 50);
		this.bCancel.setLeft(width - 100);
		this.bCancel.setTop(height - 50);
	},
	doRefreshFile: function(sender){
		this.tFile.setPath(this.ePath.getText());
	},
	initload: function(){
		try{
			this.fileMnu = new portalui_PopUpMenu(this);						
				var mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("New");
				var newMnu = mnu;
					mnu = new portalui_MenuItem(newMnu);
					mnu.setCaption("Folder");
					mnu.setData("FOLDER","EVENT");
					mnu.onClick.set(this,"doMenuClick");
					mnu = new portalui_MenuItem(newMnu);
					mnu.setCaption("File");					
					mnu.setData("FILE","EVENT");
					mnu.onClick.set(this,"doMenuClick");												
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("-");
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("Copy");
				mnu.setData("COPY","EVENT");
				mnu.onClick.set(this,"doMenuClick");												
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("Paste");
				mnu.setData("PASTE","EVENT");
				mnu.onClick.set(this,"doMenuClick");												
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("Delete");	
				mnu.setData("DELETE","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("-");
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("Refresh");	
				mnu.setData("REFRESH","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("-");
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("Open");
				mnu.setData("OPEN","EVENT");
				mnu.onClick.set(this,"doMenuClick");								
				mnu = new portalui_MenuItem(this.fileMnu);
				mnu.setCaption("Download");
				mnu.setData("DOWNLOAD","EVENT");
				mnu.onClick.set(this,"doMenuClick");								
			this.tFile.setPopUpMenu(this.fileMnu);					
			this.viewMnu = new portalui_PopUpMenu(this);
			var mnu = new portalui_MenuItem(this.viewMnu);
				mnu.setCaption("New");
				var newMnu = mnu;
					mnu = new portalui_MenuItem(newMnu);
					mnu.setCaption("Folder");
					mnu.setData("FOLDER","EVENT");
					mnu.onClick.set(this,"doMenuClick");
					mnu = new portalui_MenuItem(newMnu);
					mnu.setCaption("File");					
					mnu.setData("FILE","EVENT");
					mnu.onClick.set(this,"doMenuClick");												
				mnu = new portalui_MenuItem(this.viewMnu);
				mnu.setCaption("-");
				mnu = new portalui_MenuItem(this.viewMnu);
				mnu.setCaption("Copy");
				mnu.setData("COPY2","EVENT");
				mnu.onClick.set(this,"doMenuClick");												
				mnu = new portalui_MenuItem(this.viewMnu);
				mnu.setCaption("Paste");
				mnu.setData("PASTE2","EVENT");
				mnu.onClick.set(this,"doMenuClick");												
				mnu = new portalui_MenuItem(this.viewMnu);
				mnu.setCaption("Delete");	
				mnu.setData("DELETE2","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				mnu = new portalui_MenuItem(this.viewMnu);
				mnu.setCaption("-");
				mnu = new portalui_MenuItem(this.viewMnu);
				mnu.setCaption("Refresh");	
				mnu.setData("REFRESH","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				mnu = new portalui_MenuItem(this.viewMnu);
				mnu.setCaption("-");
				mnu = new portalui_MenuItem(this.viewMnu);
				mnu.setCaption("Open");
				mnu.setData("OPEN2","EVENT");
				mnu.onClick.set(this,"doMenuClick");								
				mnu = new portalui_MenuItem(this.viewMnu);
				mnu.setCaption("Download");
				mnu.setData("DOWNLOAD2","EVENT");
				mnu.onClick.set(this,"doMenuClick");												
				mnu = new portalui_MenuItem(this.viewMnu);
				mnu.setCaption("-");
				mnu = new portalui_MenuItem(this.viewMnu);
				mnu.setCaption("List");
				mnu.setData("LIST","EVENT");
				mnu.onClick.set(this,"doMenuClick");								
				mnu = new portalui_MenuItem(this.viewMnu);
				mnu.setCaption("Large Icon");
				mnu.setData("LARGE","EVENT");
				mnu.onClick.set(this,"doMenuClick");				
				this.lvFile.setPopUpMenu(this.viewMnu);								
				//this.refreshNetworkShare();
		}catch(e){
			systemAPI.alert(e);
		}
		
	},
	doRequestReady: function(sender, methodName, result){		
		try{
			if (sender == this.fileUtil){
				switch (methodName){								
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
							if (ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "ico" || ext == "bmp" || ext == "wbmp")
								this.lvFile.addItem(folder.length + i,fileList[i],"icon/explorer/"+ext+".ico","file",this.tFile.getSelectedItem().getRealPath() +"/"+fileList[i]);
							else 
								this.lvFile.addItem(folder.length + i,fileList[i],"icon/explorer/"+ext+".ico","file","icon/explorer/large/"+ext+".png");
						}
						this.lvFile.changeView(this.lvFile.viewType);
						//get share file						
					break;
					case "createDir" : 
						this.tFile.setUsrRoot(this.userDefined,this.root,this.rootCaption);
					break;
					case "deleteFile":
						if (result.search("error") != -1){
							systemAPI.alert(result);
						}else{
							if (this.fileUtil.isDir(this.tFile.getSelectedItem().getPath())){
								this.tFile.getSelectedItem().refresh();
								//this.fileUtil.listFolderA(this.tFile.getSelectedItem().getPath());
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
								//this.fileUtil.listFolderA(this.tFile.getSelectedItem().getPath());
							}else this.tFile.getSelectedItem().owner.refresh();
						}
					break;
				}
			}
		}catch(e){
			systemAPI.alert("Error Request Ready:"+e,result);
		}
	},
	doMenuClick: function(sender){
		try{
			var data = sender.getData();
			switch(data){
				case "FOLDER":
					if (this.pNew === undefined){
						this.pNew = new system_fUpload(this.owner,{bound:[130,50,400,100],caption:"New Folder"},this);
						this.pNew.uploader.hide();
					}
					this.pNew.eFile.setCaption("Folder");
					this.pNew.eFile.setText("");
					this.pNew.reinit(false, this.tFile.getSelectedItem().getPath());
					this.pNew.show();
					this.block();
					this.pNew.bringToFront();
				break;
				case "FILE":
					if (this.pNew === undefined){
						this.pNew = new system_fUpload(this.owner,{bound:[130,50,400,100],caption:"New File"},this);					
					}
					this.pNew.eFile.setCaption("File");
					this.pNew.eFile.setText("");
					this.pNew.reinit(true, this.tFile.getSelectedItem().getPath());
					this.block();
					this.pNew.show();
					this.pNew.bringToFront();
				break;
				case "COPY":
					var item = this.tFile.getSelectedItem();
				        if (this.tFile.root !=  item && item.getPath() !== undefined && item.getPath() != "roojaxnetwork" && !item.file.isDir())
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
								this.fileUtil.copyFileTo(this.copiedFile.getPath(), this.tFile.getSelectedItem().getPath()+"/copy of "+this.copiedFile.getCaption());
							else 
								this.fileUtil.copyFileTo(this.copiedFile.getPath(), this.tFile.getSelectedItem().getPath()+"/"+this.copiedFile.getCaption());
						}else systemAPI.alert("Anda tidak berhak menambah difolder ini.");
					}else {
						if (!this.tFile.getSelectedItem().owner.readOnly){
							if (this.fileUtil.isExist(this.tFile.getSelectedItem().owner.getPath()+"/"+this.copiedFile.getCaption()))
								this.fileUtil.copyFileTo(this.copiedFile.getPath(), this.tFile.getSelectedItem().owner.getPath()+"/copy of "+this.copiedFile.getCaption());
							else
								this.fileUtil.copyFileTo(this.copiedFile.getPath(), this.tFile.getSelectedItem().owner.getPath()+"/"+this.copiedFile.getCaption());
						}else systemAPI.alert("Anda tidak berhak menambah difolder ini.");
					}
				break;
				case "PASTE2":					
					if (this.copiedFile === undefined) return;
					
					if (this.fileUtil.isDir(this.tFile.getSelectedItem().getPath())){
						if (!this.tFile.getSelectedItem().readOnly){
							if (this.fileUtil.isExist(this.tFile.getSelectedItem().getPath()+"/"+this.copiedFile.filename))
								this.fileUtil.copyFileTo(this.copiedFile.path+"/"+this.copiedFile.filename, this.tFile.getSelectedItem().getPath()+"/copy of "+this.copiedFile.filename);
							else 
								this.fileUtil.copyFileTo(this.copiedFile.path+"/"+this.copiedFile.filename, this.tFile.getSelectedItem().getPath()+"/"+this.copiedFile.filename);
						}else systemAPI.alert("Anda tidak berhak menambah difolder ini.");
					}else {
						if (!this.tFile.getSelectedItem().owner.readOnly){
							if (this.fileUtil.isExist(this.tFile.getSelectedItem().owner.getPath()+"/"+this.copiedFile.filename))
								this.fileUtil.copyFileTo(this.copiedFile.path+"/"+this.copiedFile.filename, this.tFile.getSelectedItem().owner.getPath()+"/copy of "+this.copiedFile.filename);
							else
								this.fileUtil.copyFileTo(this.copiedFile.path+"/"+this.copiedFile.filename, this.tFile.getSelectedItem().owner.getPath()+"/"+this.copiedFile.filename);
						}else systemAPI.alert("Anda tidak berhak menambah difolder ini.");
					}
				break;
				case "DELETE":
					if (this.tFile.getSelectedItem() != this.tFile.root)
						this.fileUtil.deleteFile(this.tFile.getSelectedItem().getPath());
					else systemAPI.alert("Root tidak dapat dihapus");
				break;
				case "DELETE2":				
					this.fileUtil.deleteFile(this.tFile.getSelectedItem().getPath()+"/"+this.lvFile.getSelectedItem()[2]);					
				break;
				case "REFRESH":
					//if (this.tFile.getSelectedItem().getPath() == "roojaxnetwork")
						//this.refreshNetworkShare();
					//else 
						this.tFile.getSelectedItem().refresh();					
				break;
				case "LIST":
					this.lvFile.changeView("list");
				break;
				case "LARGE":
					this.lvFile.changeView("view");
				break;
				case "OPEN":
					//this.lvFile.getData(this.tFile.getSelectedItem().getRealPath());
					if (this.requester !== undefined && this.requester.doModalResult) {
                        this.requester.doModalResult(this.objRequestor,"open",mrOk,this.tFile.getSelectedItem().getRealPath());
                        this.hide();
                    }
				break;
				case "OPEN2":
				    if (this.requester !== undefined && this.requester.doModalResult) {
                        this.requester.doModalResult(this.objRequestor,"open",mrOk,this.tFile.getSelectedItem().getRealPath()+"/"+this.lvFile.getSelectedItem()[2]);
                        this.hide();
                    }
					//this.lvFile.getData(this.tFile.getSelectedItem().getRealPath()+"/"+this.lvFile.getSelectedItem()[2]);
				break;
				case "DOWNLOAD":
					this.lvFile.getData(this.tFile.getSelectedItem().getRealPath());
				break;
				case "DOWNLOAD2":
					this.lvFile.getData(this.tFile.getSelectedItem().getRealPath()+"/"+this.lvFile.getSelectedItem()[2]);
				break;
				case "SHARE":					
					if (this.pShare === undefined){						
						this.pShare = new system_fShare(this.owner,{bound:[130,50,400,100],caption:"Share Folder"},this);	
					}					
					this.pShare.eName.setText("");
					this.pShare.reinit(this.tFile.getSelectedItem().getRealPath());
					this.block();
					this.pShare.show();
					this.pShare.bringToFront();
				break;
			}
		}catch(e){
			alert(e);
		}
	},
	refresh: function(){
		this.tFile.getSelectedItem().refresh();
	},
	doModalResult: function(sender, event){
        switch(event){
			case "delete":
				this.fileUtil.deleteFile(this.tFile.getSelectedItem().getPath());
			break;
		}
	},
	refreshNetworkShare: function(){
		try{
			var data = this.dbLib.getDataProvider("select email, folder, sharename ,statusread from off_sharefile order by email",true);
			this.shareFile = new portalui_arrayMap();
			this.networkPath.clearChild();
			if (typeof data != "string"){
				var line, currentEmail = "";			
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					if (line.email == window.dataLogin.email){
						this.shareFile.set(line.folder, line.sharename);	
					}
					if (currentEmail != line.email){
						var networkPath = new portalui_fileExplorerItem(this.networkPath);
						networkPath.setCaption(line.email);							
						networkPath.setSeparator("/");
						networkPath.setFolderName(undefined);
						networkPath.setPath(undefined);
						networkPath.iconElm.style.background = "url("+networkPath.folderIcon+") top left no-repeat";											
						networkPath.setPopUpMenu(this.tFile.popUpMenu);
						networkPath.alreadyList = true;
						currentEmail = line.email;								
					}
					var share = new portalui_fileExplorerItem(networkPath);
					share.setCaption(line.sharename);							
					share.setSeparator("/");
					share.setFolderName(line.folder);
					share.readOnly = line.statusread == "r";
					share.setPath(this.systemDir+"/"+line.folder);
					share.iconElm.style.background = "url("+networkPath.folderIcon+") top left no-repeat";											
					share.setPopUpMenu(this.tFile.popUpMenu);
				}
			}
		}catch(e){
			systemAPI.alert("Get Share network",e);
		}
	},
	show: function(requester, caption, objReuqester, root, rootCaption, userDefined){
        this.requester = requester;
        this.objRequester = objReuqester;
        this.setCaption(caption);
        this.formRequester = this.getApplication().getActiveForm();
        window.system_fOpenDlg.prototype.parent.showModal.call(this);
        this.centerize();
        this.userDefined = userDefined;
        if (root !== undefined){
    		this.fileUtil.setFilename(this.systemDir + "/"+root);		
    		this.rootPath = this.systemDir + "/"+root;		
    		if (!this.fileUtil.isDir()){
    			this.fileUtil.createDir();
    		}else{
    			this.tFile.setUsrRoot(undefined,root,rootCaption);
    		}	
    		this.root = root;
    		this.rootCaption= root;
		}
		if (rootCaption !== undefined){
		   this.rootCaption = rootCaption;
        }
    }
});
window.system_fUpload = function(owner, options, parentPanel){
	if (owner){
		window.system_fUpload.prototype.parent.constructor.call(this,owner,options);
		this.setWidth(400);
		this.setHeight(100);
		this.centerize();
		uses("portalui_saiLabelEdit;portalui_button;portalui_uploader");
		this.eFile = new portalui_saiLabelEdit(this,{bound:[10,30,300,20],caption:"File"});
		this.uploader = new portalui_uploader(this,{bound:[320,30,70,20],onChange:[this,"doChange"],param1:"uploadTo",param2:owner.root,afterUpload:[this,"doAfterUpload"]});
		this.bOk = new portalui_button(this,{bound:[this.width - 200,70,80,20],caption:"OK",click:[this,"doClick"]});
		this.bCancel = new portalui_button(this,{bound:[this.width - 100,70,80,20],caption:"Cancel",click:[this,"doClick"]});
		
		this.bClose = new portalui_imageButton(this,{bound:[this.width - 45,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});
		this.bMin = new portalui_imageButton(this,{bound:[this.width - 70,1,27,16],image:"icon/dynpro/pnlmin.png",click:[this,"doClick"]});
		this.parentPanel = parentPanel;
		this.fileUtil = new util_file(undefined, parentPanel.tFile.getSelectedItem().getPath());
		this.fileUtil.addListener(this);
	}
};
window.system_fUpload.extend(portalui_panel);
window.system_fUpload.implement({
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
						this.fileUtil.createDir(this.eFile.getText());	
				}else systemAPI.alert("Nama folder atau file tidak boleh kosong.");
				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{
			if (sender == this.fileUtil){
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
		this.fileUtil.setFilenameA(path);
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

window.system_fShare = function(owner, options, parentPanel){
	if (owner){
		try{
			window.system_fShare.prototype.parent.constructor.call(this,owner,options);
			this.setWidth(400);
			this.setHeight(100);
			this.centerize();
			uses("portalui_saiLabelEdit;portalui_button;portalui_checkBox");
			this.eName = new portalui_saiLabelEdit(this,{bound:[10,30,300,20],caption:"Share Name"});
			this.rbRead = new portalui_checkBox(this,{bound:[20,53,80,20],caption:"writeable"});
			this.bRemove = new portalui_button(this,{bound:[this.width - 300,70,80,20],caption:"Remove",click:[this,"doClick"]});
			this.bOk = new portalui_button(this,{bound:[this.width - 200,70,80,20],caption:"Apply",click:[this,"doClick"]});
			this.bCancel = new portalui_button(this,{bound:[this.width - 100,70,80,20],caption:"Cancel",click:[this,"doClick"]});
			
			this.bClose = new portalui_imageButton(this,{bound:[this.width - 45,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});
			this.bMin = new portalui_imageButton(this,{bound:[this.width - 70,1,27,16],image:"icon/dynpro/pnlmin.png",click:[this,"doClick"]});
			this.parentPanel = parentPanel;
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);		
		}catch(e){
			alert("fShare :"+e);
		}
	}
};
window.system_fShare.extend(portalui_panel);
window.system_fShare.implement({
	doClick: function(sender){
		try{
			if (sender == this.bClose || sender == this.bMin || sender == this.bCancel){
				this.hide();
				this.parentPanel.unblock();
			}else if (sender == this.bOk){				
				if (this.eName.getText() != ""){			
					this.eventShare = "apply";
					this.dbLib.execQuery("insert into off_sharefile(email, folder, sharename, statusread)values('"+window.dataLogin.email+"','"+this.path+"','"+this.eName.getText()+"','"+(this.rbRead.isSelected() ? "w":"r")+"' )");
				}else systemAPI.alert("Nama <i>share</i> tidak boleh kosong.");				
			}else if (sender == this.bRemove){
				this.eventShare = "remove";
				this.dbLib.execQuery("delete from off_sharefile where email= '"+window.dataLogin.email+"' and folder = '"+this.path+"' ");
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
	reinit: function(path){
		this.path = path;		
		this.eName.setText(this.parentPanel.tFile.getSelectedItem().shareName);
		this.bRemove.setEnabled(this.parentPanel.tFile.getSelectedItem().share);		
		this.bOk.setEnabled(!this.parentPanel.tFile.getSelectedItem().share);		
	}
});
