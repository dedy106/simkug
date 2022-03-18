window.app_rra_dashboard = function(owner,options)
{
	if (owner)
	{
		window.app_rra_dashboard.prototype.parent.constructor.call(this,owner,options);
		this.className  = "app_rra_dashboard";
		this.itemsValue = new arrayList();		
		this.setColor("");
		try {			
			this.dbLib = this.app._dbLib;
			this.dbLib.addListener(this);
			this.pg1 = new pageControl(this,{bound:[0,0,this.width, this.height], childPage:["Informasi","Messaging","Viewer PDRK","Data Anggaran"]});
			var logo = window.parent && window.parent.app_logo_main ? window.parent.app_logo_main : "image/telkomindonesia.png";			
			this.infoPerusahaan = new image(this.pg1.childPage[0],{bound:[(this.width / 2)-200,(this.height / 2) - 150,400,300], image:logo, proportional:true});			
			this.pg1.childPage[0].setColor("#ffffff");		
			this.pg1.childPage[0].addStyle("border:1px solid #45b2f0");
			
			var namaapp = window.parent && window.parent.app_nama ? window.parent.app_nama : "RRA";						
									
			this.msgBoard = new control(this.pg1.childPage[0],{bound:[0,0,this.width,this.height-25]});			
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
			this.cnvInfo.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden;";
			this.msgBoard.getCanvas().appendChild(this.cnvInfo);
			eventOn(this.msgBoard.getCanvas(),"mouseup","$$(" + this.resourceId + ").eventMouseScrollUp(event);");			
			eventOn(this.msgBoard.scroll,"mousedown","$$(" + this.resourceId + ").eventMouseScrollDown(event);");			
			eventOn(this.msgBoard.scrollbarV,"mousedown","$$(" + this.resourceId + ").eventMouseScrollDown2(event);");
			
			this.msgBoard.ajax = new util_ajaxCaller("server/serverApp.php");
			this.msgBoard.ajax.setFrequency(60000);
			this.msgBoard.ajax.enableLoop(false);
			this.msgBoard.ajax.addListener(this);
			this.msgBoard.msg = new util_ajaxCaller("server/serverApp.php");
			this.msgBoard.msg.setFrequency(35000);
			this.msgBoard.msg.addListener(this);
			this.app._soNotification = {ajax:this.msgBoard.ajax, shareObject: this.dataProvider};
			this.app._soMsg = {ajax:this.msgBoard.msg, shareObject: this.dataProvider2};
			
			this.pMenu = new panel(this.pg1.childPage[1],{bound:[10,10,100,this.height - 45], border:pbLowered});
			this.bInbox = new button(this.pMenu,{bound:[10,10,80,20], caption:"Inbox", click:[this,"doClick"]});
			this.bOutbox = new button(this.pMenu,{bound:[10,11,80,20], caption:"Outbox", click:[this,"doClick"]});
			this.bCompose = new button(this.pMenu,{bound:[10,12,80,20], caption:"Compose", click:[this,"doClick"]});
			this.pMenu.rearrangeChild(10,23);
						
			this.pInbox = new panel(this.pg1.childPage[1],{bound:[120,10,this.width - 130,this.height - 45], border:pbLowered, visible:true});
			this.pOutbox = new panel(this.pg1.childPage[1],{bound:[120,10,this.width - 130,this.height - 45], border:pbLowered, visible:false});
			this.pMsg = new panel(this.pg1.childPage[1],{bound:[120,10,this.width - 130,this.height - 45], border:pbLowered, visible:false});			
			this.viewer = new reportViewer(this.pg1.childPage[2],{bound:[0,0,this.width - 3, this.height - 25]});
			//-------------------------------------------------------
			/*this.pWidget1 = new panel(this.pg1.childPage[2],{bound:[20,20,200,100], caption:"Widget 1"});
			this.cnv1 = this.pWidget1.getClientCanvas();
			this.cnv1.style.overflow = "auto";
			this.cnv1.style.background = "#ffffff";
			this.cnv1.style.top = "20";
			this.cnv1.style.height = this.pWidget1.height - 20;
			this.cnv1.innerHTML = "<table><tr><td>Data1</td><td>Data2</td></tr><table>";
			*/
			//----------- Panel Inbox
			this.pInbox.sg = new saiGrid(this.pInbox,{bound:[0,0,this.pInbox.width, this.pInbox.height - 25], colCount:6, colTitle:["Dari","Subyek","Tanggal","Attachment","Content","No Pesan"],
					readOnly:true, autoPaging:true, rowPerPage:25, colWidth:[[3,2,1,0],[150,100,this.pInbox.width - 360,80]],
					colHide:[[4,5],[true,true]],
					selectCell:[this,"doSelectCell"]
				});
			this.pInbox.sgn = new sgNavigator(this.pInbox,{bound:[0,this.pInbox.sg.height,this.pInbox.width, 25], grid:this.pInbox.sg, buttonStyle:bsView});
			this.pInbox.refresh  = new button(this.pInbox.sgn, {bound:[this.pInbox.width - 200, 2, 80, 20 ], caption:"Refresh", click:[this,"doClick"]});
			this.pInbox.reply  = new button(this.pInbox.sgn, {bound:[this.pInbox.width - 100, 2, 80, 20 ], caption:"Reply", click:[this,"doClick"]});
			this.pInbox.msgViewer = new control(this.pInbox,{bound:[0,this.pInbox.height / 2,this.pInbox.width,this.pInbox.height / 2], visible:false});
			this.pInbox.msgViewer.addStyle("overflow:auto;padding:10");
			//-----Panel Outbox
			this.pOutbox.sg = new saiGrid(this.pOutbox,{bound:[0,0,this.pOutbox.width, this.pOutbox.height-25], colCount:5, colTitle:["Kepada","Subyek","Tanggal","Attachment","Content"],
					readOnly:true, autoPaging:true, rowPerPage:25, colWidth:[[3,2,1,0],[150,100,this.pInbox.width - 360,80]],
					colHide:[[4],[true]],
					selectCell:[this,"doSelectCell"]
				});			
			this.pOutbox.sgn = new sgNavigator(this.pOutbox,{bound:[0,this.pOutbox.height-25,this.pOutbox.width, 25], grid:this.pOutbox.sg, buttonStyle:bsView});
			//---- Panel Msg
			this.pMsg.to = new saiCBBL(this.pMsg,{bound:[10,10,200,20], caption:"Kepada", multiSelection:false, tag:10,
				sql :["select nik, nama from rra_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],false, ["NIK","Nama"],"and","Daftar Karyawan",true]				
			});						
			this.pMsg.bAttach = new button(this.pMsg, {bound:[this.pMsg.width - 210,10,80,20], caption:"Attachment", click:[this,"doAttachment"]});			
			this.pMsg.bSend = new button(this.pMsg, {bound:[this.pMsg.width - 110,10,80,20], caption:"Send", click:[this,"doClick"]});			
			this.pMsg.subjek = new saiLabelEdit(this.pMsg,{bound:[10,11,this.pMsg.width - 30,20], caption:"Subyek",tag:11});						
			this.pMsg.pdrk = new saiCBBL(this.pMsg,{bound:[10,13,300,20], caption:"PDRK",tag:11, multiSelection:false,
				sql :["select no_pdrk, keterangan from rra_pdrk_m where kode_lokasi = '"+this.app._lokasi+"'  and flag_rfc < '2' ",["no_pdrk","keterangan"],false, ["No PDRK","Keterangan"],"and","Daftar PDRK",true]				
			});												
			this.pMsg.editor = new tinymceCtrl(this.pMsg,{bound:[10,12,this.pMsg.width - 30,this.pMsg.height - 80],tag:11});						
			this.pMsg.rearrangeChild(10,23);			
			this.pAttach = new panel(this.pMsg,{bound:[10,this.pMsg.editor.top + 80,this.pMsg.width - 30, this.pMsg.editor.height - 80], caption:"Attachment", visible:false});						
			this.pMsg.grid = new saiGrid(this.pAttach, {bound:[10,25,this.pAttach.width - 30, this.pAttach.height - 60], colCount:3,colTitle:["File","Browse","Deskrisi"], colFormat:[[1],[cfUpload]],
					colWidth:[[2,1,0],[250,80,230]], colReadOnly:[true,[0,1],[]], change:[this,"doGridChange"], tag:11, rowCount:1
			});			
			this.pMsg.grid.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
			this.pMsg.sgn = new sgNavigator(this.pAttach,{bound:[1,this.pAttach.height - 25,this.pAttach.width-3,25],buttonStyle:1, grid:this.pMsg.grid});
			this.pAttach.hide();
			this.activePanel = this.pInbox;
			this.bInbox.panel = this.pInbox;
			this.bOutbox.panel = this.pOutbox;
			this.bCompose.panel = this.pMsg;
								
			//----------------Panel Data ANggaran
			this.cb_akun = new saiCBBL(this.pg1.childPage[3],{bound:[10,10,200,20], caption:"Akun", multiSelection:true, 
				sql:["select kode_akun, nama from rra_masakun where kode_lokasi = '"+this.app._lokasi+"'", ["kode_akun","nama"],false,["Kode Akun","Nama"],"and","Daftar Akun",true]
			});
			this.cb_cc = new saiCBBL(this.pg1.childPage[3],{bound:[10,11,200,20], caption:"Cost Center", multiSelection:true, 
				sql:["select kode_cc, nama from rra_cc where kode_lokasi = '"+this.app._lokasi+"'", ["kode_cc","nama"],false,["Kode CC","Nama"],"and","Daftar Cost Center",true]
			});
			this.pGAR = new panel(this.pg1.childPage[3],{bound:[0,50,this.width, this.height - 80], caption:"Data Anggaran"});
			this.pGAR.grid = new saiGrid(this.pGAR, {bound:[0,20,this.width - 2, this.pGAR.height - 50], colCount:6, colTitle:"Akun,Cost Center, Plan, Release, Actual, Saldo", colWidth:[[4,3,2,1,0],[100,100,100,100,100,200]]});
			this.pGAR.sgn = new sgNavigator(this.pGAR, {bound:[0,this.pGAR.height - 45, this.width - 2, 25], grid:this.pGAR.grid, buttonStyle:2, pager:[this,"doPager"]});
			this.pg1.childPage[3].rearrangeChild(10,23);									
			//this.rearrangeChild(10, 22);
			setTipeButton(tbAllFalse);		
			this.setTabChildIndex();			
			this.dataProvider = new app_rra_remote_dataProvider(this.msgBoard.ajax,this.app._dbSetting);
			this.dataProvider.addListener(this);
			this.dataProvider2 = new app_rra_remote_dataProvider(this.msgBoard.msg,this.app._dbSetting);
			this.dataProvider2.addListener(this);
			this.standarLib = new util_standar();										
			this.proses = ["REVUBIS",
							"APPUBIS",
							"APPUBIS2",
							"REVKEEPSAP",
							"KEEPSAP",
							"UPDSAP",
							"REVGBIS",
							"APPGBIS",
							"REVFC",
							"APPFC",
							"SUKKA",
							"APPSK",
							"REVMA",
							"APPMA",
							"APPDRAFT",
							"DRAFT"];
			this.tCode = ["RA013R","RA014I","RA014I","RA028I","RA029I","RA020I","RA021I","RA015I","RA016I","RA017I|RA022I|RA026I","RA018I|RA023I|RA027I","RA025I","RA016I","DR02I","RA013I"];
			this.filterProses = [" and a.nik_buat = '"+this.app._userLog+"' ", 
								 " and a.nik_review = '"+this.app._userLog+"' ", 
								 " and (a.nik_appjust = '"+this.app._userLog+"' or a.nik_apppdrk3 = '"+this.app._userLog+"' or a.nik_appjust2 = '"+this.app._userLog+"' or a.nik_apppdrk32 = '"+this.app._userLog+"' or a.nik_app2 = '"+this.app._userLog+"' or a.nik_app1 = '"+this.app._userLog+"')", 
								 (this.app._kodeUbis == "UB25" ? "":" and a.kode_ubis = 'XXX'"),
								 (this.app._kodeUbis == "UB25" ? "":" and a.kode_ubis = 'XXX'"),
								 (this.app._kodeUbis == "UB25" ? "":" and a.kode_ubis = 'XXX'"),
								 " and a.kode_gubis = '"+this.app._kodeGubis+"' ",
								 " and a.kode_gubis = '"+this.app._kodeGubis+"' ",								 
								 (this.app._kodeUbis == "UB25" ? "":" and a.kode_ubis = 'XXX'"),
								 (this.app._kodeUbis == "UB25" ? "":" and a.kode_ubis = 'XXX'"),
								 " and a.kode_gubis = '"+this.app._kodeGubis+"' ",
								 " and a.kode_gubis = '"+this.app._kodeGubis+"' ",
								 (this.app._kodeUbis == "UB05" ? "":" and a.kode_ubis = 'XXX'"),
								 (this.app._kodeUbis == "UB05" ? "":" and a.kode_ubis = 'XXX'"),
								 " and a.kode_ubis = '"+this.app._kodeUbis+"' ",
								 " and a.kode_ubis = '"+this.app._kodeUbis+"' "
								];
			this.prosesId = 0;
			this.beda = false;
			this.lastData = new arrayMap();		
			//register ajax	
			this.dataProvider2.createShare("MESSAGE");			
			
			this.msgBoard.ajax.setRequester(this.dataProvider.getInfo(this.app._lokasi, this.proses[this.prosesId],this.filterProses[this.prosesId]));			
			this.msgBoard.ajax.connect(false); //aktifin script ini jika mo dipake
			this.msgBoard.ajax.enableLoop(false);
			this.totMsg = {terima:0, kirim:0};
			//this.msgBoard.msg.setRequester(this.dataProvider2.getMsg(this.app._userLog, this.app._lokasi));			
			//this.msgBoard.msg.connect(true);
		}catch(e){
			system.alert(this,e,"");
		}
	}
};
window.app_rra_dashboard.extend(window.panel);
window.app_rra_dashboard.implement({	
	refreshScreen: function(width, height){
		for (var i in this.pg1.childPage){
			this.pg1.childPage[i].setWidth(width);
			this.pg1.childPage[i].setHeight(height);
		}
		this.pMsg.setWidth(width - 130);
		this.pMsg.editor.setWidth(this.pMsg.width - 30)
		this.pMsg.editor.setHeight(this.pMsg.height - 60);
		this.pMsg.subjek.setWidth(this.pMsg.width - 30);
		this.pAttach.setWidth(this.pMsg.width -  30);
		this.pMsg.grid.setWidth(this.pAttach.width -  30);
		this.pMsg.grid.setHeight(this.pAttach.width -  60);
		this.pMsg.sgn.setWidth(this.pMsg.width -  3);		
		this.pMsg.bAttach.setLeft(this.pMsg.width - 210);
		this.pMsg.bSend.setLeft(this.pMsg.width - 110);
		this.msgBoard.setWidth(width);
		this.msgBoard.setHeight(height-20);
		this.viewer.setWidth(width - 5);
		this.viewer.setHeight(height - 25);
		this.msgBoard.scrollbarV.style.left = width - 10;						
		for (var i in this.lastData.objList){
			var node = $(i+"_d");
			if (node) node.style.width = width - 20;
		}
	},
	doSelectCell: function(sender, col, row){
		try{
			if (sender == this.pInbox.sg){
				this.pInbox.sg.setHeight(this.pInbox.height / 2 - 25);
				this.pInbox.sgn.setTop(this.pInbox.height / 2 - 25);
				var cnv = this.pInbox.msgViewer.getCanvas();
				cnv.innerHTML = "<table border=0 cellspacing=0 cellpadding=0 width='100%' height='auto'>"+
					"<tr bgcolor='#ccccc'><td>lampiran</td></tr>"+
					"<tr><td>"+urldecode(sender.cells(4,row))+"</td></tr>"+
					"</table>";
				this.pInbox.msgViewer.show();
				this.dbLib.execQueryA("update rra_pesan set flag_read = '1' where no_pesan= '"+sender.cells(5,row)+"' and kode_lokasi = '"+this.app._lokasi+"' and penerima = '"+this.app._userLog+"' ", undefined, this);
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
		if (sender == this.pInbox.refresh){
			var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
			"select a.no_pesan, a.kode_lokasi, to_char(a.tanggal,'DD-MM-YYYY HH24:MI') as tgl, a.pengirim, a.penerima, a.judul, a.keterangan, 0 as lampiran "+
			"	from rra_pesan a  where a.penerima = '"+this.app._userLog+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.tanggal desc ",
			"select a.no_pesan, a.kode_lokasi, to_char(a.tanggal,'DD-MM-YYYY HH24:MI') as tgl, a.pengirim, a.penerima, a.judul, a.keterangan, 0 as lampiran "+
			"	from rra_pesan a where a.pengirim = '"+this.app._userLog+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.tanggal desc "
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
			this.dbLib.execArraySQL(new server_util_arrayList({items:[
				"insert into rra_pesan(no_pesan, kode_lokasi, tanggal, pengirim, penerima, judul, keterangan, periode, flag_email, nik_user, tgl_input, flag_read, flag_sms, no_dokumen) values "+
				" ('"+new Date().valueOf()+"', '"+this.app._lokasi+"', now(), '"+this.app._userLog+"','"+this.pMsg.to.getText()+"', "+
				" '"+this.pMsg.subjek.getText()+"','"+urlencode(this.pMsg.editor.getCode())+"', '"+new Date().getThnBln()+"', '0','"+this.app._userLog+"',now(),0,0,'"+this.pMsg.pdrk.getText()+"')"
			]}), undefined, this);
		}else {
			sender.panel.show();	
			if (this.activePanel != sender.panel){	
				this.activePanel.hide();
				this.activePanel = sender.panel;					
			}
		}
	},
	doRequestReady: function(sender, methodName, result, callObj, connection, status){	
		if (status != undefined && status.status != 200) {
			systemAPI.alert(status.status,status.message);
			return ;
		}		
		if (sender == this.dataProvider && connection == this.msgBoard.ajax){			
			var line;
			try{				
				if (result instanceof portalui_arrayMap){
					eval("var data = "+result.get("data")+";");
					result.set("data",data);
				}else 
					eval("result = "+result+";");
			}catch(e){
				//system.alert(this,result+">>Stop autoupdate..."+e+":"+result.get("data"));
				//this.msgBoard.ajax.disconnect();				
				this.msgBoard.ajax.setRequester(this.dataProvider.getInfo(this.app._lokasi, this.proses[this.prosesId],this.filterProses[this.prosesId]));				
				this.msgBoard.ajax.enableLoop(false);
				this.msgBoard.ajax.callAsynch();
				return;
			}	
			try{								
				if (this.lastData === undefined) this.beda = true;						
				else {					
					this.beda = this.lastData.get(result.get("info")) != result.get("data").result[0].rs.rows[0].tot;														
				}
				var detail = new arrayList();
				if (this.beda){
					this.indexInfo = 0;
					//this.msgBoard.bringToFront();
					
					var line, data = result.get("data").result[1];							
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																				
						detail.add({jenis:line.jenis, posisi:line.posisi,no_bukti:line.no_bukti,keterangan:line.keterangan});
					}							
					this.addInfoItem(result.get("info"),{id:this.prosesId,caption:result.get("title"),total:result.get("data").result[0].rs.rows[0].tot, tcode:this.tCode[this.prosesId]}, detail);					
					this.lastData.set(result.get("info"),result.get("data").result[0].rs.rows[0].tot);
					
				}
				if (result.get("state") != "done"){
					this.prosesId++;							
					this.msgBoard.ajax.setRequester(this.dataProvider.getInfo(this.app._lokasi, this.proses[this.prosesId],this.filterProses[this.prosesId]));				
					this.msgBoard.ajax.enableLoop(false);
					this.msgBoard.ajax.callAsynch();
				}else {
					this.prosesId = 0;										
					this.beda = false;					
					this.msgBoard.ajax.setRequester(this.dataProvider.getInfo(this.app._lokasi, this.proses[this.prosesId],this.filterProses[this.prosesId]));
					this.msgBoard.ajax.enableLoop(false);
					this.msgBoard.ajax.callAsynch();
				}				
			}catch(e){
				//system.alert(this,e,result+":"+result.get("data"));
				error_log(e,result+":"+result.get("data"));
				this.msgBoard.ajax.disconnect();
			}
		}
		if (sender == this.dbLib && callObj == this){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							system.info(this,"Pesan terkirim ke "+ this.pMsg.to.getText(),"");
							this.pMsg.to.clear();
							this.pMsg.subjek.clear();
							this.pMsg.editor.setCode("<br>");
							this.dataProvider2.setShareValue("MSG",this.app._userLog+","+this.app._lokasi);
						}else system.alert(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	    if (sender == this.dataProvider2 && connection == this.msgBoard.msg){																		
			if (methodName == "createShare"){				
				sender.setShareValue("MSG",this.app._userLog+","+this.app._lokasi);
			}
			if (methodName == "setShareValue"){
				sender.register(this.msgBoard.msg.sessionId);
			}
			if (methodName == "register"){
				sender.getShareValue("MSG",this.msgBoard.msg.sessionId);
			}
			if (methodName == "getShareValue"){
				try {
					if (result == "MSG") {
						sender.getShareValue("MSG",this.msgBoard.msg.sessionId);
						return;
					}
					if (this.isVisible()){
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
					}
					sender.getShareValue("MSG",this.msgBoard.msg.sessionId);
				}catch(e){
					//this.app._mainForm(2,"Stop autoupdate..."+e+":"+result);
					//alert("Stop autoupdate..."+e+":"+result);
					//this.msgBoard.msg.disconnect();
					error_log(result);
					sender.getShareValue("MSG",this.msgBoard.msg.sessionId);
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
	eventMouseScrollUp: function(event){
		system.delMouseListener(this);
		this.scrollDown = false;
	},
	doSysMouseUp: function(x, y , button, buttonState){
		system.delMouseListener(this);
		this.scrollDown = false;
		system.showHint(x,y,"this.scrollDown",true);
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
		node.style.cssText = "position:relative;height:auto;border:1px solid #45b2f0";		
		var html =" <div style='position:absolute;top:0;left:0;width:100%;height:100%;background:#379bc5;"+bg+"'></div>";		
		html +=" <div id='"+id+"_g' style='position:absolute;top:0;left:0;width:100%;height:100%;background:url(image/whitegradsmall.png)0 bottom repeat-x;filter:alpha(opacity=100);opacity:0.9;moz-opacity:0.9'></div>";
		html += "<div id='"+id+"_h' style='position:relative;height:40;top:0;left:0;width:100%;background:url(image/themes/dynpro/roundpanelBg.png)0 0 repeat-x;'><img id='"+id+"_icon' width='30' height='25' style='position:absolute;left:5;top:10;width:30;height:25;' src='image/infodialog2.png'/><span style='font-weight:bold;position:absolute;left:35;top:15;width:"+(this.width-70).toString()+";height:25'>"+data.total+" "+data.caption+"</span><div style='position:absolute;left:100%;height:100%;top:0;width:25'><img id='"+id+"_btn' width='25' height='25' src='image/previous.png' style='position:absolute;left:-30;top:10;width:25;height:25;cursor:pointer' onclick='$$("+this.resourceId +").doItemClick(event,\""+id+"\");'/></div></div>";
		
		html += "<div id='"+id+"_d' style='position:relative;height:"+(detail.getLength() > 7 ? "150":"auto")+";width:"+(this.width - 15).toString()+";top:0;display:none;overflow:auto'>";		
		var line;
		var table = "<table border=0>";
		for (var i in detail.objList){
			line = detail.get(i);
			table += "<tr><td><a href='#"+line.no_bukti+"' onclick='$$("+this.resourceId+").doViewReport(\""+line.no_bukti+"\",\""+line.jenis+"\")'>"+line.no_bukti+"</a></td><td>:</td><td>"+line.jenis+"</td><td>:</td><td><input type='button' onclick='$$("+this.resourceId +").doOpenPDRK(event,\""+line.no_bukti+"\",\""+data.tcode+"\");' value='open'></input></td><td>:</td></td><td>"+line.keterangan+"</td></tr> ";//<div style='position:relative;width:100%;height:21;'>				
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
					target.src = "image/down.png";
					node.style.display = "";
				}else{
					 target.src = "image/previous.png";
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
	doViewReport: function(no_bukti,jenis){
		this.report = new server_report_report();
		this.filter = "where a.no_pdrk = '"+no_bukti+"'";
		this.filter2 = "/"+this.app._periode+"/"+jenis+"/"+this.app._kodeUbis+"/"+this.app._namaForm;									
		var url = [
			this.report.previewWithHeader("server_report_rra_rptPdrk1",this.filter, 1,  1, this.showFilter, this.app._namaLokasi,this.filter2),
			this.report.previewWithHeader("server_report_rra_rptPdrk2",this.filter, 1,  1, this.showFilter, this.app._namaLokasi,this.filter2),
			this.report.previewWithHeader("server_report_rra_rptPdrk3",this.filter, 1,  1, this.showFilter, this.app._namaLokasi,this.filter2),
			this.report.previewWithHeader("server_report_rra_rptSukka",this.filter, 1,  1, this.showFilter, this.app._namaLokasi,this.filter2)
			];
		this.viewer.previewMultiPage(url, true, ["PDRK-1","PDRK-2","PDRK-3","SUKKA"]);
		this.pg1.setActivePage(this.pg1.childPage[2]);
	},
	doOpenPDRK: function(event, no_pdrk, tcode){
		
	}
});
