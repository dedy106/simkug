window.app_sc_dashboard = function(owner,options)
{
	if (owner)
	{
		window.app_sc_dashboard.prototype.parent.constructor.call(this,owner,options);
		this.className  = "app_sc_dashboard";
		this.itemsValue = new arrayList();		
		this.setColor("");
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.dbLib2 = new util_dbLib();			
			this.pg1 = new pageControl(this,{bound:[0,0,this.width, this.height], childPage:["Notifikasi","Messaging","Informasi","Detail Informasi"]});
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
			this.msgBoard.ajax.setFrequency(60000);
			this.msgBoard.ajax.addListener(this);
			this.msgBoard.msg = new util_ajaxCaller("server/serverApp.php");
			this.msgBoard.msg.setFrequency(35000);
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
			
			
			this.prosesId = 1;
			
			if (BrowserDetect.browser == "Explorer" && BrowserDetect.version == 6){
				var b1 = $( this.getFullId() +"_logo");			
				DD_belatedPNG.fixPngArray([b1]);
			}
			
			var cnv = this.pg1.childPage[2].getClientCanvas();
			this.pg1.childPage[2].addStyle("background:#ffffff");
			this.docViewer = document.createElement("iframe");
			this.docViewer.frameBorder = 0;
			this.docViewer.id = this.getFullId()+"_viewer";
			this.docViewer.style.cssText = "width:100%;height:95%;scrolling=yes;";		
			cnv.appendChild(this.docViewer);
			
			var cnv2 = this.pg1.childPage[3].getClientCanvas();
			this.pg1.childPage[3].addStyle("background:#ffffff");
			this.docViewer2 = document.createElement("iframe");
			this.docViewer2.frameBorder = 0;
			this.docViewer2.id = this.getFullId()+"_viewer";
			this.docViewer2.style.cssText = "width:100%;height:95%;scrolling=yes;";		
			cnv2.appendChild(this.docViewer2);
			
			this.bPrint = new imageButton(this.pg1.childPage[3],{bound:[700,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
			this.bExcel = new imageButton(this.pg1.childPage[3],{bound:[723,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
			this.bEmail = new imageButton(this.pg1.childPage[3],{bound:[746,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});

			var sql="select no_konten,file_gambar,judul from konten where kode_klp='ART' order by tanggal";
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
					html=html+"<tr><td width='120'><img width=120 height=70 src='server/media/"+line.file_gambar+"' /></td><td width='240' valign='top'><a style='cursor:pointer;color:blue' onclick='$$("+this.resourceId +").doInformasi(event,\""+line.no_konten+"\");'>"+line.judul+"</a></td></tr>";
				}
				html=html+"</table>";
			}
			
			this.pWidget1 = new panel(this.pg1.childPage[2],{bound:[15,10,380,280], caption:"Topik Pilihan"});
            this.cnv = this.pWidget1.getClientCanvas();
            this.cnv.style.overflow = "auto";
            this.cnv.style.background = "#ffffff";
            this.cnv.style.top = "20";
            this.cnv.style.height = this.pWidget1.height - 20;
			this.cnv.innerHTML = html;
			
			//this.rearrangeChild(10, 22);
			setTipeButton(tbAllFalse);		
			this.setTabChildIndex();			
			this.dataProvider = new app_sc_remote_dataProvider(this.app._dbSetting);
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
window.app_sc_dashboard.extend(window.panel);
window.app_sc_dashboard.implement({	
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
	doInformasi: function(event,no_konten){
		try{
			uses("server_report_report");
			this.report = new server_report_report();
			var nama_report="server_report_sc_konten_rptInformasi";
			this.filter=" where no_konten='"+no_konten+"'";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer2.src = this.report.previewWithHeader(nama_report,this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pg1.setActivePage(this.pg1.childPage[3]);
		}catch(e){
			systemAPI.alert(e);
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
	doViewItem: function(event,no_bukti){
		try{
			uses("server_report_report");
			var nama_report="";
			if (no_bukti.substr(3,2)=="SO")
			{
				this.filter=" where a.no_kontrak='"+no_bukti+"'";
				nama_report="server_report_sc_rptKontrak";
			}
			if (no_bukti.substr(3,2)=="BM" || no_bukti.substr(3,2)=="KM")
			{
				this.filter=" where a.no_kas='"+no_bukti+"'";
				nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
			}
			if (no_bukti.substr(3,2)=="AK")
			{
				this.filter=" where a.no_akru='"+no_bukti+"'";
				nama_report="server_report_sc_rptBilling";
			}
			if (no_bukti.substr(3,2)=="IN")
			{
				this.filter=" where a.no_ar='"+no_bukti+"'";
				nama_report="server_report_sc_rptFormInvoice1";
			}
			
			this.report = new server_report_report();
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer2.src = this.report.previewWithHeader(nama_report,this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pg1.setActivePage(this.pg1.childPage[3]);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPrintClick : function(sender){
		switch (sender){
			case this.bPrint :
				var win = window.open("");
				win.document.write(loadCSS("server_util_laporan"));
				win.document.write(this.docViewer2.contentWindow.document.body.innerHTML);
				win.document.close();
			break;
			case this.bExcel :
				 var html = new server_util_arrayList();
				html.add(this.docViewer2.contentWindow.document.body.innerHTML);			
				html.add("xls");			
				html.add(new Date().valueOf());				
			    var win = window.open("");
				win.location = upDownHtml(html);
			break;
			case this.bEmail :
				this.mailFrm = new portalui_ConfirmMail(this);
				this.mailFrm.setBound((this.width/2)-125,this.height/2-100,250,100);
				this.mailFrm.setCaption(this.mailFrm.title);
				this.mailFrm.setBorder(3);
				this.mailFrm.onConfirmClick.set(this, "doConfirmClick");
			break;
		}
	},
	doConfirmClick: function(sender){
		try{
			
			if (sender === this.mailFrm.bConfirm){
				var to = this.mailFrm.getEmail();
				if (to !== ""){
					this.mailFrm.free();
					var d = new Date();
					var subject = this.app._namaForm;
					var pesan = loadCSS("server_util_laporan")+this.docViewer2.contentWindow.document.body.innerHTML;
					this.mail.send(undefined,to,subject,pesan);
				}else{
					systemAPI.alert("Alamat email belum diisi!");
				}
			}
		}catch(e){
			alert("[doConfirmClick]: sender= "+sender+"; error= "+e);
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

