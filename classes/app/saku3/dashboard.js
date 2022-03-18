window.app_saku3_dashboard = function(owner,options)
{
	if (owner)
	{
		window.app_saku3_dashboard.prototype.parent.constructor.call(this,owner,options);
		this.className  = "app_saku3_dashboard";
		this.itemsValue = new arrayList();		
		this.setColor("");
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.dbLib2 = new util_dbLib();		
			uses("frame;feed;timer;webBrowser;util_ajaxPush;app_saku2_transaksi_kopeg_tiket_fTiketAjuD;saiMemo");	
			uses("util_socketio",true);		
			this.userChatMsgList = new arrayMap();
			this.dataKaryawan = new arrayMap();
			this.lastNotifikasi = "";
			var result = this.dbLib.getDataProvider("select nik, nama, foto from karyawan ", true);
			for (var i = 0 ; i < result.rs.rows.length; i++){
				var line = result.rs.rows[i];
				this.dataKaryawan.set(line.nik, line);
			}
			this.pg1 = new pageControl(this,{bound:[0,0,this.width, this.height], childPage:["Dashboard tes","Konten","Ticketing","Chat","Messaging"], pageChange:[this,"doPageChange"]});
			//this.p1 = new panel(this.pg1.childPage[0],{bound:[5,5,this.width - 23, this.height-10], caption:""});
			//this.p2 = new panel(this.pg1.childPage[1],{bound:[5,5,this.width - 23, this.height-10], caption:""});
			//var logo = window.parent && window.parent.app_logo_main ? window.parent.app_logo_main : "image/jamboo2.png";			
			//this.infoPerusahaan = new image(this.pg1.childPage[0],{bound:[(this.width / 2) - 200,(this.height / 2 ) - 150,400,300], image:logo, proportional:true});
			//this.pg1.childPage[0].setColor("#ffffff");		
			//this.pg1.childPage[1].setColor("#ffffff");
			this.chatText = new saiMemo(this.pg1.childPage[3], {bound:[400,this.pg1.height - 60, this.pg1.width - 400, 40], labelWidth:0,keyDown:[this, "doKeyDown"]});
			this.userListCtr = new control(this.pg1.childPage[3], {bound:[0,0,400,this.pg1.height - 20]});
			this.chatWith = new control(this.pg1.childPage[3], {bound:[400,0,this.pg1.width - 400,30]});
			this.userListCtr.addStyle("border-right:1px solid #ddd;overflow:auto");
			this.chatWith.addStyle("border-bottom:1px solid #ddd");
			this.logMsgCtrl = new control(this.pg1.childPage[3], {bound:[400,30,this.pg1.width - 400, this.pg1.height - 95]});
			this.logMsgCtrl.addStyle("overflow:auto");

			var cnv = this.pg1.childPage[1].getClientCanvas();
			this.pg1.childPage[1].addStyle("background:#ffffff");
			this.docViewer = document.createElement("iframe");
			this.docViewer.frameBorder = 0;
			this.docViewer.id = this.getFullId()+"_viewer";
			this.docViewer.style.cssText = "width:100%;height:100%";		
			cnv.appendChild(this.docViewer);
			
			this.io = new util_socketio("http://10.15.224.206:1337");//119.235.248.52
			this.io.onMessage.set(this,"doMessage");
			this.io.onReady.set(this,"doMessage");
			this.io.onDisconnect.set(this, "doMessage");
			this.io.connect("simkug", this.app._lokasi, this.app._periode);
			eval(" window.message_list"+this.resourceId+" = function(data){"+
					" window.system.getResource("+this.resourceId+").doList(data);"+
				"};");
			eval("this.io.socket.on('message_list', window.message_list"+this.resourceId+");");
			//this.onClose.set(this,"doClose");
			this.dashboardViewer = new webBrowser(this.pg1.childPage[0],{bound:[0,0,this.width, this.height]});
			//this.dashboardViewer.navigate("http://icms.simkug.com?u="+this.app._userLog+"&p="+this.app._userPwd);
			//this.dashboardViewer.navigate("http://gratika.simkug.com");
			/*
			//this.feed = new feed(this.pg1.childPage[0],{bound:[0,0,this.width, this.height]});
			//this.feed.setUrl("server/getNotifikasi.php?lokasi="+this.app._lokasi+"&periode="+this.app._periode);
			//this.feed.addItem({id:"news", color:"#2099FB", animated:true, icon1:'icon/sai/rss.png', caption:"BERITA", content:"Berita", interval:10});
			//this.feed.addItem({id:"dokumen", color:"#CC33CC", animated:true, icon1:'icon/sai/document.png', caption:"DOKUMEN", content:"Dokumen", interval:0});
			//this.feed.addItem({id:"reminder", color:"#FF407F", animated:true, icon1:'icon/sai/alarm.png', caption:"REMINDER", content:"Reminder", interval:20});
			//this.feed.addItem({id:"todolist", color:"#FF9900", animated:true, icon1:'icon/sai/todolist.png', caption:"TODOLIST", content:"todolist", interval:15});
			//this.feed.addItem({id:"msg", color:"#666666", animated:true, icon1:'icon/sai/mail.png', caption:"MESSAGE", content:"msg",interval:10});
			//this.feed.addItem({id:"ticketing", color:"#009900", animated:true, icon1:'icon/sai/ticketing.png', caption:"TICKETING", content:"ticket",interval:10});
			//this.feed.addItem({id:"tools", color:"#FF6666", animated:true, icon1:'icon/sai/tools.png', caption:"TOOLS", content:"tools", interval:0});
			//this.feed.showNotifikasi();
			*/
			this.pg1.childPage[2].childTop = 0;
			//this.feed.onClick.set(this,"doFeedClick");
			this.tiketForm = new app_saku2_transaksi_kopeg_tiket_fTiketAjuD(this.pg1.childPage[2],{bound:[0,0,this.width, this.height]});
			this.userList = new arrayList();
			//this.feed.getItem("msg").content = ["Tidak ada pesan masuk"];
			//this.feed.getItem("msg").kode = [0];
		}catch(e){
			alert(e);
		}
	}
};
window.app_saku3_dashboard.extend(window.panel);
window.app_saku3_dashboard.implement({
	doKeyDown: function(sender, keyCode){
		try{
			if (keyCode == 13) {
				this.io.sendMessage({message:this.chatText.getText(), from : this.app._userLog, to: this.selectedUser});
				this.toMessage(this.chatText.getText(), this.app._userLog);
				this.chatText.clear();
			};
		}catch(e){
			alert(e);
		}
	},
	doMessage: function(sender, msg){
		try{
			if (msg && msg.type != "READY"){
				if (msg.type == "JOIN"){
					this.userList = new arrayList();
					this.userList.objList = msg.users;
					this.updateUserList();
					this.userChatMsgList.set(msg.nama, new arrayList());
					//this.feed.getItem("msg").content = [msg.message];
					//this.feed.getItem("msg").kode = [0];
				}else if (msg.type == "LEAVE"){
					var newList = [];
					for (var i =0; i < this.userList.objList.length;i++){
						if (this.userList.get(i) != msg.nama)
							newList.push(this.userList.get(i));
					}
					this.userList.objList = newList;
					this.updateUserList();
					this.userChatMsgList.del(msg.nama);
					//this.feed.getItem("msg").content = [msg.message];
					//this.feed.getItem("msg").kode = [0];
				
				}else if (msg.type == "MSG"){	
					if (msg.from == this.selectedUser && msg.other == undefined && this.selectedUser !== undefined)
					{
						this.fromMessage(msg.message, msg.from);
						if (this.pg1.activePage != this.pg1.childPage[3]){
							//this.feed.getItem("msg").content.push(msg.from +" : "+msg.message);
							//this.feed.getItem("msg").kode.push(0);
						}
					}else if (msg.to == this.app._userLog){
						var cnv = $(msg.from);
						cnv.innerHTML = "<h3>"+ msg.from +"</h3><p style='max-width:400px;max-height:20px;text-overflow:ellipsis'>"+msg.message+"</p>";
						clearTimeout(timer);
						titlebar(0,msg.from +" : "+msg.message);
						if (this.pg1.activePage != this.pg1.childPage[3]){
							//this.feed.getItem("msg").content.push(msg.from +" : "+msg.message);
							//this.feed.getItem("msg").kode.push(0);
						}
						if (this.userChatMsgList.get(msg.from) === undefined)
							this.userChatMsgList.set(msg.from, new arrayList());
						this.userChatMsgList.get(msg.from).add({msg: msg.message, time: msg.time, from: msg.from});
					}else if (msg.from == this.app._userLog){
						this.chatText.clear();
					}else if (msg.other == this.app._userLog && this.selectedUser == msg.to){
						this.toMessage(msg.message, this.app._userLog);
					}
				}
			}
		}catch(e){
			alert(e);
		}
	},
	addUserList: function(user){
		this.updateUserList();
	},
	delUserList: function(user){
		this.updateUserList();
	},
	updateUserList: function(){
		var html = "<table class='kotak' width='100%'>";
		for (var i = 0; i < this.userList.getLength(); i++){
			if (this.userList.get(i) != this.app._userLog){
				var nik = this.dataKaryawan.get(this.userList.get(i));
				if (nik == undefined) nik = {nama:"-",foto:"user.png"};
				html += "<tr height='50px' style='cursor:pointer;border-bottom:1px solid #ddd' onclick='system.getResource("+this.resourceId+").doSelect(\""+this.userList.get(i)+"\")'><td width='50px'><div style='width:40px;height:40px;border-radius:20px;background:#ccc;overflow:hidden'><img width=40 height=40 src='server/media/"+nik.foto+"'/></div></td><td id='"+this.userList.get(i)+"' valign='center' style='margin-left:5px;text-overflow:ellipsis;width:350px;overflow:hidden'>";
				html += "<h3>"+ this.userList.get(i)+" - "+ nik.nama +"</h3>";
				html += "</td></tr>";
			}
		}
		html += "</table>";
		this.userListCtr.setInnerHTML(html);
	},
	doSelect: function(user){
		try{
			this.selectedUser = user;
			var msg = this.userChatMsgList.get(user);
			if (msg){
				for (var i =0 ; i < msg.objList.length; i++){
					msg.get(i).msg = msg.get(i).msg.replace(/\n/gi,"<br>");
					var nik = this.dataKaryawan.get(user);
					if (nik == undefined) nik = {nama:"-",foto:"user.png"};
					this.logMsgCtrl.getCanvas().innerHTML += "<div style='position:relative;width:100%;height:auto;min-height:40px;text-align:left;overflow:hidden'><table style='padding-left:10px;' width='100%' border=0 cellpadding=0 cellspacing=0><tr><td width='40px' valign='bottom'  align='center'><div style='width:40px;height:40px;border-radius:20px;background:#ccc;overflow:hidden'><img width=40 height=40 src='server/media/"+nik.foto+"'/></div>"+user+"</td><td><div style='border-top-left-radius:20px;border-bottom-right-radius:20px;border-top-right-radius:20px;width:auto;float:left;background:#ddd;margin:10px;padding:10px'>"+ trim(msg.get(i).msg).replace(/\n/gi,"<br>")+"</div></td></tr></table></div>";
				}
				if (msg.objList.length > 0){
					document.title = window.app_nama;
					clearTimeout(timer);
					this.logMsgCtrl.getCanvas().scrollTop = this.logMsgCtrl.getCanvas().scrollHeight;
				}
			}
			this.userChatMsgList.set(user, new arrayList());
			this.chatWith.getCanvas().innerHTML = "<div style='width:auto;height:auto;padding:10px;text-weight:bold'>To : "+user+"</div>";
			//this.feed.getItem("msg").content = ["Tidak ada pesan masuk"];
			//this.feed.getItem("msg").kode = [0];
		}catch(e){
			alert(e);
		}
	},
	toMessage: function(msg, user){
		msg = trim(msg).replace(/\n/gi,"<br>");
		var nik = this.dataKaryawan.get(user);
		if (nik == undefined) nik = {nama:"-",foto:"user.png"};
		this.logMsgCtrl.getCanvas().innerHTML += "<div style='position:relative;width:100%;height:auto;min-height:40px;overflow:hidden'><table style='padding-right:10px;' width='100%' border=0 cellpadding=0 cellspacing=0><tr><td align='right'><div style='border-top-right-radius:20px;border-bottom-left-radius:20px;border-top-left-radius:20px;background:#19acf5;color:#fff;margin:10px;padding:10px;width:auto;float:right;text-align:left'>"+msg+"</div></td><td width='40px' valign='bottom' align='center'><div style='width:40px;height:40px;border-radius:20px;background:#ccc;overflow:hidden'><img width=40 height=40 src='server/media/"+ nik.foto+"' /></div>Me</td></tr></table></div>";
		this.logMsgCtrl.getCanvas().scrollTop = this.logMsgCtrl.getCanvas().scrollHeight;
	},
	fromMessage: function(msg, user){
		msg = trim(msg).replace(/\n/gi,"<br>");
		var nik = this.dataKaryawan.get(user);
		if (nik == undefined) nik = {nama:"-",foto:"user.png"};
		this.logMsgCtrl.getCanvas().innerHTML += "<div style='position:relative;width:100%;height:auto;min-height:40px;text-align:left;overflow:hidden'><table style='padding-left:10px;' width='100%' border=0 cellpadding=0 cellspacing=0><tr><td width='40px' valign='bottom'  align='center'><div style='width:40px;height:40px;border-radius:20px;background:#ccc;overflow:hidden'><img width=40 height=40 src='server/media/"+nik.foto+"'/></div>"+user+"</td><td><div style='border-top-left-radius:20px;border-bottom-right-radius:20px;border-top-right-radius:20px;width:auto;float:left;background:#ddd;margin:10px;padding:10px'>"+msg+"</div></td></tr></table></div>";
												 
		this.logMsgCtrl.getCanvas().scrollTop = this.logMsgCtrl.getCanvas().scrollHeight;
	},
	viewMsgLog: function(user){
		var msgLog = this.userChatMsgList.get(user);
		this.logMsgCtrl.setInnerHTML("");
		var html = "<table class='kotak' width='100%'>";
		for (var i=0; i < msgLog.getLength(); i++){
			html += "<tr><td>";
			html += "<p>"+msgLog.get(i).msg+"</p>";
			html += "</td></tr>";
		}
		html += "</table>";
		this.logMsgCtrl.setInnerHTML(html);
	},
	doList: function(data){
		try{
			var news = data.message["list"];
			var dok = data.message["dok"];
			var reminder = data.message["remainder"];
			var todo = data.message["todo"];
			var msg = data.message["msg"];
			var ticket = data.message["ticket"];
			var tools = data.message["tools"];
			var notifikasi = data.message["notifikasi"];
			if (news){
				//this.feed.getItem("news").content = news.message;
				//this.feed.getItem("news").kode = news.kode;
				//this.feed.updateItemContent("news");
			}
			if (dok){
				//this.feed.getItem("dokumen").content = dok.message;
				//this.feed.getItem("dokumen").kode = dok.kode;
				//this.feed.updateItemContent("dokumen");
			}
			if (reminder){
				//this.feed.getItem("reminder").content = reminder.message;
				//this.feed.getItem("reminder").kode = reminder.kode;
				//this.feed.updateItemContent("reminder");
			}
			if (todo){
				//this.feed.getItem("todolist").content = todo.message;
				//this.feed.getItem("todolist").kode = todo.kode;
				//this.feed.updateItemContent("todolist");
			}
			/*if (msg){
				//this.feed.getItem("msg").content = msg.message;
				//this.feed.getItem("msg").kode = msg.kode;
				//this.feed.updateItemContent("msg");
			}*/
			if (ticket){
				//this.feed.getItem("ticketing").content = ticket.message;
				//this.feed.getItem("ticketing").kode = ticket.kode;
				//this.feed.updateItemContent("ticketing");
			}
			if (tools){
				//this.feed.getItem("tools").content = tools.message;
				//this.feed.getItem("tools").kode = tools.kode;
				//this.feed.updateItemContent("tools");
			}
			if (notifikasi){
				if (this.lastNotifikasi != notifikasi.message)
					//this.feed.updateNotifikasi(notifikasi.message);
				this.lastNotifikasi = notifikasi.message;
			}
		}catch(e){
			alert(e);
		}
	},
	doFeedClick: function(sender, item, index){
		try{
			if (item == "msg"){
				this.pg1.setActivePage(this.pg1.childPage[3]);
			}else {
				var kode = sender.items.get(item).kode[index];
				this.doInformasi(sender, kode);
			}
		}catch(e){
			alert(e);
		}
	},
	setWidth: function(data){
		window.app_saku3_dashboard.prototype.parent.setWidth.call(this,data);
		if (this.pg1){
			this.pg1.setWidth(data);
			this.pg1.childPage[0].setWidth(data);
			this.pg1.childPage[1].setWidth(data);
			this.pg1.childPage[2].setWidth(data);
			this.pg1.childPage[3].setWidth(data);
			this.pg1.childPage[4].setWidth(data);
			//this.feed.setWidth(data );
			this.logMsgCtrl.setWidth(data - 400);
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
		if (page == this.pg1.childPage[3]){
			//this.feed.getItem("msg").content = ["Tidak ada pesan masuk"];
			//this.feed.getItem("msg").kode = [0];
		}
	},
	doInformasi: function(event,no_konten){
		try{
			
			uses("server_report_report");
			this.report = new server_report_report();
			var nama_report="server_report_saku2_kopeg_tiket_rptInformasi";
			//var nama_report="server_report_saku2_kopeg_lab_rptTes";
			this.filter="where a.no_konten='"+no_konten+"'";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = no_konten+"/";
			this.docViewer.src = this.report.previewWithHeader(nama_report,this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pg1.setActivePage(this.pg1.childPage[1]);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doDetail: function(no_konten){
		
		this.no_konten=no_konten;
		this.filter="where a.no_konten='"+no_konten+"'";
		this.showFilter = "";
		this.lokasi = "";
		this.filter2 = no_konten+"/";
		nama_report="server_report_saku2_kopeg_tiket_rptInformasi";
		this.docViewer.src = this.report.previewWithHeader(nama_report,this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();

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
			if (typeof result == "object"){
				sender.content = result.message;
				if (result.kode){
					sender.kode = result.kode;
				}
			}else 
				sender.content = result;
		  }catch(e){
				error_log(e+":"+result);
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
		for (var i=0; i < detail.objList.length; i++){
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
	},
	setWidth: function(data){
		window.app_saku3_dashboard.prototype.parent.setWidth.call(this,data);
		if (this.pg1){
			this.pg1.setWidth(data);
			this.pg1.childPage[0].setWidth(data);
			this.pg1.childPage[1].setWidth(data);
			//this.feed.setWidth(data);
		}
		
	}
	
});

