window.app_lab_dashboard = function(owner,options)
{
	if (owner)
	{
		window.app_lab_dashboard.prototype.parent.constructor.call(this,owner,options);
		this.className  = "app_lab_dashboard";
		this.itemsValue = new arrayList();		
		this.setColor("");
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.dbLib2 = new util_dbLib();		
			uses("frame;feed;timer;util_ajaxPush");			
			this.pg1 = new pageControl(this,{bound:[0,0,this.width, this.height], childPage:["Dashboard","Konten"], pageChange:[this,"doPageChange"]});
			//this.p1 = new panel(this.pg1.childPage[0],{bound:[5,5,this.width - 23, this.height-10], caption:""});
			//this.p2 = new panel(this.pg1.childPage[1],{bound:[5,5,this.width - 23, this.height-10], caption:""});
			//var logo = window.parent && window.parent.app_logo_main ? window.parent.app_logo_main : "image/jamboo2.png";			
			//this.infoPerusahaan = new image(this.pg1.childPage[0],{bound:[(this.width / 2) - 200,(this.height / 2 ) - 150,400,300], image:logo, proportional:true});
			//this.pg1.childPage[0].setColor("#ffffff");		
			//this.pg1.childPage[1].setColor("#ffffff");
			
			this.feed = new feed(this.pg1.childPage[0],{bound:[0,0,this.width, this.height]});
			this.feed.setUrl("server/getNotifikasi.php");
			this.feed.addItem({id:"news", color:"#2099FB", animated:true, icon1:'icon/sai/rss.png', caption:"NEWS", content:"list apps that support Passbook", url:"server/getList.php", interval: 3000, listener:this});
			this.feed.addItem({id:"document", color:"#CC33CC", animated:false, icon1:'icon/sai/document.png', caption:"DOCUMENTS", content:"list apps that support Passbook", url:"server/getMsg.php", interval: 3000, listener:this});
			this.feed.addItem({id:"reminder", color:"#FF407F", animated:true, icon1:'icon/sai/alarm.png', caption:"REMINDER", content:"list apps that support Passbook", url:"server/getList.php", interval: 3000, listener:this});
			this.feed.addItem({id:"todolist", color:"#FF9900", animated:true, icon1:'icon/sai/todolist.png', caption:"TODOLIST", content:"list apps that support Passbook", url:"server/getList.php", interval: 3000, listener:this});
			this.feed.addItem({id:"msg", color:"#666666", animated:true, icon1:'icon/sai/mail.png', caption:"MESSAGE", content:"list apps that support Passbook", url:"server/getList.php", interval: 3000, listener:this});
			this.feed.addItem({id:"ticketing", color:"#009900", animated:true, icon1:'icon/sai/ticketing.png', caption:"TICKETING", content:"list apps that support Passbook", url:"server/getTicket.php", interval: 3000, listener:this});
			this.feed.addItem({id:"tools", color:"#FF6666", animated:false, icon1:'icon/sai/tools.png', caption:"TOOLS", content:"list apps that support Passbook", url:"server/getList.php", interval: 3000, listener:this});
			this.feed.showNotifikasi();
		}catch(e){
			alert(e);
		}
	}
};
window.app_lab_dashboard.extend(window.panel);
window.app_lab_dashboard.implement({	
	setWidth: function(data){
		window.app_lab_dashboard.prototype.parent.setWidth.call(this,data);
		if (this.pg1){
			this.pg1.setWidth(data);
			this.pg1.childPage[0].setWidth(data);
			this.pg1.childPage[1].setWidth(data);
			this.feed.setWidth(data );
		}
	},
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
	doPageChange: function(sender,page){
		/*if (page == this.pg1.childPage[1]){
			if (this.ju == undefined){
				uses("app_saku2_transaksi_gl_fJu");
				this.childTop = 0;
				this.ju = new app_saku2_transaksi_gl_fJu(page);
				this.ju.maximize();
			}
	
		}*/
	},
	doInformasi: function(event,no_konten){
		try{
			
			uses("server_report_report");
			this.report = new server_report_report();
			//var nama_report="server_report_saku2_kopeg_lab_rptSummary";
			var nama_report="server_report_saku2_kopeg_lab_rptTes";
			this.filter="";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = this.app._userLog+"/"+this.app._userStatus ;
			this.docViewer.src = this.report.previewWithHeader(nama_report,this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pg1.setActivePage(this.pg1.childPage[0]);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSop: function(event){
		try{
			alert('a');
			uses("server_report_report");
			this.report = new server_report_report();
			var nama_report="server_report_saku2_kopeg_lab_rptSop";
			this.filter="";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer2.src = this.report.previewWithHeader(nama_report,this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			//this.pg1.setActivePage(this.pg1.childPage[1]);
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
	updateInfo: function(){
		this.msgBoard.ajax.setRequester(this.dataProvider.getInfo(this.filter, (this.prosesId < 10 ? "0":"") + this.prosesId.toString()));
		this.msgBoard.ajax.callAsynch();
	},
	doRequestReady: function(sender, methodName, result, errCode, connection){
	
		try{
			result = JSON.parse(result);
			if (typeof result == "object")
				sender.content = result.message;
			else 
				sender.content = result;
		  }catch(e){
				alert(e+":"+result);
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
			if (no_bukti.substr(3,2)=="JU")
			{
				this.filter2=" where a.no_ju='"+no_bukti+"'";
				nama_report="server_report_lab_gl_rptBuktiJurnal";
			}
			if (no_bukti.substr(3,2)=="BK" || no_bukti.substr(3,2)=="KK" || no_bukti.substr(3,2)=="BM" || no_bukti.substr(3,2)=="KM")
			{
				this.filter2=" where a.no_kas='"+no_bukti+"'";
				nama_report="server_report_lab_kb_rptKbBuktiJurnal";
			}
			if (no_bukti.substr(3,2)=="PJ")
			{
				this.filter=" where a.no_ptg='"+no_bukti+"'";
				nama_report="server_report_lab_kb_rptPjPtgBuktiJurnal";
			}
			if (no_bukti.substr(3,2)=="AM" || no_bukti.substr(3,2)=="BI" || no_bukti.substr(3,2)=="BT" || no_bukti.substr(3,2)=="RE")
			{
				this.filter=" where a.no_bukti='"+no_bukti+"'";
				nama_report="server_report_lab_aka_rptAkJurnal";
			}
		
			this.report = new server_report_report();
			this.showFilter = "";
			this.lokasi = "";
			this.filter = "";
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
	doOpenTugasBb: function(kode_lokasi,no_tugas,nik_user,userid){
		this.kode_lokasi=kode_lokasi;
		this.no_tugas=no_tugas;
		this.nik_user=nik_user;
		this.link="2";
		filter = " where a.kode_lokasi='"+kode_lokasi+"' and a.no_tugas='"+no_tugas+"' and a.nik_user='"+nik_user+"' ";
		filter2="";
		nama_report="server_report_saku2_kopeg_lab_rptBukuBesar";
		//this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
		this.docViewer2.src = this.report.previewWithHeader(nama_report,filter, 1,1, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
	    this.pg1.setActivePage(this.pg1.childPage[1]);
	},
	doOpenTugasJurnal: function(kode_lokasi,no_tugas,nik_user,userid){
		this.kode_lokasi=kode_lokasi;
		this.link="1";
		filter = "where a.kode_lokasi='"+kode_lokasi+"' and a.no_tugas='"+no_tugas+"' and a.nik_user='"+nik_user+"'";
		filter2="";
		nama_report="server_report_saku2_kopeg_lab_rptJurnal";
		//this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
		this.docViewer2.src = this.report.previewWithHeader(nama_report,filter, 1,1, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
	    this.pg1.setActivePage(this.pg1.childPage[1]);
	},
	doOpenTugasTb: function(kode_lokasi,no_tugas,nik_user,userid){
		this.kode_lokasi=kode_lokasi;
		this.no_tugas=no_tugas;
		this.nik_user=nik_user;
		this.userid=userid;
		this.link="1";
		filter = "where a.kode_lokasi='"+kode_lokasi+"' and a.no_tugas='"+no_tugas+"' and a.nik_user='"+nik_user+"'";
		filter2=userid+"/"+"0"+"/";
		nama_report="server_report_saku2_kopeg_lab_rptTb";
		//this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
		this.docViewer2.src = this.report.previewWithHeader(nama_report,filter, 1,1, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
	    this.pg1.setActivePage(this.pg1.childPage[1]);
	},
	doOpenTugasNeraca: function(kode_lokasi,no_tugas,nik_user,userid){
		this.kode_lokasi=kode_lokasi;
		this.no_tugas=no_tugas;
		this.nik_user=nik_user;
		this.userid=userid;
		this.link="1";
		filter = "where a.kode_lokasi='"+kode_lokasi+"' and a.no_tugas='"+no_tugas+"' and a.nik_user='"+nik_user+"'";
		filter2=userid+"/"+nik_user+"/"+no_tugas;
		nama_report="server_report_saku2_kopeg_lab_rptNeraca";
		//this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
		this.docViewer2.src = this.report.previewWithHeader(nama_report,filter, 1,1, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
	    this.pg1.setActivePage(this.pg1.childPage[1]);
	},
	doOpenTugasLr: function(kode_lokasi,no_tugas,nik_user,userid){
		this.kode_lokasi=kode_lokasi;
		this.no_tugas=no_tugas;
		this.nik_user=nik_user;
		this.userid=userid;
		this.link="1";
		filter = "where a.kode_lokasi='"+kode_lokasi+"' and a.no_tugas='"+no_tugas+"' and a.nik_user='"+nik_user+"'";
		filter2=userid+"/"+nik_user+"/"+no_tugas;
		nama_report="server_report_saku2_kopeg_lab_rptLr";
		//this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
		this.docViewer2.src = this.report.previewWithHeader(nama_report,filter, 1,1, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
	    this.pg1.setActivePage(this.pg1.childPage[1]);
	},
	doOpenTugasModal: function(kode_lokasi,no_tugas,nik_user,userid){
		this.kode_lokasi=kode_lokasi;
		this.no_tugas=no_tugas;
		this.nik_user=nik_user;
		this.userid=userid;
		this.link="1";
		filter = "where a.kode_lokasi='"+kode_lokasi+"' and a.no_tugas='"+no_tugas+"' and a.nik_user='"+nik_user+"'";
		filter2=userid+"/"+nik_user+"/"+no_tugas;
		nama_report="server_report_saku2_kopeg_lab_rptModal";
		//this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
		this.docViewer2.src = this.report.previewWithHeader(nama_report,filter, 1,1, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
	    this.pg1.setActivePage(this.pg1.childPage[1]);
	},
	doKonten: function(no_konten){
		this.no_konten=no_konten;
		this.link="1";
		filter = "where no_konten='"+no_konten+"' ";
		filter2="";
		nama_report="server_report_saku2_kopeg_lab_rptInformasi";
		//this.viewer.useIframe(this.report.previewWithHeader(nama_report,filter, this.page,  this.pager, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
		this.docViewer2.src = this.report.previewWithHeader(nama_report,filter, 1,1, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
	    this.pg1.setActivePage(this.pg1.childPage[1]);
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
	setWidth: function(data){
		window.app_lab_dashboard.prototype.parent.setWidth.call(this,data);
		if (this.pg1){
			this.pg1.setWidth(data);
			this.pg1.childPage[0].setWidth(data);
			this.pg1.childPage[1].setWidth(data);
			this.feed.setWidth(data);
		}
		
	}
	
});

