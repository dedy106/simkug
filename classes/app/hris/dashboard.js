window.app_hris_dashboard = function(owner,options)
{
	if (owner)
	{
		window.app_hris_dashboard.prototype.parent.constructor.call(this,owner,options);
		this.className  = "app_hris_dashboard";
		this.itemsValue = new arrayList();		
		this.setColor("");
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.dbLib2 = new util_dbLib();			
			this.pg1 = new pageControl(this,{bound:[0,0,this.width, this.height], 
											childPage:["Notifikasi","CV Karyawan","Form Pengajuan","Posisi Pengajuan","Informasi","Detail Informasi"],
											pageChange:[this,"doTabChange"]});
			var logo = window.parent && window.parent.app_logo_main ? window.parent.app_logo_main : "image/gratika2.jpg";			
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
			/*
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
					readOnly:true, autoPaging:true, rowPerPage:25, colWidth:[[3,2,1,0],[150,100,this.pInbox.width - 430,150]],
					colHide:[[4,5],[true,true]],
					selectCell:[this,"doSelectCell"]
				
				});
			this.pInbox.sgn = new sgNavigator(this.pInbox,{bound:[0,this.pInbox.sg.height,this.pInbox.width, 25], grid:this.pInbox.sg, buttonStyle:bsView});
			this.pInbox.refresh  = new button(this.pInbox.sgn, {bound:[this.pInbox.width - 200, 2, 80, 20 ], caption:"Refresh", click:[this,"doClick"]});
			this.pInbox.reply  = new button(this.pInbox.sgn, {bound:[this.pInbox.width - 100, 2, 80, 20 ], caption:"Reply", click:[this,"doClick"]});
			this.pInbox.msgViewer = new control(this.pInbox,{bound:[0,this.pInbox.height / 2,this.pInbox.width,this.pInbox.height / 2], visible:false});
			this.pInbox.msgViewer.addStyle("overflow:auto;padding:10");			//-----Panel Outbox
			this.pOutbox.sg = new saiGrid(this.pOutbox,{bound:[0,0,this.pOutbox.width, this.pOutbox.height-25], colCount:4, colTitle:["Kepada","Subyek","Tanggal","Attachment"],
					readOnly:true, autoPaging:true, rowPerPage:25, colWidth:[[3,2,1,0],[150,100,this.pInbox.width - 430,150]]
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
					colWidth:[[2,1,0],[250,80,230]], colReadOnly:[true,[0,1],[]], change:[this,"doGridChange"],  rowCount:1
				});			
			this.pMsg.grid.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
			this.pMsg.sgn = new sgNavigator(this.pAttach,{bound:[1,this.pAttach.height - 25,this.pAttach.width-3,25],buttonStyle:1, grid:this.pMsg.grid});
			this.pAttach.hide();
			//-----------
			this.activePanel = this.pInbox;
			this.bInbox.panel = this.pInbox;
			this.bOutbox.panel = this.pOutbox;
			this.bCompose.panel = this.pMsg;
			*/
			//------------------------
			var cnv = this.pg1.childPage[1].getClientCanvas();
			this.pg1.childPage[1].addStyle("background:#ffffff");
			this.docViewer = document.createElement("iframe");
			this.docViewer.frameBorder = 0;
			this.docViewer.id = this.getFullId()+"_viewer";
			this.docViewer.style.cssText = "width:100%;height:95%;scrolling=yes;";		
			cnv.appendChild(this.docViewer);
			
			var cnv2 = this.pg1.childPage[2].getClientCanvas();
			this.pg1.childPage[2].addStyle("background:#ffffff");
			this.docViewer2 = document.createElement("iframe");
			this.docViewer2.frameBorder = 0;
			this.docViewer2.id = this.getFullId()+"_viewer";
			this.docViewer2.style.cssText = "width:100%;height:95%;scrolling=yes;";		
			cnv2.appendChild(this.docViewer2);
			
			var cnv3 = this.pg1.childPage[5].getClientCanvas();
			this.pg1.childPage[5].addStyle("background:#ffffff");
			this.docViewer3 = document.createElement("iframe");
			this.docViewer3.frameBorder = 0;
			this.docViewer3.id = this.getFullId()+"_viewer";
			this.docViewer3.style.cssText = "width:100%;height:95%;scrolling=yes;";		
			cnv3.appendChild(this.docViewer3);
			
			this.sg = new saiGrid(this.pg1.childPage[3],{bound:[1,11,this.pg1.width-5,this.pg1.height-60],colCount:10,tag:9,
		            colTitle:["No Bukti","Tanggal","Karyawan","Keterangan","Flag","Posisi","No Verifikasi","Tanggal","No Approval","Tanggal"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[60,90,60,90,60,40,180,150,60,90]],
					readOnly:true,autoAppend:true,defaultRow:1,
					colAlign: [[1,4,5,7,9], [alCenter, alCenter, alCenter, alCenter,alCenter]],
					dblClick:[this,"doDoubleClick"]});
			this.sgn = new portalui_sgNavigator(this.pg1.childPage[3],{bound:[1,this.pg1.height-45,this.pg1.width-1,25],buttonStyle:bsViewExt,grid:this.sg,pager:[this,"doPager"]});

			
			this.pager=50;
			
			this.prosesId = 1;
			
			if (BrowserDetect.browser == "Explorer" && BrowserDetect.version == 6){
				var b1 = $( this.getFullId() +"_logo");			
				DD_belatedPNG.fixPngArray([b1]);
			}
			
			this.pWidget1 = new panel(this.pg1.childPage[4],{bound:[15,10,380,280], caption:"Topik Pilihan"});
            this.cnv1 = this.pWidget1.getClientCanvas();
            this.cnv1.style.overflow = "auto";
            this.cnv1.style.background = "#ffffff";
            this.cnv1.style.top = "20";
            this.cnv1.style.height = this.pWidget1.height - 20;
			
			this.pWidget2 = new panel(this.pg1.childPage[4],{bound:[410,10,380,280], caption:"Info Perusahaan"});
            this.cnv2 = this.pWidget2.getClientCanvas();
            this.cnv2.style.overflow = "auto";
            this.cnv2.style.background = "#ffffff";
            this.cnv2.style.top = "20";
            this.cnv2.style.height = this.pWidget2.height - 20;
			
			this.pWidget3 = new panel(this.pg1.childPage[4],{bound:[15,300,380,200], caption:"Struktur Organisasi"});
            this.cnv3 = this.pWidget3.getClientCanvas();
            this.cnv3.style.overflow = "auto";
            this.cnv3.style.background = "#ffffff";
            this.cnv3.style.top = "20";
            this.cnv3.style.height = this.pWidget3.height - 20;
			
			this.pWidget4 = new panel(this.pg1.childPage[4],{bound:[410,300,380,200], caption:"Artikel"});
            this.cnv4 = this.pWidget4.getClientCanvas();
            this.cnv4.style.overflow = "auto";
            this.cnv4.style.background = "#ffffff";
            this.cnv4.style.top = "20";
            this.cnv4.style.height = this.pWidget3.height - 20;
			
			//this.rearrangeChild(10, 22);
			setTipeButton(tbAllFalse);		
			this.setTabChildIndex();			
			this.dataProvider = new app_hris_remote_dataProvider(this.app._dbSetting);
			this.dataProvider.addListener(this);
			this.standarLib = new util_standar();							
			this.filter=this.app._lokasi+"/"+this.app._periode+"/"+this.app._userLog+"/"+this.app._userStatus; 
			
			this.msgBoard.ajax.setRequester(this.dataProvider.getInfo(this.filter, (this.prosesId < 10 ? "0":"") + this.prosesId.toString()));
			this.msgBoard.ajax.connect(); //aktifin script ini jika mo dipake
			this.totMsg = {terima:0, kirim:0};
			this.msgBoard.msg.setRequester(this.dbLib2.getMultiDataProviderR(new server_util_arrayList({items:[
				"select a.no_pesan, a.kode_lokasi, date_format(a.tanggal,'%d-%m-%Y') as tgl, a.pengirim+'-'+b.nama as pengirim, a.penerima, a.judul, a.keterangan, 0 as lampiran "+
					"  from off_pesan a  "+
					"inner join gr_karyawan b on a.pengirim=b.nik "+
					"where a.penerima = '"+this.app._userLog+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.tanggal desc ",
				"select a.no_pesan, a.kode_lokasi, date_format(a.tanggal,'%d-%m-%Y') as tgl, a.pengirim, a.penerima+'-'+b.nama as penerima, a.judul, a.keterangan, 0 as lampiran "+
					"  from off_pesan a "+
					"inner join gr_karyawan b on a.penerima=b.nik "+
					"where a.pengirim = '"+this.app._userLog+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.tanggal desc "
			]})));
			
			this.beda = false;
			this.msgBoard.msg.connect();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_dashboard.extend(window.panel);
window.app_hris_dashboard.implement({	
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
	doTabChange: function (sender, page){
		if (page == this.pg1.childPage[1]){
			this.doView(this.app._userLog);
		}   
		if (page == this.pg1.childPage[2]){
			this.doNotifikasi(this.app._userLog);
		}    
		if (page == this.pg1.childPage[3]){
			this.doPosisi(this.app._userLog);
		}      
		if (page == this.pg1.childPage[4]){
			this.doInformasi();
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
	/*
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
	
	doClick: function(sender){
		if (sender == this.pInbox.refresh){
			var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
			"select a.no_pesan, a.kode_lokasi,date_format(a.tanggal,'%d-%m-%Y') as tgl, a.pengirim+'-'+b.nama as pengirim, a.penerima, a.judul, a.keterangan, 0 as lampiran "+
			"	from off_pesan a  "+
			"inner join gr_karyawan b on a.pengirim=b.nik "+
			"where a.penerima = '"+this.app._userLog+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.tanggal desc ",
			"select a.no_pesan, a.kode_lokasi,date_format(a.tanggal,'%d-%m-%Y') as tgl, a.pengirim, a.penerima, a.judul, a.keterangan, 0 as lampiran "+
			"	from off_pesan a where a.pengirim = '"+this.app._userLog+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.tanggal desc "
			]}), true);
			if (typeof data == "string"){
				error_log(data);
				return;
			}
			var result = data;
			this.pInbox.sg.clear();							
			var line;
			for (var i in result.result[0].rs.rows){
				line = result.result[0].rs.rows[i];
				this.pInbox.sg.appendData([line.pengirim, line.judul, line.tgl, line.lampiran, line.keterangan, line.no_pesan]);								
			}
			this.totMsg.terima = result.result[0].rs.rows.length;							
			this.pInbox.sgn.setTotalPage(Math.ceil(this.totMsg.terima / this.pInbox.sg.rowPerPage ));
			this.pInbox.sgn.rearrange();
			this.pOutbox.sg.clear();							
			var line;
			for (var i in result.result[1].rs.rows){
				line = result.result[1].rs.rows[i];
				this.pOutbox.sg.appendData([line.penerima, line.judul, line.tgl,line.lampiran, line.keterangan]);								
			}
			this.totMsg.kirim = result.result[1].rs.rows.length;
			this.pOutbox.sgn.setTotalPage(Math.ceil(this.totMsg.kirim / this.pOutbox.sg.rowPerPage ));
			this.pOutbox.sgn.rearrange();			
		}else if (sender == this.pInbox.reply){
			system.info(this,"Under Contruction!!!","");
			
		}else  if (sender == this.pMsg.bSend){
			if (this.standarLib.checkEmptyByTag(this, [10,11])){
				try{
					this.dbLib.execArraySQL(new server_util_arrayList({items:[
						"insert into off_pesan(no_pesan, kode_lokasi, tanggal, pengirim, penerima, judul, keterangan, periode, flag_email, nik_user, tgl_input, flag_read, flag_sms) values "+
						" ('"+new Date().valueOf()+"', '"+this.app._lokasi+"', now(), '"+this.app._userLog+"','"+this.pMsg.to.getText()+"', "+
						" '"+this.pMsg.subjek.getText()+"','"+urlencode(this.pMsg.editor.getCode())+"', '"+new Date().getThnBln()+"', '0','"+this.app._userLog+"',now(),0,0)"
					]}), undefined, this);
					system.info(this,"Message Berhasil Dikirimkan","");
					this.standarLib.clearByTag(this, ["10","11"],this.pMsg.subjek);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}else {
			sender.panel.show();	
			if (this.activePanel != sender.panel){	
				this.activePanel.hide();
				this.activePanel = sender.panel;					
			}
		}
	},
	*/
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
		/*
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
			*/
		
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
		var table = "<table border='0' cellpadding='2'>";
		for (var i in detail.objList){
			line = detail.get(i);										
			table += "<tr><td><a style='cursor:pointer;color:blue' onclick='$$("+this.resourceId +").doViewItem(event,\""+line.no_bukti+"\");'>"+line.no_bukti+"</div></td><td >"+line.keterangan+"</td></tr>";
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
	doView: function(nikuser){
		try{
			uses("server_report_report");
			this.report = new server_report_report();
			this.filter = "where a.nik='"+nikuser+"'";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			
			this.docViewer.src = this.report.previewWithHeader("server_report_hris_rptCvSk",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			//this.docViewer.src = this.report.previewWithHeader2("server_report_hris_rptNotifikasi",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
		}catch(e){
			systemAPI.alert(e);
		}
	},
	
	doInformasi: function(){
		try{
			
			var sql="select kode_klp,no_konten,file_gambar,judul from gr_konten order by kode_klp,tanggal";
			var data = this.dbLib.getDataProvider(sql,true);
			var html="";
			if (typeof data == "object" && data.rs.rows[0] != undefined)
			{
				var line;
				this.dataJU = data;
				var finish =this.dataJU.rs.rows.length;
				var html="<table width='360' border='0' cellspacing='2' cellpadding='1'>";
				for (var i=0;i<finish;i++){
					line = this.dataJU.rs.rows[i];	
					if (line.kode_klp=="TOP"){
						html=html+"<tr><td width='120'><img width=120 height=70 src='server/media/"+line.file_gambar+"' /></td><td width='240' valign='top'><a style='cursor:pointer;color:blue' onclick='$$("+this.resourceId +").doViewInformasi(event,\""+line.no_konten+"\");'>"+line.judul+"</a></td></tr>";
					}
				}
				html=html+"</table>";
			}
			this.cnv1.innerHTML = html;
			
			//var sql="select no_konten,file_gambar,judul from gr_konten where kode_klp='INF' order by tanggal";
			//var data = this.dbLib.getDataProvider(sql,true);
			var html="";
			if (typeof data == "object" && data.rs.rows[0] != undefined)
			{
				var line;
				this.dataJU = data;
				var finish =this.dataJU.rs.rows.length;
				
				var html="<table width='360' border='0' cellspacing='2' cellpadding='1'>";
				for (var i=0;i<finish;i++){
					line = this.dataJU.rs.rows[i];	
					if (line.kode_klp=="INF"){
						html=html+"<tr><td width='20'><img width=17 height=17 src='image/pin_green.png' /></td><td width='340' valign='top'><a style='cursor:pointer;color:blue' onclick='$$("+this.resourceId +").doViewInformasi(event,\""+line.no_konten+"\");'>"+line.judul+"</a></td></tr>";
					}
				}
				html=html+"</table>";
			}
			this.cnv2.innerHTML = html;
			
			//var sql="select no_konten,file_gambar,judul from gr_konten where kode_klp='ORG' order by tanggal";
			//var data = this.dbLib.getDataProvider(sql,true);
			var html="";
			if (typeof data == "object" && data.rs.rows[0] != undefined)
			{
				var line;
				this.dataJU = data;
				var finish =this.dataJU.rs.rows.length;
				
				var html="<table width='360' border='0' cellspacing='2' cellpadding='1'>";
				for (var i=0;i<finish;i++){
					line = this.dataJU.rs.rows[i];	
					if (line.kode_klp=="ORG"){
						html=html+"<tr><td width='20'><img width=17 height=17 src='image/org_green.png' /></td><td width='340' valign='top'><a style='cursor:pointer;color:blue' onclick='$$("+this.resourceId +").doViewInformasi(event,\""+line.no_konten+"\");'>"+line.judul+"</a></td></tr>";
					}
				}
				html=html+"</table>";
			}
			this.cnv3.innerHTML = html;
			
			//var sql="select no_konten,file_gambar,judul from gr_konten where kode_klp='ART' order by tanggal";
			//var data = this.dbLib.getDataProvider(sql,true);
			var html="";
			if (typeof data == "object" && data.rs.rows[0] != undefined)
			{
				var line;
				this.dataJU = data;
				var finish =this.dataJU.rs.rows.length;
				
				var html="<table width='360' border='0' cellspacing='2' cellpadding='1'>";
				for (var i=0;i<finish;i++){
					line = this.dataJU.rs.rows[i];	
					if (line.kode_klp=="ART"){
						html=html+"<tr><td width='20'><img width=17 height=17 src='image/book_green.png' /></td><td width='340' valign='top'><a style='cursor:pointer;color:blue' onclick='$$("+this.resourceId +").doViewInformasi(event,\""+line.no_konten+"\");'>"+line.judul+"</a></td></tr>";
					}
				}
				html=html+"</table>";
			}
			this.cnv4.innerHTML = html;	
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPosisi: function(nikuser){
		try{
			var filter="";
			if (this.app._userStatus=="U")
			{
				filter=" where a.nik_buat='"+nikuser+"' ";	
			}
			if (this.app._userStatus=="L")
			{
				filter= " inner join gr_karyawan_loker g on b.kode_loker=g.kode_loker and b.kode_lokasi=g.kode_lokasi "+
						" where g.nik='"+nikuser+"' ";	
			}
			var sql="select a.no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.nik_buat+'-'+b.nama as karyawan,a.keterangan,a.progress,a.posisi,d.no_ver,date_format(d.tanggal,'%d/%m/%Y') as tgl_ver,f.no_app,date_format(f.tanggal,'%d/%m/%Y') as tgl_app "+
					"	  from (select a.kode_lokasi,a.nik_buat,a.no_absen as no_bukti,a.tanggal,a.keterangan,case a.progress when '0' then 'Pengajuan' when '1' then 'Verifikasi' when '2' then 'Approval' end as posisi,a.progress "+
					"	  from gr_absen a "+
					"	  where a.kode_lokasi='"+this.app._lokasi+"' "+
					"	  union  "+
					"	  select a.kode_lokasi,a.nik_buat,a.no_cuti as no_bukti,a.tanggal,a.alasan as keterangan,case a.progress when '0' then 'Pengajuan' when '1' then 'Verifikasi' when '2' then 'Approval' end as posisi,a.progress  "+
					"	  from gr_cuti a "+
					"	  where a.kode_lokasi='"+this.app._lokasi+"' "+
					"	  union "+
					"	  select a.kode_lokasi,a.nik_buat,a.no_lembur as no_bukti,a.tanggal,a.keterangan,case a.progress when '0' then 'Pengajuan' when '1' then 'Verifikasi' when '2' then 'Approval' end as posisi,a.progress  "+
					"	  from gr_lembur a "+
					"	  where a.kode_lokasi='"+this.app._lokasi+"' "+
					"	  union "+
					"	  select a.kode_lokasi,a.nik_buat,a.no_spj as no_bukti,a.tanggal,a.keterangan,case a.progress when '0' then 'Pengajuan' when '1' then 'Verifikasi' when '2' then 'Approval' end as posisi,a.progress  "+
					"	  from gr_spj_m a "+
					"	  where a.kode_lokasi='"+this.app._lokasi+"' "+
					"	  union "+
					"	  select a.kode_lokasi,a.nik_buat,a.no_surat as no_bukti,a.tanggal,a.keterangan,case a.progress when '0' then 'Pengajuan' when '1' then 'Verifikasi' when '2' then 'Approval' end as posisi,a.progress  "+
					"	  from gr_surat a "+
					"	  where a.kode_lokasi='"+this.app._lokasi+"' "+
					"	  union "+
					"	  select a.kode_lokasi,a.nik_buat,a.no_ijin as no_bukti,a.tanggal,a.keterangan,case a.progress when '0' then 'Pengajuan' when '1' then 'Verifikasi' when '2' then 'Approval' end as posisi,a.progress  "+
					"	  from gr_ijin_m a "+
					"	  where a.kode_lokasi='"+this.app._lokasi+"' "+
					"	  union "+
					"	  select a.kode_lokasi,a.nik_buat,a.no_klaim as no_bukti,a.tanggal,a.keterangan,case a.progress when '0' then 'Pengajuan' when '1' then 'Verifikasi' when '2' then 'Approval' end as posisi,a.progress  "+
					"	  from gr_klaim_m a "+
					"	  where a.kode_lokasi='"+this.app._lokasi+"' "+
					"	  union "+
					"	  select a.kode_lokasi,a.nik_buat,a.no_kes as no_bukti,a.tanggal,a.keterangan,case a.progress when '0' then 'Pengajuan' when '1' then 'Verifikasi' when '2' then 'Approval' end as posisi,a.progress  "+
					"	  from gr_kes_m a "+
					"	  where a.kode_lokasi='"+this.app._lokasi+"' "+
					"	 ) a  "+
					"inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi  "+
					"left join gr_ver_d c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+ 
					"left join gr_ver_m d on c.no_ver=d.no_ver and d.kode_lokasi=c.kode_lokasi  "+
					"left join gr_app_d e on a.no_bukti=e.no_bukti and a.kode_lokasi=e.kode_lokasi  "+
					"left join gr_app_m f on e.no_app=f.no_app and e.kode_lokasi=f.kode_lokasi  "+filter+
					"order by a.tanggal desc";
			
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
			this.sgn.rearrange();
			this.doTampilData(1);
		
			} else this.sg.clear(1);			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilData: function(page) {
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		var flag="";
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];		
			if (line.progress=="0") {flag="<img width=17 height=17 src='image/flag_red.png' />.";}
			if (line.progress=="1") {flag="<img width=17 height=17 src='image/flag_yellow.png' />.";}
			if (line.progress=="2") {flag="<img width=17 height=17 src='image/flag_green.png' />.";}
			this.sg.appendData([line.no_bukti,line.tanggal,line.karyawan,line.keterangan,flag,line.posisi,line.no_ver,line.tgl_ver,line.no_app,line.tgl_app]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) 
	{
		try{
		
			var nama_report="";
			var filter="";
			var no_bukti=this.sg.cells(0,row);
			if (no_bukti.substr(3,3)=="ABS")
			{
				filter=" where a.no_absen='"+no_bukti+"'";
				nama_report="server_report_hris_rptAbsen";
			}
			if (no_bukti.substr(3,3)=="LBR")
			{
				filter=" where a.no_lembur='"+no_bukti+"'";
				nama_report="server_report_hris_rptLembur";
			}
			if (no_bukti.substr(3,3)=="CUT")
			{
				filter=" where a.no_cuti='"+no_bukti+"'";
				nama_report="server_report_hris_rptCuti";
			}
			if (no_bukti.substr(3,3)=="SPP")
			{
				filter=" where a.no_spj='"+no_bukti+"'";
				nama_report="server_report_hris_rptSpj";
			}
			if (no_bukti.substr(3,3)=="SUR")
			{
				filter=" where a.no_surat='"+no_bukti+"'";
				nama_report="server_report_hris_rptSurat";
			}
			if (no_bukti.substr(3,3)=="IJN")
			{
				filter=" where a.no_ijin='"+no_bukti+"'";
				nama_report="server_report_hris_rptIjin";
			}
			if (no_bukti.substr(3,3)=="REI")
			{
				filter=" where a.no_kes='"+no_bukti+"'";
				nama_report="server_report_hris_rptReimburse";
			}
			if (no_bukti.substr(3,3)=="KLM")
			{
				filter=" where a.no_klaim='"+no_bukti+"'";
				nama_report="server_report_hris_rptKlaim";
			}
			
			this.report = new server_report_report();
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer2.src = this.report.previewWithHeader(nama_report,filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pg1.setActivePage(this.pg1.childPage[3]);

			
		}catch(e){
			alert(e);
		}
	},
	doViewItem: function(event,no_bukti){
		try{
			uses("server_report_report");
			var nama_report="";
			var filter="";
			if (no_bukti.substr(3,3)=="ABS")
			{
				filter=" where a.no_absen='"+no_bukti+"'";
				nama_report="server_report_hris_rptAbsen";
			}
			if (no_bukti.substr(3,3)=="MAB")
			{
				filter=" where a.no_absen='"+no_bukti+"'";
				nama_report="server_report_hris_rptAbsen";
			}
			if (no_bukti.substr(3,3)=="LBR")
			{
				filter=" where a.no_lembur='"+no_bukti+"'";
				nama_report="server_report_hris_rptLembur";
			}
			if (no_bukti.substr(3,3)=="CUT")
			{
				filter=" where a.no_cuti='"+no_bukti+"'";
				nama_report="server_report_hris_rptCuti";
			}
			if (no_bukti.substr(3,3)=="SPP")
			{
				filter=" where a.no_spj='"+no_bukti+"'";
				nama_report="server_report_hris_rptSpj";
			}
			if (no_bukti.substr(3,3)=="SUR")
			{
				filter=" where a.no_surat='"+no_bukti+"'";
				nama_report="server_report_hris_rptSurat";
			}
			if (no_bukti.substr(3,3)=="IJN")
			{
				filter=" where a.no_ijin='"+no_bukti+"'";
				nama_report="server_report_hris_rptIjin";
			}
			if (no_bukti.substr(3,3)=="REI")
			{
				filter=" where a.no_kes='"+no_bukti+"'";
				nama_report="server_report_hris_rptReimburse";
			}
			if (no_bukti.substr(3,3)=="KLM")
			{
				filter=" where a.no_klaim='"+no_bukti+"'";
				nama_report="server_report_hris_rptKlaim";
			}
			if (no_bukti.substr(0,1)=="G")
			{
				filter=" where a.nik='"+no_bukti+"'";
				nama_report="server_report_hris_rptCvSk";
			}
			this.report = new server_report_report();
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer2.src = this.report.previewWithHeader(nama_report,filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pg1.setActivePage(this.pg1.childPage[2]);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doViewInformasi: function(event,no_konten){
		try{
			uses("server_report_report");
			this.report = new server_report_report();
			var nama_report="server_report_hris_rptInformasi";
			var filter=" where no_konten='"+no_konten+"'";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer3.src = this.report.previewWithHeader(nama_report,filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pg1.setActivePage(this.pg1.childPage[5]);
		}catch(e){
			systemAPI.alert(e);
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
	}
	
});

