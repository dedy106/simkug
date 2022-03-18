window.app_officeair_fDesk = function(owner,options){
	if (owner){
		try{
			window.app_officeair_fDesk.prototype.parent.constructor.call(this,owner,options);
			this.className  = "app_officeair_fDesk";			
			this.setScroll(true);	
			this.addStyle("border:2px solid #ffffff");
			uses("portalui_uploader;portalui_saiCBBL;portalui_saiCB;portalui_saiGrid;util_file;portalui_bevel;portalui_rssReader;portalui_messageViewer;portalui_timer");
			this.bClose = new portalui_imageButton(this,{bound:[this.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});
			this.bMin = new portalui_imageButton(this,{bound:[this.width - 85,1,27,16],image:"icon/dynpro/pnlmin.png",click:[this,"doClick"]});						
			this.bAdd = new portalui_imageButton(this,{bound:[this.width - 46,30,33,23],image:"icon/dynpro/add.png",click:[this,"showFrameRss"],hint:"Add News Feed"});			
			this.pMemo = new portalui_messageViewer(this,{bound:[10,50,300,250],caption:"Memo", prevClick:[this,"doPrevClick"], nextClick:[this,"doNextClick"],icon:"icon/dynpro/edit.png", refreshClick:[this,"doRefreshClick"]});
			this.pEmail = new portalui_messageViewer(this,{bound:[10,330,300,250],caption:"Email", prevClick:[this,"doPrevClick"], nextClick:[this,"doNextClick"],icon:"icon/dynpro/email.png"});
			this.pTask = new portalui_messageViewer(this,{bound:[320,50,300,250],caption:"Task", prevClick:[this,"doPrevClick"], nextClick:[this,"doNextClick"]});
			//---------------------- input
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			this.fileUtil = new util_file();	
			this.rootDir = this.fileUtil.getRootDir();
			this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);
			this.imgSblm = "";							
			this.timer = new portalui_timer(this);
			this.timer.setInterval(10000);
			this.timer.onTimer.set(this,"doTimer");
			this.timer.setEnabled(false);
			this.owner.createListData();
			
			this.rssReader = new portalui_arrayMap();
			this.loadRss();
		}catch(e){
			alert(e);
		}
	}
};
window.app_officeair_fDesk.extend(window.portalui_roundPanel);
window.app_officeair_fDesk.implement({
	doClick: function(sender){
		this.hide();
	},
	doTimer: function(){
		this.timer.setEnabled(false);
		var data = this.dbLib.getDataProvider("select subject, dari, date_format(tanggal,'%Y-%m-%d %h:%i:%s') as tanggal, content from off_memo where kepada = '"+window.dataLogin.email+"' order by tanggal desc",true);
		if (typeof data != "string"){
			this.dataMemo = data;
			this.dataMemo.activeRow = 0;
			if (this.dataMemo.rs.rows[0] !== undefined)
				this.pMemo.viewMessage(this.dataMemo.rs.rows[0].subject, this.dataMemo.rs.rows[0].tanggal, urldecode(this.dataMemo.rs.rows[0].content),this.dataMemo.rs.rows[0].dari);
		}
		this.timer.setEnabled(false);
	},
	doPrevClick: function(sender){
		if (sender == this.pMemo){
			if (this.dataMemo.activeRow > 0) this.dataMemo.activeRow--;
			this.pMemo.viewMessage(this.dataMemo.rs.rows[this.dataMemo.activeRow].subject, this.dataMemo.rs.rows[this.dataMemo.activeRow].tanggal, urldecode(this.dataMemo.rs.rows[this.dataMemo.activeRow].content),this.dataMemo.rs.rows[this.dataMemo.activeRow].dari);
		}
	},
	doNextClick: function(sender){
		if (sender == this.pMemo){
			if (this.dataMemo.activeRow < this.dataMemo.rs.rows.length-1) this.dataMemo.activeRow++;
			this.pMemo.viewMessage(this.dataMemo.rs.rows[this.dataMemo.activeRow].subject, this.dataMemo.rs.rows[this.dataMemo.activeRow].tanggal, urldecode(this.dataMemo.rs.rows[this.dataMemo.activeRow].content),this.dataMemo.rs.rows[this.dataMemo.activeRow].dari);
		}
	},
	doRefreshClick: function(sender){
		if (sender == this.pMemo){
			//this.timer.setEnabled(false);
			var data = this.dbLib.getDataProvider("select subject, dari, date_format(tanggal,'%Y-%m-%d %h:%i:%s') as tanggal, content from off_memo where kepada = '"+window.dataLogin.email+"' order by tanggal desc",true);
			if (typeof data != "string"){
				this.dataMemo = data;
				this.dataMemo.activeRow = 0;
				if (this.dataMemo.rs.rows[0] !== undefined)
					this.pMemo.viewMessage(this.dataMemo.rs.rows[0].subject, this.dataMemo.rs.rows[0].tanggal, urldecode(this.dataMemo.rs.rows[0].content),this.dataMemo.rs.rows[0].dari);
			}
			//this.timer.setEnabled(true);
		}
	},
	showFrameRss: function(){
		try{
			if (this.pRss === undefined){
				this.pRss = new portalui_panel(this,{bound:[this.width - 330,55,300,100],caption:"Add News Feed"});
				this.eRssSite = new portalui_saiCBBL(this.pRss,{bound:[10,30,250,20],caption:"Rss Site", rightLabelVisible:false, btnClick:[this,"FindBtnClick"]});
				this.eRssCaption = new portalui_saiLabelEdit(this.pRss,{bound:[10,53,280,20],caption:"Caption"});			
				this.bRssOk = new portalui_button(this.pRss,{bound:[this.pRss.width - 200,75,80,18],caption:"Ok",click:[this,"doFrameClick"]});
				this.bRssCancel = new portalui_button(this.pRss,{bound:[this.pRss.width - 100,75,80,18],caption:"Cancel",click:[this,"doFrameClick"]});
			}
			this.eRssSite.setText("");
			this.eRssCaption.setText("");
			this.pRss.show();
			this.pRss.bringToFront();
		}catch(e){
			alert(e);
		}
	},
	doFrameClick: function(sender){
		if (sender == this.bRssCancel) this.pRss.hide();
		if (sender == this.bRssOk){
			var reader = new portalui_rssReader(this,{bound:[this.width - 320 - (this.rssReader.getLength() * 20),50 + (this.rssReader.getLength() * 20),300,400], remove:[this,"doRemoveReader"]});
			reader.setSite(this.eRssSite.getText(),10,this.eRssCaption.getText());
			this.rssReader.set(reader.resourceId, {rss_site:this.eRssSite.getText(), caption:this.eRssCaption.getText()});
			this.pRss.hide();
		}
	},
	FindBtnClick: function(sender){
		if (sender == this.eRssSite){
			this.standarLib.showListData(this,"Data Referensi News Feed",sender, undefined,
				"select rss_site from off_rss ",
				"select count(*) as tot from off_rss",
				["rss_site","desk"],"where",["Site","Deskripsi"],false);
		}
	},
	loadRss: function(){
		var data = this.dbLib.getDataProvider("select rss_site, caption from off_feed where email ='"+window.dataLogin.email +"' ",true);
		if (typeof data !== "string"){
			if (data.rs.rows[0] !== undefined){
				var reader1, line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					var reader1 = new portalui_rssReader(this,{bound:[this.width - 320 - (i * 20),50+ (i * 20),300,400], remove:[this,"doRemoveReader"]});
					reader1.setSite(line.rss_site,10,line.caption);
					this.rssReader.set(reader1.resourceId, {rss_site:line.rss_site, caption:line.caption});
				}
			} 
		}			
	},
	doSaveAll: function(){
		try{
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();
			sql.add("delete from off_feed where email = '"+window.dataLogin.email+"' ");
			var reader, item, sqlText = "insert into off_feed(email, rss_site, caption)values";
			var first = true;
			for (var  i in this.rssReader.objList){
				item = this.rssReader.get(i);
				if (!first ) sqlText += ",";
				reader = system.getResource(i);
				if (reader instanceof portalui_rssReader)			
					sqlText += "('"+window.dataLogin.email+"','"+reader.site+"','"+item.caption+"' )";
				else sqlText += "('"+window.dataLogin.email+"','"+line.rss_site+"','"+item.caption+"' )";
				first = false;
			}	
			sql.add(sqlText);
			this.dbLib.execArraySQLS(sql);
		}catch(e){
			alert(e);
		}
	},
	doRemoveReader: function(sender){
		this.rssReader.del(sender.resourceId);
	}
});