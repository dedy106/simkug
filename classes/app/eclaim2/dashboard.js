window.app_eclaim2_dashboard = function(owner,options)
{
	if (owner)
	{
		window.app_eclaim2_dashboard.prototype.parent.constructor.call(this,owner,options);
		this.className  = "app_eclaim2_dashboard";
		this.itemsValue = new arrayList();		
		this.setColor("");
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.dbLib2 = new util_dbLib();			
			this.pg1 = new pageControl(this,{bound:[0,0,this.width, this.height], childPage:["Informasi","Inquery Klaim","Data Klaim","Riwayat Klaim","Detail Riwayat Klaim","Messaging"]});
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
			
			this.pMenu = new panel(this.pg1.childPage[5],{bound:[10,10,100,this.height - 45], border:pbLowered});
			this.bInbox = new button(this.pMenu,{bound:[10,10,80,20], caption:"Inbox", click:[this,"doClick"]});
			this.bOutbox = new button(this.pMenu,{bound:[10,11,80,20], caption:"Outbox", click:[this,"doClick"]});
			this.bCompose = new button(this.pMenu,{bound:[10,12,80,20], caption:"Compose", click:[this,"doClick"]});
			this.pMenu.rearrangeChild(10,23);
			
			this.pInbox = new panel(this.pg1.childPage[5],{bound:[120,10,this.width - 130,this.height - 45], border:pbLowered, visible:true});
			this.pOutbox = new panel(this.pg1.childPage[5],{bound:[120,10,this.width - 130,this.height - 45], border:pbLowered, visible:false});
			this.pMsg = new panel(this.pg1.childPage[5],{bound:[120,10,this.width - 130,this.height - 45], border:pbLowered, visible:false});
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
			
			//------------------------
			var cnv = this.pg1.childPage[3].getClientCanvas();
			this.pg1.childPage[3].addStyle("background:#ffffff");
			this.docViewer = document.createElement("iframe");
			this.docViewer.frameBorder = 0;
			this.docViewer.id = this.getFullId()+"_viewer";
			this.docViewer.style.cssText = "width:100%;height:100%";		
			cnv.appendChild(this.docViewer);
			
			var cnv2 = this.pg1.childPage[4].getClientCanvas();
			this.pg1.childPage[4].addStyle("background:#ffffff");
			this.docViewer2 = document.createElement("iframe");
			this.docViewer2.frameBorder = 0;
			this.docViewer2.id = this.getFullId()+"_viewer";
			this.docViewer2.style.cssText = "width:100%;height:100%";		
			cnv2.appendChild(this.docViewer2);
			
			uses("util_gridLib;util_filterRep;util_standar;server_report_report");
			this.gridLib = new util_gridLib();
			this.filterRep = new util_filterRep();
			this.standar = new util_standar();	
			/*
			this.sg1 = new saiGrid(this.pg1.childPage[1],{bound:[10,10,700,240],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:11});
			
			this.sg1 = new saiGrid(this.pg1.childPage[1],{bound:[10,11,700,260],
						colCount:4,tag:9,
						colTitle:["Filter","Type","Form","To"],
						colWidth:[[3,2,0],[150,150,200]], 
						readOnly:true,autoAppend:true,defaultRow:1,
						cellExit:[this,"doCellExit"],
						buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],
						selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],
						change:[this,"sg1onChange"],rowCount:12});*/
			this.sg1 = new saiGrid(this.pg1.childPage[1],{bound:[10,10,700,260],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[3,2,0],[150,150,250]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:12});			
			this.tahun=this.dbLib.getPeriodeFromSQL("select max(substring(periode,1,4)) as periode from tlk_klaim");
			this.polis=this.dbLib.getPeriodeFromSQL("select no_polis as periode from tlk_polis where tanggal in (select max(tanggal) as tanggal from tlk_polis)");
			this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tahun Kejadian","=",this.tahun));
			this.gridLib.SGEditData(this.sg1,1,new Array(0,1), new Array("Periode Kejadian","All"));
			this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("Penyebab Kerugian","All"));
			this.gridLib.SGEditData(this.sg1,3,new Array(0,1), new Array("Obyek Kerugian","All"));
			this.gridLib.SGEditData(this.sg1,4,new Array(0,1), new Array("Lokasi Kejadian","All"));
			this.gridLib.SGEditData(this.sg1,5,new Array(0,1), new Array("No Klaim","All"));
			this.gridLib.SGEditData(this.sg1,6,new Array(0,1), new Array("Alamat","All"));
			this.gridLib.SGEditData(this.sg1,7,new Array(0,1), new Array("No Berkas Telkom","All"));
			this.gridLib.SGEditData(this.sg1,8,new Array(0,1), new Array("Nilai Klaim","All"));
			this.gridLib.SGEditData(this.sg1,9,new Array(0,1), new Array("No Polis","All"));
			this.gridLib.SGEditData(this.sg1,10,new Array(0,1), new Array("Tanggal DOL","All"));
			this.gridLib.SGEditData(this.sg1,11,new Array(0,1,2), new Array("Sort By","=","No Klaim"));
		
			this.bTampil = new button(this.pg1.childPage[1],{bound:[10,290,80,20], caption:"Tampil", click:[this,"doTampil"]});
								
			this.sg = new saiGrid(this.pg1.childPage[2],{bound:[1,11,this.pg1.width-5,this.pg1.height-50],colCount:10,tag:9,
						colTitle:["No Klaim","No Dokumen","Tgl DOL","Lokasi","Obyek","Penyebab","Nilai Estimasi","Nilai Adjust","Nilai Deductable","Lokasi Kejadian"],
						colWidth:[[9,8,7,6,5,4,3,2,1,0],[250,100,100,100,150,150,150,80,180,100]], colFormat:[[8,7,6],[cfNilai,cfNilai, cfNilai]],
						readOnly:true,autoAppend:true,defaultRow:1,
						selectCell:[this,"doSgClick"]});
			this.sgn = new portalui_sgNavigator(this.pg1.childPage[2],{bound:[1,this.pg1.height-25,this.pg1.width-1,25],buttonStyle:bsViewExt,grid:this.sg,pager:[this,"doPager"]});
			
			this.prosesId = 1;
			this.pager=50;
			if (BrowserDetect.browser == "Explorer" && BrowserDetect.version == 6){
				var b1 = $( this.getFullId() +"_logo");			
				DD_belatedPNG.fixPngArray([b1]);
			}
				
			//this.rearrangeChild(10, 22);
			setTipeButton(tbAllFalse);		
			this.setTabChildIndex();			
			this.dataProvider = new app_eclaim2_remote_dataProvider(this.app._dbSetting);
			this.dataProvider.addListener(this);
			this.standarLib = new util_standar();							
			this.filter5=this.app._lokasi+"/"+this.tahun+"/"+this.app._userLog+"/"+this.app._userStatus+"/"+this.app._kodeLok; 
			this.msgBoard.ajax.setRequester(this.dataProvider.getInfo(this.filter5, (this.prosesId < 10 ? "0":"") + this.prosesId.toString()));
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
window.app_eclaim2_dashboard.extend(window.panel);
window.app_eclaim2_dashboard.implement({	
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
				this.dbLib.execQueryA("update off_pesan set flag_read = '1' where no_pesan= '"+sender.cells(5,row)+"' and kode_lokasi = '"+this.app._lokasi+"' and penerima = '"+this.app._userLog+"' ", undefined, this);
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
			]}), undefined, this);
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
				this.msgBoard.ajax.setRequester(this.dataProvider.getInfo(this.filter5, (this.prosesId < 10 ? "0":"") + this.prosesId.toString()));
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
				this.msgBoard.ajax.setRequester(this.dataProvider.getInfo(this.filter5, (this.prosesId < 10 ? "0":"") + this.prosesId.toString()));
				this.msgBoard.ajax.callAsynch();
			}catch(e){
				this.msgBoard.ajax.setRequester(this.dataProvider.getInfo(this.filter5, (this.prosesId < 10 ? "0":"") + this.prosesId.toString()));
				this.msgBoard.ajax.callAsynch();
			}
			
		}
		if (sender == this.dbLib && this == errCode){
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
		var table = "<table border=0 class='kotak'>";
		for (var i in detail.objList){
			line = detail.get(i);										
			table += "<tr><td padding=5><a style='cursor:pointer;color:blue' onclick='$$("+this.resourceId +").doViewItem(event,\""+line.no_bukti+"\");'>"+line.no_bukti+"</div></td><td padding=5>"+line.keterangan+"</td></tr>";
			//<div style='position:relative;width:100%;height:21;'><span style='position:relative;top:3;left:0;width:auto;white-space:nowrap'>&nbsp;&nbsp;"+line.jenis+" "+line.no_bukti +" - "+line.keterangan+"</span></div>";
		}
		table += "</table>";
		
		html += table;
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
	doViewItem: function(event,noklaim){
		try{
			uses("server_report_report");
			this.report = new server_report_report();
			this.filter = "where a.no_klaim='"+noklaim+"'";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer.src = this.report.previewWithHeader("server_report_eclaim2_rptRwyKlaimSum",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.docViewer2.src = this.report.previewWithHeader("server_report_eclaim2_rptRwyKlaim",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pg1.setActivePage(this.pg1.childPage[3]);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipseClick:function(sender, col, row)
	{
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Penyebab Kerugian",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_sebab,nama from tlk_sebab where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_sebab) from tlk_sebab  where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_sebab","nama"),"and",new Array("kode","nama"));
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data Obyek Kerugian",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_obyek,nama from tlk_obyek where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_obyek) from tlk_obyek  where  kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_obyek","nama"),"and",new Array("kode","nama"));
		}
		if (row == 4)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi Kejadian",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lok,nama from tlk_lokasi where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_lok) from tlk_lokasi  where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_lok","nama"),"and",new Array("kode","nama"));
		}
		if (row == 5)
		{
			this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					  this.filterRep.filterStr("a.kode_ttg","=",this.app._kodeTtg,this.app._kodeTtg,"and")+
					  this.filterRep.filterStr("substring(a.periode,1,4)",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and") +
					  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +
					  this.filterRep.filterStr("a.kode_sebab",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					  this.filterRep.filterStr("a.kode_obyek",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
					  this.filterRep.filterStr("a.kode_lok",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
			this.filterRep.ListDataSGFilter(this, "Data Berkas",this.sg1, this.sg1.row, this.sg1.col,
													  "select a.no_klaim,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal from tlk_klaim a "+this.filter,
													  "select count(a.no_klaim) from tlk_klaim a "+this.filter,
													  new Array("a.no_klaim","a.no_dokumen","a.tanggal"),"and",new Array("no berkas","no dokumen","tanggal"));
		}
		if (row == 9)
		{
			this.filterRep.ListDataSGFilter(this, "Data Polis",this.sg1, this.sg1.row, this.sg1.col,
													  "select no_polis,keterangan from tlk_polis where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(no_polis) from tlk_lokasi  where  kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("no_polis","keterangan"),"and",new Array("No Polis","Keterangan"));
		}
	},
	doSelectCell:function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8,9,10,11),new  Array("123","123","123","123","123","123","13","13","123","123","123","3"));			
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5,6,7,8,9,10,11),new  Array(0,0,2,2,2,2,4,4,4,2,1,0));
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct substring(periode,1,4) from tlk_klaim order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from tlk_klaim order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row === 11)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["No Klaim","Penyebab","Obyek","Lokasi","No Berkas","Nilai","DOL","Alamat"]);
		}
	},
	doTampil: function() {
		
		this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
					  this.filterRep.filterStr("a.kode_ttg","=",this.app._kodeTtg,this.app._kodeTtg,"and")+
					  this.filterRep.filterStr("substring(a.periode,1,4)",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and") +
					  this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and") +
					  this.filterRep.filterStr("a.kode_sebab",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
					  this.filterRep.filterStr("a.kode_obyek",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
					  this.filterRep.filterStr("a.kode_lok",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
					  this.filterRep.filterStr("a.no_klaim",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and");
		if (this.sg1.getCell(1,6)=="=") 
		{
			this.filter=this.filter+" and a.alamat like '%"+this.sg1.getCell(2,6)+"%'";
		}
		if (this.sg1.getCell(1,7)=="=") 
		{
			this.filter=this.filter+" and a.no_dokumen like '%"+this.sg1.getCell(2,7)+"%'";
		}
		if (this.sg1.getCell(1,8)=="=") 
		{
			this.filter=this.filter+" and a.nilai ="+this.sg1.getCell(2,8);
		}
		if (this.sg1.getCell(1,8)=="Range") 
		{
			this.filter=this.filter+" and a.nilai between "+this.sg1.getCell(2,8)+" and "+this.sg1.getCell(3,8);
		}
		if (this.sg1.getCell(1,10)=="=") 
		{
			this.filter=this.filter+" and a.tanggal='"+this.sg1.getCellDateValue(2,10)+"' ";
		}
		if (this.sg1.getCell(1,10)=="Range") 
		{
			this.filter=this.filter+" and a.tanggal between '"+this.sg1.getCellDateValue(2,10)+"' and '"+this.sg1.getCellDateValue(3,10)+"' ";
		}
		var order="";
		if (this.sg1.getCell(2,11)=="No Klaim") {order=" order by a.no_klaim desc ";}	
		if (this.sg1.getCell(2,11)=="Penyebab") {order=" order by a.kode_sebab,a.no_klaim ";}
		if (this.sg1.getCell(2,11)=="Obyek") {order=" order by a.kode_obyek,a.no_klaim ";}
		if (this.sg1.getCell(2,11)=="Lokasi") {order=" order by a.kode_lok,a.no_klaim ";}
		if (this.sg1.getCell(2,11)=="Alamat") {order=" order by alamat,a.no_klaim ";}
		if (this.sg1.getCell(2,11)=="No Berkas") {order=" order by a.no_dokumen,a.no_klaim ";}
		if (this.sg1.getCell(2,11)=="Nilai") {order=" order by a.nilai,a.no_klaim ";}
		if (this.sg1.getCell(2,11)=="DOL") {order=" order by a.tanggal,a.no_klaim ";}
		var sql="select a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, e.nilai_ddct as nilai_bayar,a.alamat "+
			" from tlk_klaim a "+
			" inner join tlk_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+
			" inner join tlk_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
			" inner join tlk_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
			" left join tlk_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim and e.status = '1' "+this.filter+order;
		
		var data = this.dbLib.getDataProvider(sql,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
			this.sgn.rearrange();
			this.doTampilData(1);
			this.pg1.setActivePage(this.pg1.childPage[2]);
		} else this.sg.clear(1);
	},
	
	doTampilData: function(page) {
		
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.no_klaim,line.no_dokumen,line.tanggal,line.nama_lok,line.nama_obyek,line.nama_sebab,floatToNilai(line.nilai),floatToNilai(line.nilai_adjust),floatToNilai(line.nilai_bayar),line.alamat]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doSgClick: function(sender, col , row) 
	{
		try{
		
			this.report = new server_report_report();
			this.filter = "where a.no_klaim='"+this.sg.cells(0,row)+"'";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer.src = this.report.previewWithHeader("server_report_eclaim2_rptRwyKlaimSum",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
			this.docViewer2.src = this.report.previewWithHeader("server_report_eclaim2_rptRwyKlaim",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
			this.pg1.setActivePage(this.pg1.childPage[3]);
		}catch(e){
			alert(e);
		}
	},
	sg1onChange: function(sender, col , row){
	    if (col==1)
		{
	     if (this.sg1.getCell(1,row)=="All")
		 {
			this.sg1.setCell(2,row,"");
			this.sg1.setCell(3,row,"");
		 }
		} 
	}
	
});


