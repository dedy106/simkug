window.app_inv_dashboard = function(owner,options)
{
	if (owner)
	{
		window.app_inv_dashboard.prototype.parent.constructor.call(this,owner,options);
		this.className  = "app_inv_dashboard";
		this.itemsValue = new arrayList();		
		this.setColor("");
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.dbLib2 = new util_dbLib();			
			this.pg1 = new pageControl(this,{bound:[0,0,this.width, this.height], childPage:["Informasi","Messaging","Share File"]});
			var logo = window.parent && window.parent.app_logo_main ? window.parent.app_logo_main : "image/telkomindonesia.png";			
			this.infoPerusahaan = new image(this.pg1.childPage[0],{bound:[(this.width / 2) - 200,(this.height / 2 ) - 150,400,300], image:logo, proportional:true});
			this.pg1.childPage[0].setColor("#ffffff");		
			
			var namaapp = window.parent && window.parent.app_nama ? window.parent.app_nama : "RRA";			
			var keteranganapp = window.parent && window.parent.app_keterangan ? window.parent.app_keterangan : "Reprogramming Anggaran";			
			this.msgBoard = new control(this.pg1.childPage[0],{bound:[0,0,this.width,this.height]});
			this.cnvInfo = this.msgBoard.getCanvas();
			
			this.msgBoard.scrollbarV = document.createElement("div");
			this.msgBoard.scrollbarV.id = this.msgBoard.getResourceId() +"_scrollV";
			this.msgBoard.scrollbarV.style.cssText = "position:absolute;left:"+(this.width-10).toString()+";top:0;width:10;height:100%;z-index:2;overflow:hidden";
			this.msgBoard.scroll = document.createElement("div");
			this.msgBoard.scroll.style.cssText = "background:#ecb631;position:absolute;left:0;top:0;width:10;height:100%;z-index:2";
			this.msgBoard.scrollbarV.appendChild(this.msgBoard.scroll);			
			this.msgBoard.getCanvas().appendChild(this.msgBoard.scrollbarV);
			
			this.cnvInfo = document.createElement("div");
			this.cnvInfo.id = this.msgBoard.getResourceId() +"_client";
			this.cnvInfo.style.cssText = "position:absolute;left:0;top:0;width:"+this.width+";height:100%;overflow:hidden;";
			this.msgBoard.getCanvas().appendChild(this.cnvInfo);
			eventOn(this.msgBoard.scroll,"mousedown","$$(" + this.resourceId + ").eventMouseScrollDown(event);");
			eventOn(this.msgBoard.scrollbarV,"mousedown","$$(" + this.resourceId + ").eventMouseScrollDown2(event);");
			
			this.msgBoard.ajax = new util_ajaxCaller("server/serverApp.php");
			this.msgBoard.ajax.setFrequency(10000);
			this.msgBoard.ajax.addListener(this);
			this.msgBoard.msg = new util_ajaxCaller("server/serverApp.php");
			this.msgBoard.msg.setFrequency(10000);
			this.msgBoard.msg.addListener(this);
			
			this.pMenu = new panel(this.pg1.childPage[1],{bound:[10,10,100,this.height - 45], border:pbLowered});
			this.bInbox = new button(this.pMenu,{bound:[10,10,80,20], caption:"Inbox", click:[this,"doClick"]});
			this.bOutbox = new button(this.pMenu,{bound:[10,11,80,20], caption:"Outbox", click:[this,"doClick"]});
			this.bCompose = new button(this.pMenu,{bound:[10,12,80,20], caption:"Compose", click:[this,"doClick"]});
			this.pMenu.rearrangeChild(10,23);
			
			this.pInbox = new panel(this.pg1.childPage[1],{bound:[120,10,this.width - 130,this.height - 45], border:pbLowered, visible:true});
			this.pOutbox = new panel(this.pg1.childPage[1],{bound:[120,10,this.width - 130,this.height - 45], border:pbLowered, visible:false});
			this.pMsg = new panel(this.pg1.childPage[1],{bound:[120,10,this.width - 130,this.height - 45], border:pbLowered, visible:false});
			//----------- Panel Inbox
			this.pInbox.sg = new saiGrid(this.pInbox,{bound:[0,0,this.pInbox.width, this.pInbox.height-25], colCount:6, colTitle:["Dari","Subyek","Tanggal","Attachment","Content","No Pesan"],
					readOnly:true, autoPaging:true, rowPerPage:25, colWidth:[[3,2,1,0],[150,100,this.pInbox.width - 360,80]],
					colHide:[[4,5],[true,true]],
					selectCell:[this,"doSelectCell"]
				
				});
			this.pInbox.sgn = new sgNavigator(this.pInbox,{bound:[0,this.pInbox.sg.height,this.pInbox.width, 25], grid:this.pInbox.sg, buttonStyle:bsView});
			this.pInbox.reply  = new button(this.pInbox.sgn, {bound:[this.pInbox.width - 100, 2, 80, 20 ], caption:"Reply", click:[this,"doClick"]});
			this.pInbox.msgViewer = new control(this.pInbox,{bound:[0,this.pInbox.height / 2,this.pInbox.width,this.pInbox.height / 2], visible:false});
			this.pInbox.msgViewer.addStyle("overflow:auto;padding:10");			//-----Panel Outbox
			this.pOutbox.sg = new saiGrid(this.pOutbox,{bound:[0,0,this.pOutbox.width, this.pOutbox.height-25], colCount:4, colTitle:["Kepada","Subyek","Tanggal","Attachment"],
					readOnly:true, autoPaging:true, rowPerPage:25, colWidth:[[3,2,1,0],[150,100,this.pInbox.width - 360,80]]
				});
			this.pOutbox.sgn = new sgNavigator(this.pOutbox,{bound:[0,this.pOutbox.height-25,this.pOutbox.width, 25], grid:this.pOutbox.sg, buttonStyle:bsView});
			//---------- Msg
			this.pMsg.to = new saiCBBL(this.pMsg,{bound:[10,10,200,20], caption:"Kepada", multiSelection:false, tag:10,
				sql :["select nik, nama from gr_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],false, ["NIK","Nama"],"and","Daftar Karyawan",true]				
			});						
			this.pMsg.bSend = new button(this.pMsg, {bound:[this.pMsg.width - 110,10,80,20], caption:"Send", click:[this,"doClick"]});			
			this.pMsg.subjek = new saiLabelEdit(this.pMsg,{bound:[10,11,this.pMsg.width - 30,20], caption:"Subyek",tag:11});						
			uses("tinymceCtrl",true);
			this.pMsg.editor = new tinymceCtrl(this.pMsg,{bound:[10,12,this.pMsg.width - 30,this.pMsg.height - 60],tag:11});						
			this.pMsg.rearrangeChild(10,23);
			this.pMsg.bAttach = new button(this.pMsg, {bound:[this.pMsg.width - 110,this.pMsg.editor.top + 10,80,20], caption:"Attachment", click:[this,"doAttachment"]});			
			this.pAttach = new panel(this.pMsg,{bound:[10,this.pMsg.editor.top + 80,this.pMsg.width - 30, this.pMsg.editor.height - 80], caption:"Attachment", visible:false});						
			this.pMsg.grid = new saiGrid(this.pAttach, {bound:[10,25,this.pAttach.width - 30, this.pAttach.height - 60], colCount:3,colTitle:["File","Browse","Deskrisi"], colFormat:[[1],[cfUpload]],
					colWidth:[[2,1,0],[250,80,230]], colReadOnly:[true,[0,1],[]], change:[this,"doGridChange"], tag:11, rowCount:1
				});			
			this.pMsg.grid.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
			this.pMsg.sgn = new sgNavigator(this.pAttach,{bound:[1,this.pAttach.height - 25,this.pAttach.width-3,25],buttonStyle:1, grid:this.pMsg.grid});
			this.pAttach.hide();
			//-----------
			this.activePanel = this.pInbox;
			this.bInbox.panel = this.pInbox;
			this.bOutbox.panel = this.pOutbox;
			this.bCompose.panel = this.pMsg;
			
			this.tFile = new portalui_fileExplorer(this.pg1.childPage[2],{bound:[0,0,300,this.height-25],showFile:true, select:[this,"doSelectFile"], dataReady:[this,"doDataReady"],dblClick:[this,"doTreeClick"]});
			this.lvFile = new portalui_listView(this.pg1.childPage[2],{bound:[300,0,this.width - 320,this.height-25], showIcon:true, dblClick:[this,"doDblClick"]});
			this.fileUtil = new util_file(undefined);		
			this.fileUtil.addListener(this);
			this.rootDir = this.tFile.rootDir;		
			this.fileUtil.setFilename(this.rootDir + "/server/media/documents/inv/" + this.app._userLog);		
			this.rootPath = this.rootDir + "/server/media/documents/inv/" + this.app._userLog;		
			this.prosesId = 1; 
			if (!this.fileUtil.isDir()){
				this.fileUtil.createDir();
			}else{
				this.tFile.setUsrRoot(this.app._userLog,"server/media/documents/inv/" + this.app._userLog,"My Document");
			}		
			this.initload();
			
			
			if (BrowserDetect.browser == "Explorer" && BrowserDetect.version == 6){
				var b1 = $( this.getFullId() +"_logo");			
				DD_belatedPNG.fixPngArray([b1]);
			}
				
			//this.rearrangeChild(10, 22);
			setTipeButton(tbAllFalse);		
			this.setTabChildIndex();			
			this.dataProvider = new app_inv_remote_dataProvider(this.app._dbSetting);
			this.dataProvider.addListener(this);
			this.standarLib = new util_standar();							
			this.filter=this.app._lokasi+"/"+this.app._periode+"/"+this.app._userLog+"/"+this.app._userStatus; 
		
			this.msgBoard.ajax.setRequester(this.dataProvider.getInfo(this.filter, (this.prosesId < 10 ? "0":"") + this.prosesId.toString()));
			this.msgBoard.ajax.connect(); //aktifin script ini jika mo dipake
			this.totMsg = {terima:0, kirim:0};
			this.msgBoard.msg.setRequester(this.dbLib2.getMultiDataProviderR(new server_util_arrayList({items:[
				"select a.no_pesan, a.kode_lokasi, date_format(a.tanggal,'%d-%m-%Y') as tgl, a.pengirim, a.penerima, a.judul, a.keterangan, 0 as lampiran "+
					"  from off_pesan a  where a.penerima = '"+this.app._userLog+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.tanggal desc ",
				"select a.no_pesan, a.kode_lokasi, date_format(a.tanggal,'%d-%m-%Y') as tgl, a.pengirim, a.penerima, a.judul, a.keterangan, 0 as lampiran "+
					"  from off_pesan a where a.pengirim = '"+this.app._userLog+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.tanggal desc "
			]})));
			
			this.beda = false;
			this.msgBoard.msg.connect();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_inv_dashboard.extend(window.panel);
window.app_inv_dashboard.implement({	
	doSelectCell: function(sender, col, row){
		try{
			if (sender == this.pInbox.sg){
				this.pInbox.sg.setHeight(this.pInbox.height / 2 - 25);
				this.pInbox.sgn.setTop(this.pInbox.height / 2 - 25);
				var cnv = this.pInbox.msgViewer.getCanvas();
				cnv.innerHTML = "<table border=0 cellspacing=0 cellpadding=0 width='100%' height='auto'>"+
					"<tr><td>"+urldecode(sender.cells(4,row))+"</td></tr>"+
					"</table>";
				this.pInbox.msgViewer.show();
				this.dbLib.execQueryA("update off_pesan set flag_read = '1' where no_pesan= '"+sender.cells(5,row)+"' and kode_lokasi = '"+this.app._lokasi+"' and penerima = '"+this.app._userLog+"' ");
			}
		}catch(e){
			alert(e);
		}
	},
	doAttachment :function (sender){				
		this.pAttach.setVisible(!this.pAttach.visible);
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{			
        	if (sender == this.pMsg.grid && col == 1){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.pMsg.grid.columns.get(1).param2 + data.tmpfile;
                this.pMsg.grid.cells(0,row, data.filedest);
            }
         }catch(e){
            alert(e+" "+data);
         }
    },
	doClick: function(sender){
		if (sender == this.pInbox.reply){
			system.info(this,"Under Contruction!!!","");
			
		}else  if (sender == this.pMsg.bSend){
			this.dbLib.execArraySQL(new server_util_arrayList({items:[
				"insert into off_pesan(no_pesan, kode_lokasi, tanggal, pengirim, penerima, judul, keterangan, periode, flag_email, nik_user, tgl_input, flag_read, flag_sms) values "+
				" ('"+new Date().valueOf()+"', '"+this.app._lokasi+"', now(), '"+this.app._userLog+"','"+this.pMsg.to.getText()+"', "+
				" '"+this.pMsg.subjek.getText()+"','"+urlencode(this.pMsg.editor.getCode())+"', '"+new Date().getThnBln()+"', '0','"+this.app._userLog+"',now(),0,0)"
			]}));
		}else {
			sender.panel.show();	
			if (this.activePanel != sender.panel){	
				this.activePanel.hide();
				this.activePanel = sender.panel;					
			}
		}
	},
	doRequestReady: function(sender, methodName, result, errCode, connection){
	
		if (sender == this.dataProvider){
			var beda = true;
			try{
				if (result instanceof portalui_arrayMap){
					var line;
					eval("var data = "+result.get("data")+";");
					result.set("data",data);
				}else eval("result = "+result+";");
			}catch(e){
				//system.alert(e,result,"Stop autoupdate...");
				//this.msgBoard.ajax.disconnect();
				this.msgBoard.ajax.setRequester(this.dataProvider.getInfo(this.filter, (this.prosesId < 10 ? "0":"") + this.prosesId.toString()));
				this.msgBoard.ajax.callAsynch();
			}	
			try{
				if (this.lastData === undefined) 
					this.beda = true;						
				else {
					this.beda = this.lastData.get(result.get("info")) != result.get("data").result[0].rs.rows[0].tot;
				}
				var detail = new arrayList();
				if (this.beda){
					this.indexInfo = 0;
					//this.msgBoard.bringToFront();
					var line, data = result.get("data").result[1];
					if (data == undefined) return;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];
						detail.add({jenis:"",no_bukti:line.no_bukti, keterangan:line.keterangan});
					}
					this.addInfoItem(result.get("info"), {id:this.prosesId, caption:result.get("title"), total:result.get("data").result[0].rs.rows[0].tot},detail );
				}
				//this.msgBoard.ajax.disconnect();
				if (result.get("state") != "DONE" ){
					this.prosesId++;
				}else {
					this.prosesId = 1;
					this.beda = false;
				}
				this.msgBoard.ajax.setRequester(this.dataProvider.getInfo(this.filter, (this.prosesId < 10 ? "0":"") + this.prosesId.toString()));
				this.msgBoard.ajax.callAsynch();
			}catch(e){
				this.msgBoard.ajax.setRequester(this.dataProvider.getInfo(this.filter, (this.prosesId < 10 ? "0":"") + this.prosesId.toString()));
				this.msgBoard.ajax.callAsynch();
			}
			
		}
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	    if (sender == this.dbLib2 && connection == this.msgBoard.msg){					
				if (methodName == "getMultiDataProvider"){
					if (errCode == 200){
						try {
							eval("result = "+result+";");							
							if (this.totMsg.terima != result.result[0].rs.rows.length){
								this.pInbox.sg.clear();							
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.pInbox.sg.appendData([line.pengirim, line.judul, line.tgl, line.lampiran, line.keterangan, line.no_pesan]);								
								}
								this.totMsg.terima = result.result[0].rs.rows.length;							
								this.pInbox.sgn.setTotalPage(Math.ceil(this.totMsg.terima / this.pInbox.sg.rowPerPage ));
								this.pInbox.sgn.rearrange();
							}
							if (this.totMsg.kirim != result.result[1].rs.rows.length){
								this.pOutbox.sg.clear();							
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.pOutbox.sg.appendData([line.penerima, line.judul, line.tgl,line.lampiran, line.keterangan]);								
								}
								this.totMsg.kirim = result.result[1].rs.rows.length;
								this.pOutbox.sgn.setTotalPage(Math.ceil(this.totMsg.kirim / this.pOutbox.sg.rowPerPage ));
								this.pOutbox.sgn.rearrange();
							}
						}catch(e){
							alert(e);
						}
					}
				}
			}
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
						this.tFile.setUsrRoot(this.app._userLog,"classes/app/rra/documents/" + this.app._userLog,"My Document");
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
			var pos = {x:x, y:y};
			
			if (this.scrollDown){										
				var top = parseFloat(this.msgBoard.scroll.style.top) + (pos.y - this.scrollPos.y);
				var areaHeight = parseFloat(this.cnvInfo.offsetHeight) - parseFloat(this.msgBoard.scroll.style.height);
				var cTop = (top * (parseFloat(this.cnvInfo.scrollHeight) - parseFloat(this.cnvInfo.offsetHeight) )) / areaHeight;
				if (top + parseFloat(this.msgBoard.scroll.style.height) > parseFloat(this.cnvInfo.offsetHeight))
				{
					top = parseFloat(this.cnvInfo.offsetHeight) - parseFloat(this.msgBoard.scroll.style.height);
					cTop = parseFloat(this.cnvInfo.scrollHeight) - parseFloat(this.cnvInfo.offsetHeight);
				}	
				if (top < 0){
					top = 0;
					cTop = 0;
				}
				this.msgBoard.scroll.style.top = top;
				this.scrollPos.y = pos.y;									
				this.cnvInfo.scrollTop = cTop;				
			}	
			
		}catch(e){
			alert(e);
		}
	},	
	eventMouseScrollUp: function(event){
		this.scrollDown = false;		
	},
	addInfoItem: function(id, data, detail){
		var node = $(id);
		this.indexInfo++;		
		if (node != undefined) this.cnvInfo.removeChild(node);
		if (data.total == 0) return;
		node = document.createElement("div");
		node.id = id;
		if (this.indexInfo % 2 == 0) var bg = "filter:alpha(opacity=50);opacity:0.5;moz-opacity:0.5";
		else var bg = "filter:alpha(opacity=20);opacity:0.2;moz-opacity:0.2";
		node.style.cssText = "position:relative;height:auto;border:1px solid #45b2f0;";		
		var html =" <div style='position:absolute;top:0;left:0;width:100%;height:100%;background:#379bc5;"+bg+"'></div>";		
		html +=" <div id='"+id+"_g' style='position:absolute;top:0;left:0;width:100%;height:100%;background:url(image/whitegradsmall.png)0 bottom repeat-x;filter:alpha(opacity=100);opacity:0.9;moz-opacity:0.9'></div>";
		html += "<div id='"+id+"_h' style='position:relative;height:40;top:0;left:0;width:100%;background:url(image/themes/dynpro/roundpanelBg.png)0 0 repeat-x;'><img id='"+id+"_icon' width='30' height='25' style='position:absolute;left:5;top:10;width:30;height:25;' src='image/infodialog2.png'/><span style='font-weight:bold;position:absolute;left:35;top:15;width:"+(this.width-70).toString()+";height:25'>&nbsp;"+data.total+" "+data.caption+"</span><img id='"+id+"_btn' width='25' height='25' src='image/left.png' style='position:absolute;left:"+(this.width-45).toString()+";top:10;width:25;height:25;cursor:pointer' onclick='$$("+this.resourceId +").doItemClick(event,\""+id+"\");'/></div>";
		
		html += "<div id='"+id+"_d' style='position:relative;height:"+(detail.getLength() > 7 ? "150":"auto")+";width:100%;top:0;display:none;overflow:auto'>";		
		var line;
		for (var i in detail.objList){
			line = detail.get(i);
			html += "<div style='position:relative;width:100%;height:21;'><span style='position:relative;top:3;left:0;width:auto;white-space:nowrap'>&nbsp;&nbsp;"+line.jenis+" "+line.no_bukti +" - "+line.keterangan+"</span></div>";
		}
		html += "</div>";
		node.innerHTML = html; 
		this.cnvInfo.appendChild(node);
		var h = this.cnvInfo.scrollHeight ? this.cnvInfo.scrollHeight:this.cnvInfo.offsetHeight;
		h = (this.cnvInfo.offsetHeight / ((h / this.cnvInfo.offsetHeight) + 1));
		if (parseFloat(this.cnvInfo.scrollHeight) > parseFloat(this.cnvInfo.offsetHeight)) {
			this.msgBoard.scroll.style.display = "";				
		}else {
			h = parseFloat(this.cnvInfo.offsetHeight);
			this.msgBoard.scroll.style.display = "none";
		}
		this.msgBoard.scroll.style.height = h;			
		if (BrowserDetect.browser == "Explorer" && BrowserDetect.version == 6){
			var b1 = $( id +"_g");
			var b2 = $( id +"_h");
			var b3 = $( id +"_icon");
			var b4 = $( id +"_btn");				
			DD_belatedPNG.fixPngArray([b1,b2,b3,b4]);
		}
	},	
	doItemClick: function(event,id){
		try{
			var target = event.target || event.srcElement;			
			var node = $(id+"_d");
			if (node) {
				if (node.style.display == "none"){
					target.src = "image/down2.png";
					node.style.display = "";
				}else{
					 target.src = "image/left.png";
					 node.style.display = "none";
				}
				
			}
			var h = this.cnvInfo.scrollHeight ? this.cnvInfo.scrollHeight:this.cnvInfo.offsetHeight;
			h = (this.cnvInfo.offsetHeight / (( h / this.cnvInfo.offsetHeight) + 1));
			if (parseFloat(this.cnvInfo.scrollHeight) > parseFloat(this.cnvInfo.offsetHeight)) {
				this.msgBoard.scroll.style.display = "";				
			}else {
				h = parseFloat(this.cnvInfo.offsetHeight);
				this.msgBoard.scroll.style.display = "none";
			}
			if (h + parseFloat(this.msgBoard.scroll.style.top) > parseFloat(this.cnvInfo.offsetHeight)) {
				this.msgBoard.scroll.style.top = parseFloat(this.cnvInfo.offsetHeight) - h;
			}
			this.msgBoard.scroll.style.height = h;							
		}catch(e){
			alert(e);
		}
	},
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
		if (sender.file.isFile()) this.lvFile.getData(sender.getRealPath());
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
			this.lvFile.getData(this.tFile.getSelectedItem().getRealPath()+"/"+caption);
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
				mnu.setCaption("Add/Remove Share");
				mnu.setData("SHARE","EVENT");
				mnu.onClick.set(this,"doMenuClick");								
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
				mnu.setCaption("Share");
				mnu.setData("SHARE","EVENT");
				mnu.onClick.set(this,"doMenuClick");
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
				
				this.networkPath = new portalui_fileExplorerItem(this.tFile);
				this.networkPath.setCaption("Network");							
				this.networkPath.setSeparator("/");
				this.networkPath.setFolderName("");
				this.networkPath.setPath("roojaxnetwork");			
				this.networkPath.iconElm.style.background = "url(icon/explorer/network.png) top left no-repeat";											
				this.networkPath.setPopUpMenu(this.tFile.popUpMenu);				
				this.networkPath.alreadyList = true;
				this.refreshNetworkShare();
		}catch(e){
			systemAPI.alert(e);
		}
		
	},	
	doMenuClick: function(sender){
		try{
			var data = sender.getData();
			switch(data){
				case "FOLDER":
					if (this.pNew === undefined){
						this.pNew = new app_rra_fUpload(this.owner,{bound:[130,50,400,100],caption:"New Folder"},this);
						this.pNew.uploader.hide();
					}
					this.pNew.setCaption(this.tFile.getSelectedItem().caption);
					this.pNew.eFile.setCaption("Folder");
					this.pNew.eFile.setText("");
					this.pNew.reinit(false, this.tFile.getSelectedItem().getPath());
					this.pNew.show();
					this.block();
					this.pNew.bringToFront();
				break;
				case "FILE":
					if (this.pNew === undefined){
						this.pNew = new app_rra_fUpload(this.owner,{bound:[130,50,400,100],caption:"New File"},this);					
					}
					this.pNew.setCaption(this.tFile.getSelectedItem().caption);
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
						this.pShare = new app_rra_fShare(this.owner,{bound:[130,50,400,100],caption:"Share Folder"},this);	
					}					
					this.pNew.setCaption(this.tFile.getSelectedItem().caption);
					this.pShare.eName.setText("");
					this.pShare.reinit(this.tFile.getSelectedItem().getRealPath(),this.tFile.getSelectedItem());
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
					if (line.email == this.app._userLog){
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

window.app_rra_fUpload = function(owner, options, parentPanel){
	if (owner){
		window.app_rra_fUpload.prototype.parent.constructor.call(this,owner,options);
		this.setWidth(400);
		this.setHeight(100);
		this.centerize();
		uses("portalui_saiLabelEdit;portalui_button;portalui_uploader");
		this.eFile = new portalui_saiLabelEdit(this,{bound:[10,30,300,20],caption:"File"});
		this.uploader = new portalui_uploader(this,{bound:[320,30,70,20],onChange:[this,"doChange"],param1:"uploadTo",param2:"classes/app/rra/documents/",afterUpload:[this,"doAfterUpload"]});
		this.bOk = new portalui_button(this,{bound:[this.width - 200,70,80,20],caption:"OK",click:[this,"doClick"]});
		this.bCancel = new portalui_button(this,{bound:[this.width - 100,70,80,20],caption:"Cancel",click:[this,"doClick"]});
		
		this.bClose = new portalui_imageButton(this,{bound:[this.width - 45,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});
		this.bMin = new portalui_imageButton(this,{bound:[this.width - 70,1,27,16],image:"icon/dynpro/pnlmin.png",click:[this,"doClick"]});
		this.parentPanel = parentPanel;
		this.fileUtil = new util_file(undefined, parentPanel.tFile.getSelectedItem().getPath());
		this.fileUtil.addListener(this);
	}
};
window.app_rra_fUpload.extend(portalui_panel);
window.app_rra_fUpload.implement({
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

window.app_rra_fShare = function(owner, options, parentPanel){
	if (owner){
		try{
			window.app_rra_fShare.prototype.parent.constructor.call(this,owner,options);
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
window.app_rra_fShare.extend(portalui_panel);
window.app_rra_fShare.implement({
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
